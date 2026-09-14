import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

// 키 검증은 실제 API 호출 시점에 한다 — 모듈 로드에서 throw하면
// 키 없는 로컬 환경에서 fallback UI조차 뜨지 못하고 페이지 전체가 500이 된다
const apiKey = process.env.NOTION_API_KEY;

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ── 요청 간격 조절 ────────────────────────────────────────────────
// Notion 공개 API는 통합당 초당 평균 3요청이다. 빌드는 글 수만큼 페이지를
// 동시에 만들고 글 하나가 블록 요청을 여러 번 보내므로, 조절하지 않으면
// 수백 개가 한꺼번에 나가 429를 맞는다. 요청을 한 줄로 세워 간격을 둔다.
const MIN_REQUEST_GAP_MS = Number(process.env.NOTION_MIN_REQUEST_GAP_MS ?? 350);

let gate: Promise<void> = Promise.resolve();

function takeTurn(): Promise<void> {
  const mine = gate.then(() => sleep(MIN_REQUEST_GAP_MS));
  // 대기열이 끊기지 않도록 실패해도 다음 차례는 진행시킨다
  gate = mine.catch(() => {});
  return mine;
}

// SDK의 모든 요청도 같은 게이트를 지나게 한다 — notion-to-md는 페이지 하나에
// 블록 요청을 여러 번 보내므로 호출부만 감싸서는 조절되지 않는다
const throttledFetch = async (
  input: Parameters<typeof fetch>[0],
  init?: Parameters<typeof fetch>[1]
) => {
  await takeTurn();
  return fetch(input, init);
};

export const notion = new Client({
  auth: apiKey,
  fetch: throttledFetch,
});

export const n2m = new NotionToMarkdown({ notionClient: notion });

// ── 실패 처리 ─────────────────────────────────────────────────────

/** fetch 기반 호출의 실패 — 호출부가 상태 코드로 분기할 수 있게 status를 보존한다 */
export class NotionHttpError extends Error {
  status: number;
  body: string;
  retryAfterSeconds?: number;

  constructor(status: number, body: string, retryAfterSeconds?: number) {
    super(`Notion API error: ${status}\n${body}`);
    this.name = "NotionHttpError";
    this.status = status;
    this.body = body;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

const MAX_ATTEMPTS = 8;
const MAX_BACKOFF_MS = 30_000;

/** 응답 본문·헤더에 담긴 Notion의 권장 대기 시간(초) */
function parseRetryAfter(
  body: string,
  header?: string | null
): number | undefined {
  const fromHeader = header ? Number(header) : NaN;
  if (Number.isFinite(fromHeader)) return fromHeader;

  try {
    const parsed = JSON.parse(body);
    const seconds = Number(parsed?.additional_data?.retry_after);
    return Number.isFinite(seconds) ? seconds : undefined;
  } catch {
    return undefined;
  }
}

/** 다시 시도할 가치가 있는 실패인지 — 한도 초과(429)와 서버측 오류(5xx)만 */
function retryDelayMs(error: unknown, attempt: number): number | null {
  const e = error as {
    status?: number;
    body?: string;
    retryAfterSeconds?: number;
  };
  const status = e?.status;
  const retryable =
    status === 429 || (typeof status === "number" && status >= 500);
  if (!retryable) return null;

  const advised =
    e.retryAfterSeconds ??
    (typeof e.body === "string" ? parseRetryAfter(e.body) : undefined);
  if (advised !== undefined) return Math.min(advised * 1000, MAX_BACKOFF_MS);

  // 지수 백오프 + 지터 — 빌드의 여러 워커가 같은 시각에 몰려 다시 429를 맞지 않게
  const base = Math.min(500 * 2 ** (attempt - 1), MAX_BACKOFF_MS);
  return base + Math.floor(Math.random() * 250);
}

/**
 * 간격을 둬도 워커가 여러 개면 한도에 닿을 수 있으므로 재시도를 정상 경로로 둔다.
 * 한도를 넘겨도 실패하면 호출부로 던진다 — 조용히 빈 값을 돌려주면
 * 본문 없는 글이 그대로 배포된다.
 */
export async function withNotionRetry<T>(
  label: string,
  fn: () => Promise<T>
): Promise<T> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const wait = retryDelayMs(error, attempt);
      if (wait === null || attempt >= MAX_ATTEMPTS) throw error;

      console.warn(
        `[notion] ${label} 실패 — ${wait}ms 후 재시도 (${attempt}/${MAX_ATTEMPTS - 1})`
      );
      await sleep(wait);
    }
  }
}

// ── 조회 ──────────────────────────────────────────────────────────

/** 페이지 블록을 마크다운으로 — 블로그 본문과 프로젝트 설명이 함께 쓴다 */
export async function pageToMarkdown(pageId: string): Promise<string> {
  return withNotionRetry(`pageToMarkdown(${pageId})`, async () => {
    const mdblocks = await n2m.pageToMarkdown(pageId);
    return n2m.toMarkdownString(mdblocks).parent;
  });
}

export async function queryDatabase(
  database_id: string,
  filter?: unknown,
  sorts?: unknown
) {
  if (!apiKey) {
    throw new Error("NOTION_API_KEY environment variable is not set");
  }

  return withNotionRetry(`queryDatabase(${database_id})`, async () => {
    await takeTurn();
    const response = await fetch(
      `https://api.notion.com/v1/databases/${database_id}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filter, sorts }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new NotionHttpError(
        response.status,
        errorText,
        parseRetryAfter(errorText, response.headers.get("retry-after"))
      );
    }

    return response.json();
  });
}
