// 포트폴리오 내용의 단일 소스 — "최준서_포트폴리오" PDF(11쪽)와 같은 구성.
// 문장·숫자·코드를 고칠 때는 이 파일만 건드리면 된다. 화면 구조는 components/portfolio/*.
// 본문 문자열 안의 **굵게** 표기는 강조로 렌더된다.

export interface CodeSample {
  file: string;
  code: string;
  /** 하이라이트 문법 — 기본 typescript */
  lang?: "typescript" | "nginx";
}

export interface Shot {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type Block =
  | { type: "text"; label?: string; body: string }
  | { type: "list"; label?: string; items: string[] }
  | { type: "code"; sample: CodeSample; caption?: string }
  | { type: "terminal"; lines: { text: string; tone?: "fail" | "pass" }[]; caption?: string }
  | { type: "flow"; title: string; steps: string[] }
  /** 옅은 바탕 위 번호 목록 — 순서가 있는 사건의 흐름 */
  | { type: "steps"; title: string; items: string[] }
  | {
      type: "bars";
      groups: { title: string; rows: { label: string; value: string; ratio: number; after?: boolean }[] }[];
      note: string;
    }
  | { type: "coords" }
  | { type: "shot"; shot: Shot }
  /** 왼쪽 파란 선이 붙은 맺음 문단 — 결과 / 배운 것 / 캐시를 쓴 곳 … */
  | { type: "result"; label: string; body: string };

export interface Case {
  title: string;
  /** 2단 위에 한 줄로 놓이는 블록 */
  lead?: Block[];
  left?: Block[];
  right?: Block[];
  /** 첫 2단 아래에 놓이는 둘째 2단 */
  second?: { left: Block[]; right: Block[] };
  /** 2단 아래에 한 줄로 놓이는 블록 */
  tail?: Block[];
}

export interface Stat {
  label?: string;
  value: string;
  body: string;
}

export interface Project {
  id: string;
  no: string;
  name: string;
  tagline: string;
  period: string;
  /** 목차에 쓰는 한 줄 요약 */
  covers: string;
  link: { label: string; href: string };
  /** /about 카드에 쓰는 앱 아이콘 — 없으면 카드에 나오지 않는다 */
  icon?: string;
  overview: { label: string; lines: string[] }[];
  /** 개요 표 아래의 굵은 지표 */
  metrics?: Stat[];
  intro: Block[];
  screens?: { title: string; main: Shot; pair: [Shot, Shot]; caption: string };
  cases: Case[];
  stats?: { title: string; items: Stat[] };
  closing?: Block;
}

export const profile = {
  name: "최준서",
  title: "Software Engineer",
  lead: "개발자는 제품이 사용자에게 나가기 전, 마지막으로 품질을 점검하고 책임지는 사람이라고 생각합니다.",
  intro:
    "그 점이 좋고, 제가 잘할 수 있는 일이기도 합니다. 사용자가 느끼는 손맛, 그 작은 사용성과 사용자 경험이 완성도를 결정한다고 믿기 때문에 화면의 작은 불편도 그냥 넘기지 않습니다. 지금은 앱과 웹 화면을 맡으면서, 기능에 필요한 서버 API도 함께 만들고 있습니다.",
  highlights: [
    {
      label: "손끝의 차이",
      value: "12 → 2회",
      body: "편집기에서 가구를 한 번 선택할 때 다시 그려지는 타일 수. 출시 뒤에도 사용자 제보에서 원인을 찾아 계속 다듬었습니다.",
    },
    {
      label: "무엇을 확인할지",
      value: "8 → 0건",
      body: "아이폰 duo 화면 대응 중 찾은 배치 결함 수. 먼저 실패하는 E2E 테스트로 적어 두고, 고친 뒤 통과로 바꿨습니다.",
    },
  ] satisfies Stat[],
  links: [
    { label: "Email", text: "evan7484@naver.com", href: "mailto:evan7484@naver.com" },
    { label: "GitHub", text: "github.com/evan7484", href: "https://github.com/evan7484" },
    {
      label: "LinkedIn",
      text: "linkedin.com/in/준서-최",
      href: "https://www.linkedin.com/in/%EC%A4%80%EC%84%9C-%EC%B5%9C-6b46a4395/",
    },
    { label: "Blog", text: "jschoiog.site", href: "https://www.jschoiog.site" },
  ],
  education: "건국대학교 컴퓨터공학부 (2027.08 졸업 예정)",
  path: "동아리 첫 팀 프로젝트에서 버튼과 입력창을 만들던 저는, 지금 요소를 고르고 옮기고 되돌리는 편집기의 핵심 동작을 설계하고, 화면에 필요한 서버 기능도 함께 만들고 있습니다. 앞으로는 **누구나 무언가를 만들 수 있게 돕는 도구**를 만드는 엔지니어가 되고 싶습니다. 배운 것은 문서로 정리해 소실되지 않는 지식으로 남기겠습니다.",
  principles: [
    {
      name: "동작과 편함은 다르다",
      body: "제 눈에는 정상이던 화면이 사용자에게는 불편했습니다. 사소한 어색함 하나가 제품 전체의 완성도로 읽혔습니다.",
    },
    {
      name: "실패하는지부터 확인한다",
      body: "처음 만든 E2E 테스트는 통과했지만 얼마 전 고친 문제를 잡지 못했습니다. 문제가 생겼을 때 실패하는지부터 확인합니다.",
    },
    {
      name: "구조는 직접 쥔다",
      body: "AI가 코드를 쓰더라도 구조는 직접 파악하고, 구조를 바꾸는 결정은 맡기지 않습니다.",
    },
  ],
};

export const projects: Project[] = [
  {
    id: "rougether",
    no: "01",
    name: "루게더",
    tagline:
      "루틴을 지키면 방이 자라는 소셜 할 일 관리 앱. 프론트엔드가 혼자라 한 코드로 세 플랫폼을 만들 수 있는 React Native(Expo)를 선택해 iOS·Android에 출시하고, 같은 코드로 웹(PWA)·데스크톱도 운영",
    period: "2026.04 ~ 현재",
    covers: "로그아웃 문제를 서버까지 추적 · 신고·차단 기능 · 자유 배치 편집기 · 렌더 최적화 · 웹 버전",
    link: { label: "app.rougether.com", href: "https://app.rougether.com" },
    icon: "/portfolio/rougether-icon.png",
    overview: [
      { label: "역할", lines: ["프론트엔드 1인", "서버 기능 개발"] },
      { label: "팀", lines: ["SW마에스트로 17기", "2인 팀 tripleS"] },
      { label: "기간", lines: ["2026.04 ~ 현재", "운영 중"] },
      { label: "스택", lines: ["React Native(Expo)", "RN Web · TypeScript", "Spring Boot(Java)"] },
    ],
    metrics: [
      { value: "2,500명+", body: "가입자" },
      { value: "96.1%", body: "온보딩 완료율" },
    ],
    intro: [
      {
        type: "text",
        body: "제 코드가 사용자의 손끝에 닿는다는 것을 가장 진하게 느낀 화면이 방 꾸미기 편집기입니다. 정해진 칸에 가구를 넣던 방식을 마음대로 끌어 놓는 자유 배치 편집기로 바꿨고, 출시 뒤에도 이 화면을 계속 다듬었습니다.",
      },
    ],
    screens: {
      title: "서비스 화면 (웹)",
      main: {
        src: "/portfolio/rougether-editor-selected.jpg",
        alt: "루게더 방 꾸미기 편집기 — 가구를 선택해 회전·반전·순서·삭제 도구가 나타난 상태",
        width: 1457,
        height: 812,
      },
      pair: [
        {
          src: "/portfolio/rougether-editor.jpg",
          alt: "루게더 편집기와 가구 카탈로그",
          width: 1457,
          height: 800,
        },
        {
          src: "/portfolio/rougether-calendar.jpg",
          alt: "루게더 달력 — 넓은 창의 2단 레이아웃",
          width: 1457,
          height: 800,
        },
      ],
      caption:
        "위: 방 꾸미기 편집기. 가구를 선택하면 회전, 반전, 앞뒤 순서, 삭제 도구가 나타납니다 · 아래: 편집기와 가구 카탈로그, 달력(넓은 창의 2단 레이아웃)",
    },
    cases: [
      {
        title: "CASE 1 · 강제 로그아웃을 앱에서 서버까지 따라가 없애기",
        left: [
          {
            type: "text",
            label: "문제",
            body: "쓰던 중에 **갑자기 로그아웃된다**는 문제가 고쳐도 다시 나타났습니다. 서버의 refresh 토큰은 한 번 쓰면 폐기되는데, 앱이 같은 토큰을 두 번 보내는 경로가 여럿 있었습니다.",
          },
          {
            type: "list",
            label: "따라간 과정",
            items: [
              "**07.28 앱.** 다시 열 때 동시에 나간 갱신 요청이 토큰 하나를 두고 경쟁. 갱신은 한 번만 보내고 결과를 함께 쓰게 했습니다.",
              "**09.09 웹.** 여러 탭이 서로의 토큰을 무효로 만들어, 탭끼리 순서대로 갱신하게 했습니다.",
              "**09.16 앱.** 그래도 남는 로그아웃의 원인을 알 수 있게 계측을 넣었습니다.",
              "**10.01 서버.** 60초 안에 다시 온 토큰은 재발급하고, 폐기 범위를 기기 단위로 좁혔습니다.",
              "**10.13 서버.** 회전을 만료 7일 전부터만 하도록 바꿨습니다.",
            ],
          },
        ],
        right: [
          {
            type: "steps",
            title: "응답을 못 받으면 생기던 일",
            items: [
              "앱이 refresh 토큰으로 갱신을 요청",
              "서버가 새 토큰을 주고 옛 토큰을 폐기",
              "응답이 앱에 닿지 않음(백그라운드 전환·통신 끊김)",
              "앱이 옛 토큰으로 다시 요청",
              "서버가 탈취로 보고 그 회원의 토큰을 모두 폐기",
            ],
          },
          {
            type: "result",
            label: "결과",
            body: "만료까지 넉넉하면 같은 refresh 토큰을 돌려주고 access 토큰만 새로 줍니다. 응답을 못 받은 앱이 옛 토큰으로 와도 로그아웃되지 않습니다.",
          },
          {
            type: "result",
            label: "배운 것",
            body: "증상은 앱에서 보였지만 원인은 서버의 회전 규칙에 있었습니다. 화면에서 생긴 문제도 서버 코드까지 따라가 봅니다.",
          },
        ],
      },
      {
        title: "CASE 2 · 신고와 차단을 화면, API, 관리자 화면까지 한 번에",
        left: [
          {
            type: "text",
            label: "계기",
            body: "피드와 거래소에는 사용자가 올린 글이 있어, 앱스토어 심사 지침의 **사용자 생성 콘텐츠 요건**(신고·차단·운영자 조치)을 갖춰야 했습니다.",
          },
          {
            type: "list",
            label: "만든 것",
            items: [
              "**앱.** 피드 신고 메뉴와 차단 목록",
              "**서버.** 글·댓글·거래소 종목 신고 API와 차단 API",
              "**관리자 화면.** 신고 목록과 처리(숨김·기각)",
            ],
          },
        ],
        right: [
          {
            type: "list",
            label: "정한 규칙",
            items: [
              "**다시 신고해도 1건.** 사용자와 대상마다 1건으로 처리해 같은 신고가 쌓이지 않습니다.",
              "**차단하면 목록에서 통째로 제외.** 피드 목록과 상세, 댓글, 댓글 수, 알림, 거래소 목록에서 뺍니다.",
              "**탈퇴하면 함께 정리.** 탈퇴자의 차단과 탈퇴자가 한 신고를 지웁니다.",
            ],
          },
          {
            type: "result",
            label: "결과",
            body: "앱 화면과 서버 API를 같은 날 올렸고, 들어온 신고는 관리자 화면에서 숨김이나 기각으로 처리합니다.",
          },
        ],
      },
      {
        title: "그 밖에 서버에서 한 일",
        lead: [
          {
            type: "list",
            items: [
              "**기능을 더해도 조회 쿼리 수는 그대로.** 루틴 건너뜀을 넣자 조회가 한 번 늘어 쿼리 수 테스트가 깨졌습니다. 완료와 건너뜀 기록을 한 쿼리로 읽어 오늘 조회 3회, 월 달력 조회 6회 이내를 유지했습니다.",
              "**앱 요청과 서버 로그를 한 ID로 추적.** 요청마다 X-Request-Id를 이어받거나 새로 만들어 응답 헤더, 로그, Sentry에 같은 값을 남깁니다. 앱에서 난 오류를 같은 ID로 서버 로그에서 찾을 수 있습니다.",
            ],
          },
        ],
      },
      {
        title: "CASE 3 · 칸에 끼워 넣던 방 꾸미기를 자유 배치 편집기로",
        left: [
          {
            type: "text",
            label: "문제",
            body: "방 꾸미기는 정해진 칸에만 가구를 넣는 방식이었습니다. 끌어서 아무 데나 놓고 회전, 반전, 크기, 앞뒤 순서를 바꾸는 편집기로 만들려면 화면보다 **저장되는 문서를 어떻게 정의할지**가 먼저였습니다. 같은 방이 폰, 웹, 친구 방, 작은 미리보기 타일에 모두 그려지기 때문입니다.",
          },
          {
            type: "list",
            label: "설계",
            items: [
              "**0~1 정규화 좌표.** 픽셀이 아니라 방 크기에 대한 비율로 저장해 어떤 화면에서도 같은 자리에 놓입니다.",
              "**리비전으로 충돌 방지.** 폰과 웹에서 동시에 고치면 늦은 쪽이 409를 받고 다시 불러옵니다.",
              "**드래그 중에는 리렌더 0회.** 손가락을 따라가는 값은 Reanimated로 UI 스레드에서만 움직이고, 놓는 순간 한 번만 상태에 반영합니다.",
            ],
          },
        ],
        right: [
          { type: "coords" },
          {
            type: "list",
            label: "출시 뒤에 더한 것",
            items: [
              "**실행 취소·다시 실행.** 명령 패턴 대신 스냅샷 스택으로 구현했습니다. 모든 편집이 불변 갱신이라 바뀌지 않은 가구는 스냅샷끼리 공유합니다. 최대 50단계이고, 변화가 없는 편집은 쌓지 않습니다.",
              "**웹 키보드 단축키.** 방향키 연타는 한 단계로 묶어 한 번에 되돌립니다.",
              "**스마트 가이드.** 다른 가구의 중심선이나 방 가운데에 가까워지면 붙습니다.",
            ],
          },
        ],
      },
      {
        title: "CASE 4 · \"다른 가구까지 같이 움직여 배치가 불편하다\"",
        left: [
          {
            type: "text",
            label: "문제",
            body: "사용자 제보였습니다. 가구가 몰린 곳에서 특히 심했습니다. 눈으로는 아래 러그를 잡았는데 실제로는 위에 있는 램프가 끌려갔습니다.",
          },
          {
            type: "list",
            label: "원인",
            items: [
              "**선택이 입력에 영향을 주지 않았습니다.** 선택은 테두리를 그리는 데만 쓰였고 드래그는 모든 가구에 붙어 있었습니다.",
              "**터치 영역이 그림이 아니라 정사각형 박스였습니다.** 가구 이미지의 투명한 여백까지 터치를 받았습니다.",
            ],
          },
        ],
        right: [
          {
            type: "list",
            label: "해결",
            items: [
              "드래그와 크기 조절은 **선택한 가구만** 받도록 제스처를 분리했습니다.",
              "터치 영역을 박스의 78%로 줄여 투명한 모서리를 제외하고, 작은 가구는 **최소 44pt**를 보장했습니다.",
              "겹친 곳에서는 위에 그려진 가구가 먼저 선택되도록 그리는 순서와 선택 순서를 맞췄습니다.",
            ],
          },
          {
            type: "result",
            label: "결과",
            body: "선택한 가구만 움직입니다. 선택과 조작을 나눈 이 구조가 이후 실행 취소와 단축키의 바탕이 됐습니다.",
          },
        ],
      },
      {
        title: "CASE 5 · 방을 건드릴 때마다 카탈로그 전체가 다시 그려지던 문제",
        left: [
          {
            type: "text",
            label: "측정",
            body: "편집기는 위쪽 캔버스와 아래쪽 카탈로그 패널이 한 화면의 상태를 함께 씁니다. 렌더 횟수를 세어 보니 방 안 가구를 **한 번 선택할 때 타일이 12번** 다시 그려졌습니다(데모 카탈로그 10종 + 방 가구 2개). 실제 카탈로그는 189종이라 차이는 더 커집니다.",
          },
          {
            type: "list",
            label: "원인과 해결",
            items: [
              "그리드와 타일에 **memo 경계**가 없었습니다.",
              "memo만으로는 부족했습니다. 콜백 12곳이 인라인 함수라 매번 새 참조가 내려갔고, **콜백 참조를 고정**해 함께 해결했습니다.",
              "타일마다 배열을 훑던 배치 여부 확인을 Set 조회로 바꿨습니다.",
              "**렌더 횟수 테스트**를 추가해 다시 늘어나면 CI에서 실패합니다.",
            ],
          },
        ],
        right: [
          {
            type: "bars",
            groups: [
              {
                title: "가구 1회 선택당 타일 렌더",
                rows: [
                  { label: "수정 전", value: "12회", ratio: 1 },
                  { label: "수정 후", value: "2회", ratio: 2 / 12, after: true },
                ],
              },
              {
                title: "방 렌더 시간 (Jest, 좌석 12칸 × 40커밋)",
                rows: [
                  { label: "수정 전", value: "3.8ms", ratio: 1 },
                  { label: "수정 후", value: "2.1ms", ratio: 2.1 / 3.8, after: true },
                ],
              },
            ],
            note: "커밋당 −45%. 테스트 환경에서 잰 값이며 실기기 프레임은 따로 재지 않았습니다.",
          },
          {
            type: "result",
            label: "배운 것",
            body: "작은 손맛 하나가 누군가의 창작을 편하게도, 답답하게도 만듭니다. 그 차이는 렌더 횟수를 직접 세어 보고 찾았습니다.",
          },
        ],
      },
      {
        title: "그 밖의 기술 선택",
        lead: [
          {
            type: "list",
            items: [
              "**상태 관리.** 화면 상태 대부분이 서버 데이터라 캐시와 재조회는 TanStack Query에 맡겼습니다. 남는 전역 상태는 로그인, 언어, 디자인 토큰 정도여서 전역 상태 라이브러리 없이 Context로 두었습니다.",
              "**Storybook.** 디자인 토큰과 공용 컴포넌트를 한곳에서 보고, 앱을 실행해 그 화면까지 가지 않아도 상태별 모습을 확인하려고 넣었습니다. 접근성 검사도 스토리마다 붙였습니다.",
              "**EAS.** 앱 빌드와 배포를 원격으로 처리할 수 있어 골랐습니다.",
            ],
          },
        ],
      },
      {
        title: "CASE 6 · 같은 코드로 웹과 데스크톱까지: 하이드레이션이 프레임을 지우던 문제",
        left: [
          {
            type: "text",
            label: "배경",
            body: "앱 코드를 정적 웹으로 빌드해 PWA로 배포했습니다. 넓은 창에서는 480px 폰 화면을 가운데에 두고, 960px 이상에서는 2단 레이아웃으로 보여 줍니다(최대 1200px).",
          },
          {
            type: "text",
            label: "문제",
            body: "정적 빌드는 창 폭을 모른 채 HTML을 만듭니다. 브라우저의 첫 렌더가 그 HTML과 다르면 React가 className 차이를 고치지 않아 **프레임이 끝내 붙지 않았습니다.**",
          },
          {
            type: "list",
            label: "해결",
            items: [
              "첫 렌더는 정적 HTML과 같게(프레임 없이) 그리고, 마운트된 뒤에 프레임을 적용했습니다.",
              "루트가 Fragment와 View 사이에서 바뀌면 하위 트리 전체가 다시 마운트되므로, 프레임 여부와 상관없이 **항상 같은 엘리먼트 트리**를 그리게 했습니다.",
            ],
          },
        ],
        right: [
          {
            type: "code",
            sample: {
              file: "src/hooks/use-app-frame.ts",
              code: `export function resolveAppFrame(
  os, window, hydrated = true,
) {
  const framed = hydrated && os === 'web'
    && window.width > APP_FRAME_MAX_WIDTH;
  if (!framed)
    return { ...window, framed, split: false };
  const split =
    window.width >= SPLIT_MIN_WINDOW_WIDTH;
  const width = split
    ? Math.min(window.width, SPLIT_FRAME_MAX_WIDTH)
    : APP_FRAME_MAX_WIDTH;
  return { ...window, width, framed, split };
}

export function useAppFrame() {
  const window = useWindowDimensions();
  const hydrated = useHydrated();
  return resolveAppFrame(
    Platform.OS, window, hydrated);
}`,
            },
            caption:
              "코드 발췌(타입 생략, 줄바꿈 조정). useHydrated는 웹의 첫 렌더에서 false, 마운트 뒤 true를 돌려줍니다. 판단 로직을 순수 함수로 분리해 창 폭별 결과를 테스트합니다.",
          },
        ],
        second: {
          left: [
            {
              type: "shot",
              shot: {
                src: "/portfolio/rougether-home-split.jpg",
                alt: "루게더 웹 홈 — 왼쪽에 방, 오른쪽에 오늘의 할 일이 놓인 2단 레이아웃",
                width: 1365,
                height: 726,
              },
            },
          ],
          right: [
            {
              type: "list",
              label: "실제 화면 (창 폭 960px 이상)",
              items: [
                "왼쪽에 방, 오른쪽에 오늘의 할 일을 나란히 둔 2단 레이아웃입니다.",
                "창이 더 좁아지면 480px 폰 화면 한 단으로 바뀝니다.",
                "폰 앱과 같은 코드가 그리는 화면입니다.",
              ],
            },
          ],
        },
      },
      {
        title: "그 밖에 웹에서 한 일",
        lead: [
          {
            type: "list",
            items: [
              "**웹 접근성.** 스토리북의 모든 스토리에 axe 검사를 붙이고, RN Web이 옮기지 않던 접근성 상태를 개별 aria-* 속성으로 바꿔 ARIA 위반 54건을 0건으로 줄였습니다(예외 1건). 이후 회귀는 CI가 막습니다.",
              "**웹 구글 로그인.** 구글 버튼이 iframe으로 바뀌며 로그인이 막힌 문제를 OAuth 리다이렉트 방식으로 바꿔 해결하고, state·nonce 검증과 회귀 테스트를 더했습니다.",
              "**폰트 글리프.** 사용자가 고르는 폰트의 글리프 표를 대조해, 한 줄 안에서 문장부호만 시스템 서체로 바뀌는 곳 22개를 찾아 고치고 테스트로 고정했습니다.",
              "**자동화.** GitHub Actions로 PR 검사와 웹 배포, 앱 빌드·OTA 릴리스를 자동화했습니다.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "seedplus",
    no: "02",
    name: "SEED+",
    tagline: "공공데이터와 AI로 상권 분석과 수익률·생존율 예측을 제공하는 창업 의사결정 웹 서비스",
    period: "2026.02 ~ 현재",
    covers: "훅과 테스트로 규칙 확인 · 배포 뒤 캐시 문제 해결 · 기능명세서 규칙 번호를 코드·테스트와 맞추기",
    link: { label: "seedplusai.com", href: "https://www.seedplusai.com" },
    icon: "/portfolio/seedplus-icon.png",
    overview: [
      { label: "역할", lines: ["프론트엔드 1인", "(저장소 커밋의 약 95%)"] },
      { label: "팀", lines: ["13명 · 6개 직무", "기획·디자인·개발·데이터"] },
      { label: "기간", lines: ["2026.02 ~ 현재", "운영 중"] },
      { label: "스택", lines: ["React · TypeScript · Vite", "Tailwind · TanStack Query · Vitest"] },
    ],
    intro: [
      {
        type: "list",
        items: [
          "화면 12개 영역과 컴포넌트 50여 개를 구현하고 목 데이터를 실제 API로 전환했습니다. 수익률·생존율 계산기, 내 상가 만들기, 마이페이지, 피드, 생존율 리포트 PDF 출력을 만들었습니다.",
          "스크롤 스냅 랜딩, OG·robots·sitemap, GA 연동을 맡았습니다.",
          "전역 상태는 로그인 Context 하나로 두고, 상권 날씨는 재진입 때 바로 보이게 TanStack Query로 캐시했습니다.",
        ],
      },
    ],
    screens: {
      title: "서비스 화면",
      main: {
        src: "/portfolio/seedplus-weather.jpg",
        alt: "SEED+ 상권 날씨 — 서울 자치구 지도와 시간대별 상권 지표",
        width: 1030,
        height: 594,
      },
      pair: [
        {
          src: "/portfolio/seedplus-store-builder.jpg",
          alt: "SEED+ 내 상가 만들기 — 예상 매출과 수익률 카드",
          width: 1190,
          height: 654,
        },
        { src: "/portfolio/seedplus-landing.jpg", alt: "SEED+ 랜딩 페이지", width: 1456, height: 800 },
      ],
      caption:
        "위: 서울 25개 자치구의 상권 상태를 지도와 지표로 보여 주는 상권 날씨 · 아래: 내 상가 만들기(예상 매출·수익률), 랜딩 페이지",
    },
    cases: [
      {
        title: "CASE 1 · 사람이 잊는 규칙은 훅과 테스트가 확인하도록",
        lead: [
          {
            type: "text",
            body: "프론트엔드 개발자가 저 한 명이라, 기억에 기대던 확인을 도구로 옮겼습니다. 제가 Git 훅과 단위 테스트를 만들었고, 인프라 담당이 구성한 PR CI가 PR마다 이를 실행합니다.",
          },
          {
            type: "flow",
            title: "PR마다 실행되는 CI 7단계 · 파이프라인은 인프라 담당이 구성",
            steps: ["시크릿 스캔", "lint", "타입 체크", "Vitest", "build", "Docker 빌드", "이미지 스캔"],
          },
        ],
        left: [
          {
            type: "list",
            label: "제가 만든 것",
            items: [
              "Git 훅(husky)으로 브랜치 이름과 커밋 메시지 규칙 검사",
              "커밋 전에 하드코딩된 IP 주소 차단",
              "Vitest 도입과 검증 로직 단위 테스트",
              "배포 전 검증 스크립트(lint → 타입 체크 → build)",
            ],
          },
        ],
        right: [
          {
            type: "list",
            label: "운영하며 고친 것",
            items: ["Docker 이미지의 OS 패키지 보안 패치 적용"],
          },
        ],
      },
      {
        title: "CASE 2 · 다시 배포하면 브라우저도 새 파일을 받도록",
        left: [
          {
            type: "text",
            label: "문제",
            body: "AI 서버 주소를 바꿔 다시 배포했는데, 이미 방문했던 브라우저는 **계속 옛 주소로 요청**을 보내고 있었습니다.",
          },
          {
            type: "text",
            label: "원인",
            body: "nginx에 캐시 헤더가 없으면 브라우저가 파일의 수정 시각으로 **캐시 기간을 스스로 추정**합니다. 그래서 주소가 담긴 env-config.js와 index.html을 서버에 다시 묻지 않고 옛 파일 그대로 썼습니다.",
          },
          {
            type: "list",
            label: "해결",
            items: [
              "**자주 바뀌는 파일은 매번 확인.** env-config.js와 index.html은 no-cache로 두어, 쓰기 전에 바뀌었는지 서버에 묻습니다.",
              "**해시가 붙은 파일은 오래 캐시.** /assets/는 내용이 바뀌면 파일명도 바뀌어서 1년 동안 캐시합니다.",
              "**없는 파일은 404.** index.html이 대신 내려가 JS로 읽히는 일을 막았습니다.",
            ],
          },
          {
            type: "result",
            label: "결과",
            body: "환경변수를 바꾸거나 다시 배포하면, 이미 방문했던 브라우저도 다음 접속에서 새 파일을 받습니다.",
          },
        ],
        right: [
          {
            type: "code",
            sample: {
              file: "nginx.conf",
              lang: "nginx",
              code: `# 자주 바뀌는 파일: 쓰기 전에 서버에 확인
location = /index.html {
  add_header Cache-Control "no-cache" always;
}
location = /env-config.js {
  add_header Cache-Control "no-cache" always;
}

# 해시가 붙은 빌드 산출물: 1년 캐시
# always 없음 -> 404는 캐시되지 않음
location /assets/ {
  add_header Cache-Control
    "public, max-age=31536000, immutable";
  try_files $uri =404;
}`,
            },
            caption: "nginx.conf 발췌. 성공한 응답에만 헤더를 달아, 배포 도중의 404가 1년 동안 캐시되지 않게 했습니다.",
          },
          {
            type: "result",
            label: "캐시를 쓴 곳",
            body: "상권 날씨는 AI 분석에 수십 초가 걸릴 수 있어, TanStack Query로 5분 동안은 받아 둔 결과를 바로 보여 줍니다.",
          },
          {
            type: "result",
            label: "배운 것",
            body: "배포가 끝난 것과 사용자가 새 화면을 보는 것 사이에는 브라우저 캐시가 있다는 것을 이 일로 알았습니다.",
          },
        ],
      },
      {
        title: "CASE 3 · 기능명세서의 규칙 번호가 그대로 코드와 테스트가 되도록",
        left: [
          {
            type: "text",
            label: "문제",
            body: "회원가입·로그인 기능명세서에는 V-01(이메일)부터 V-07(생년월일)까지 번호가 붙은 유효성 규칙이 있습니다. 기획·백엔드와는 이 번호로 대화하는데, 코드에서 규칙이 컴포넌트마다 흩어져 있으면 \"V-02가 어디 있는지\"부터 찾아야 합니다.",
          },
          {
            type: "list",
            label: "해결",
            items: [
              "**규칙 하나에 함수 하나, 테스트 하나.** 함수 주석과 테스트 이름에 같은 V- 번호를 붙였습니다.",
              "서버가 이메일을 소문자로 저장하므로 클라이언트도 같은 방식으로 정규화했습니다.",
              "비밀번호 길이가 명세(8~64자)와 서버(8~72자)에서 달랐습니다. 추측으로 맞추지 않고 더 좁은 명세를 따르며 그 차이를 코드에 남겼습니다.",
              "로그인 실패 잠금(V-08)은 서버가 맡는 규칙이라 제외하고 그 경계를 적어 두었습니다.",
            ],
          },
          {
            type: "result",
            label: "결과",
            body: "규칙 변경 요청이 오면 고칠 함수와 테스트를 번호로 바로 찾습니다. 명세가 바뀌면 같은 번호의 테스트가 먼저 실패합니다.",
          },
        ],
        right: [
          {
            type: "code",
            sample: {
              file: "src/utils/authValidation.ts",
              code: `// V-08(로그인 실패 잠금)은 서버 책임이라 제외한다.

/** V-01 */
export const validateEmail = (value: string) => {
  const email = value.trim();
  if (!email) return '이메일을 입력해주세요';
  if (!EMAIL_PATTERN.test(email))
    return '올바른 이메일 형식이 아닙니다';
  return '';
};

/** 서버가 소문자로 정규화해 저장하므로
 *  클라이언트도 동일하게 맞춘다 */
export const normalizeEmail = (value: string) =>
  value.trim().toLowerCase();`,
            },
          },
          {
            type: "code",
            sample: {
              file: "src/utils/authValidation.test.ts",
              code: `// 규칙이 바뀌면 이 테스트가 명세와의 불일치를 잡아준다.
describe('V-01 이메일', () => {
  it('빈 값과 잘못된 형식을 구분해 안내한다', () => {
    expect(validateEmail(''))
      .toBe('이메일을 입력해주세요');
  });
});`,
            },
            caption: "코드 발췌. 명세서와 테스트를 나란히 놓고 번호로 대조할 수 있습니다.",
          },
        ],
      },
      {
        title: "화면에서는 이렇게 보입니다",
        left: [
          {
            type: "shot",
            shot: {
              src: "/portfolio/seedplus-signup-validation.jpg",
              alt: "SEED+ 회원가입 화면 — 이메일 입력란 아래에 형식 오류 안내가 표시된 상태",
              width: 600,
              height: 524,
            },
          },
        ],
        right: [
          {
            type: "list",
            label: "명세 → 코드 → 테스트 → 화면",
            items: [
              "입력값이 규칙에 맞지 않으면 입력란 아래에 안내 문구가 표시됩니다.",
              "화면의 \"올바른 이메일 형식이 아닙니다\"는 V-01 함수가 돌려주는 문구이고, 테스트가 같은 문구를 확인합니다.",
              "규칙 번호 하나로 명세, 함수, 테스트, 화면을 차례로 따라갈 수 있습니다.",
            ],
          },
          {
            type: "result",
            label: "배운 것",
            body: "혼자 맡은 영역일수록 기준을 밖에 꺼내 둡니다. 규칙을 코드와 테스트에 두면 제가 없어도 같은 결과가 나옵니다.",
          },
        ],
      },
    ],
  },
  {
    id: "e2e",
    no: "03",
    name: "E2E 테스트",
    tagline: "손으로 눌러 확인하던 화면 흐름을 Playwright로 자동화하고 PR마다 실행",
    period: "2026.11 ~ 현재",
    covers: "손으로 하던 화면 확인을 Playwright로 자동화 · PR마다 실행",
    link: {
      label: "github.com/TEAM-SEED-PLUS/SEED-PLUS-FRONTEND",
      href: "https://github.com/TEAM-SEED-PLUS/SEED-PLUS-FRONTEND",
    },
    overview: [
      { label: "역할", lines: ["도입 · 테스트 설계", "PR CI 연결"] },
      { label: "대상", lines: ["SEED+ 웹", "루게더 웹(PWA)"] },
      { label: "기간", lines: ["2026.11 ~ 현재"] },
      { label: "스택", lines: ["Playwright · TypeScript", "GitHub Actions"] },
    ],
    intro: [],
    cases: [
      {
        title: "SEED+ · 손으로 하던 화면 확인을 E2E로",
        left: [
          {
            type: "text",
            label: "도입한 이유와 첫 테스트",
            body: "SEED+의 프론트엔드를 혼자 맡다 보니 코드를 고칠 때마다 **모든 화면을 직접 눌러 확인**하는 일이 버거웠습니다. AI가 작성한 코드를 E2E 테스트로 검증하는 사례를 보고 Playwright를 도입했습니다.",
          },
          {
            type: "list",
            items: [
              "처음 만든 테스트는 랜딩에 로그인 버튼이 보이는지 확인했습니다.",
              "얼마 전 고친, 버튼이 1~2초 늦게 뜨는 문제는 **이 테스트로 잡을 수 없었습니다**.",
              "버튼이 나타날 때까지 테스트가 기다려 주어, 늦게 떠도 통과하기 때문입니다.",
            ],
          },
          {
            type: "list",
            label: "그래서 한 일",
            items: [
              "로그인 확인을 일부러 3초 늦추고, 버튼이 1초 안에 보이는지 확인하는 테스트 추가",
              "인증 요청을 모의해 백엔드와 무관하게 같은 결과",
              "PR CI에 연결, 실패하면 trace와 스크린샷 보관",
            ],
          },
        ],
        right: [
          {
            type: "code",
            sample: {
              file: "e2e/access.spec.ts",
              code: `test(
  '로그인 확인이 느려도 랜딩의 로그인 버튼은 바로 보인다',
  async ({ page }) => {
    await page.route('**/api/v1/auth/csrf',
      async (route) => {
        await new Promise((resolve) =>
          setTimeout(resolve, 3000));
        await route.continue();
      });
    await page.goto('/');
    const loginButton =
      page.getByRole('link', { name: '로그인' });
    await expect(loginButton)
      .toBeVisible({ timeout: 1000 });
  });`,
            },
            caption: "e2e/access.spec.ts 발췌(줄바꿈 조정). 로그인 확인을 3초 늦춰도 버튼이 1초 안에 보여야 통과합니다.",
          },
          {
            type: "list",
            label: "테스트를 만들며 정한 원칙",
            items: [
              "**겪은 문제에서 먼저 고릅니다.**",
              "**문제가 생기면 실패하는지 확인합니다.** 통과만으로는 알 수 없습니다.",
              "**무엇을 확인할지는 직접 정합니다.** AI가 만든 테스트도 읽고 커밋합니다.",
            ],
          },
        ],
      },
    ],
    stats: {
      title: "루게더 웹으로 넓히기",
      items: [
        { value: "배치 규칙", body: "화면 크기 네 가지에서 요소의 위치와 크기를 수치로 확인합니다." },
        {
          value: "8 → 0건",
          body: "아이폰 duo 화면 대응 중 찾은 배치 결함. 실패하는 테스트로 먼저 적어 두고 고쳤습니다.",
        },
        { value: "PR마다 실행", body: "두 프로젝트 모두 PR에서 돌고, 실패하면 기록이 남습니다." },
      ],
    },
    closing: {
      type: "result",
      label: "배운 것",
      body: "테스트가 통과한다고 해서 걱정하던 문제까지 확인된 것은 아니었습니다. AI가 코드와 테스트를 빠르게 만들어 줘도 무엇을 확인할지는 제가 정해야 합니다.",
    },
  },
];

/** 04 · JSChoIog — 마지막 쪽의 작은 프로젝트 */
export const sideProjects = {
  id: "jschoiog",
  no: "04",
  name: "JSChoIog",
  period: "2025.09 ~ 현재",
  covers: "Notion 기반 기술 블로그 · 검색 유입을 위한 SEO 구성",
  link: { label: "jschoiog.site", href: "https://www.jschoiog.site" },
  items: [
    {
      name: "JSChoIog",
      meta: "Notion을 CMS로 쓰는 기술 블로그·포트폴리오 · 개인 · 2025.09 ~ 현재",
      points: [
        "검색으로 읽혀야 하는 기술 블로그라 **SEO에 유리한 Next.js**를 골랐습니다. 글을 정적 생성하고 글마다 메타데이터·OG 이미지, sitemap·RSS를 제공합니다.",
        "글은 원래 공부 기록을 쓰던 Notion에서 쓰고 API로 읽어, 글을 올릴 때 커밋이나 배포가 필요 없습니다. API가 느려 **30분 단위 재검증**으로 캐시하고, 중복 호출은 React cache()로 합쳤습니다. 재검증을 별도 서버 없이 쓰려고 Vercel에 배포했습니다.",
        "GDGoC Konkuk 결과 공유회 **최우수 스터디(1위)**",
      ],
      stack: "Next.js(App Router) · TypeScript · Tailwind CSS · Notion API · Vercel",
    },
  ],
};

/** 목차 — 표지의 CONTENTS 표와 /about 카드가 함께 쓴다 */
export const contents = [
  ...projects.map((p) => ({ id: p.id, no: p.no, name: p.name, covers: p.covers, period: p.period })),
  {
    id: sideProjects.id,
    no: sideProjects.no,
    name: sideProjects.name,
    covers: sideProjects.covers,
    period: sideProjects.period,
  },
];
