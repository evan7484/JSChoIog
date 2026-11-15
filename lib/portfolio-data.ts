// 포트폴리오 내용의 단일 소스 — Figma "최준서_포트폴리오" 문서와 같은 구성.
// 문장·숫자·코드를 고칠 때는 이 파일만 건드리면 된다. 화면 구조는 components/portfolio/*.
// 본문 문자열 안의 **굵게** 표기는 강조로 렌더된다.

export interface CodeSample {
  file: string;
  code: string;
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
  | {
      type: "bars";
      groups: { title: string; rows: { label: string; value: string; ratio: number; after?: boolean }[] }[];
      note: string;
    }
  | { type: "coords" }
  | { type: "shot"; shot: Shot }
  | { type: "result"; label: "결과" | "배운 것"; body: string };

export interface Case {
  title: string;
  /** 2단 위에 한 줄로 놓이는 블록 */
  lead?: Block[];
  left: Block[];
  right: Block[];
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
  intro: Block[];
  screens?: { title: string; main: Shot; pair: [Shot, Shot]; caption: string };
  cases: Case[];
  stats?: { title: string; items: Stat[] };
  closing?: Block;
}

export const profile = {
  name: "최준서",
  title: "Frontend Developer",
  lead: "제 코드가 화면을 만지는 사람의 손끝에 바로 닿는다는 점이 좋아 프론트엔드를 합니다.",
  intro:
    "작은 손맛 하나가 누군가의 창작을 편하게도, 답답하게도 만든다는 것을 편집기를 만들며 겪었습니다. 그래서 만든 화면은 숫자와 테스트로 확인하고, 팀이 같은 기준을 보도록 기록으로 남깁니다.",
  highlights: [
    {
      label: "손끝의 차이",
      value: "12 → 2회",
      body: "편집기에서 가구를 한 번 선택할 때 다시 그려지는 타일 수. 출시 뒤에도 사용자 제보에서 원인을 찾아 계속 다듬었습니다.",
    },
    {
      label: "통과가 아니라 확인",
      value: "npm 공개",
      body: "통과한 빌드가 실행 즉시 꺼진 사고 뒤, 빌드 산출물을 검사하는 오픈소스 CLI를 만들었습니다.",
    },
    {
      label: "기억이 아니라 기록",
      value: "6개 직무",
      body: "역할이 잘게 나뉜 팀에 노션 티켓으로 일을 주고받는 방식을 제안하고 저부터 지켰습니다.",
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
  path: "동아리 첫 팀 프로젝트에서 버튼과 입력창을 만들던 저는, 지금 요소를 고르고 옮기고 되돌리는 편집기의 핵심 동작을 설계하고 있습니다. 앞으로는 **누구나 무언가를 만들 수 있게 돕는 도구**를 만드는 프론트엔드 엔지니어가 되고 싶습니다. 배운 것은 문서로 정리해 소실되지 않는 지식으로 남기겠습니다.",
  principles: [
    {
      name: "\"통과\"가 아니라 \"확인\"",
      body: "렌더 횟수나 테스트 결과처럼 확인한 값만 결과로 적고, 측정한 것과 추정한 것을 구분합니다.",
    },
    {
      name: "기억이 아니라 기록",
      body: "규칙은 테스트에, 약속은 티켓과 문서에 둡니다. 제안한 방식은 저부터 지킵니다.",
    },
    {
      name: "출시 뒤에도 계속 다듬기",
      body: "사용자 제보에서 원인을 찾아 구조를 바꾸고, 같은 문제가 돌아오지 않게 테스트로 고정합니다.",
    },
    {
      name: "AI와 일하되 확인은 직접",
      body: "AI 에이전트로 구현 속도를 높이고, 실기기 확인과 결과 검증은 제가 맡습니다.",
    },
  ],
  activities: [
    { period: "2026.04 ~ 2026.12", body: "**SW마에스트로 17기**  팀 tripleS 프론트엔드(앱·웹)" },
    {
      period: "2025.03 ~ 2026.08",
      body: "**KUIT 웹 프론트엔드 파트**  5기 파트원 → 6·7기 파트 리드(두 기수 약 40명)",
    },
    { period: "2025.09 ~ 현재", body: "**GDGoC Konkuk**  멤버 → 코어 멤버" },
    {
      period: "자격",
      body: "Google Analytics Certification (2026.10) · TOPCIT 수준 3 (600점, 2026.10)",
    },
  ],
};

export const projects: Project[] = [
  {
    id: "seedplus",
    no: "01",
    name: "SEED+",
    tagline: "공공데이터와 AI로 상권 분석과 수익률·생존율 예측을 제공하는 창업 의사결정 웹 서비스",
    period: "2026.02 ~ 현재",
    covers: "여섯 직무가 같은 티켓을 보게 하기 · 기획서 규칙 번호를 코드·테스트와 맞추기",
    link: { label: "seedplusai.com", href: "https://www.seedplusai.com" },
    icon: "/portfolio/seedplus-icon.png",
    overview: [
      { label: "역할", lines: ["프론트엔드 1인", "(저장소 커밋의 약 95%)"] },
      { label: "팀", lines: ["기획·디자인·FE·BE·", "인프라·데이터"] },
      { label: "기간", lines: ["2026.02 ~ 현재", "운영 중"] },
      { label: "스택", lines: ["React · TypeScript · Vite", "Tailwind · Zustand · Vitest"] },
    ],
    intro: [
      {
        type: "list",
        items: [
          "화면 12개 영역과 컴포넌트 50여 개를 구현하고 목 데이터를 실제 API로 전환했습니다. 수익률·생존율 계산기, 내 상가 만들기, 마이페이지, 피드, 생존율 리포트 PDF 출력을 만들었습니다.",
          "스크롤 스냅 랜딩, OG·robots·sitemap, GA 연동을 맡았습니다.",
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
        title: "CASE 1 · 여섯 직무가 같은 티켓을 보도록",
        left: [
          {
            type: "text",
            label: "상황",
            body: "SEED+는 기획·디자인·프론트엔드·백엔드·인프라·데이터 여섯 직무가 함께 만들고 운영합니다. 보통의 팀 프로젝트보다 역할이 훨씬 잘게 나뉘어 있고, 그중 프론트엔드는 저 혼자입니다. 화면 하나에도 여러 직무의 결정이 함께 담기는 만큼, **말로만 주고받으면 누군가의 의도가 중간에서 사라지기 쉬운 구조**였습니다.",
          },
          {
            type: "text",
            label: "제안",
            body: "그래서 **모든 작업을 노션 티켓으로 주고받고 기록하는 방식**을 팀에 제안했습니다. AI 에이전트와 함께 일하는 지금은 문서화가 업무 효율에 더 크게 작용한다고 봤습니다. 잘 정리된 티켓은 사람에게도, AI에게도 바로 일을 시작할 수 있는 맥락이 됩니다.",
          },
        ],
        right: [
          {
            type: "list",
            label: "제안한 만큼 저부터 지켰습니다",
            items: [
              "기획자와 다른 직무가 넘겨준 티켓으로 일을 받습니다.",
              "그 티켓에 작업 내용과 진행 상태를 빠짐없이 기록합니다.",
              "다른 직무에 부탁할 일은 아주 간단한 것이라도 티켓으로 요청합니다.",
            ],
          },
          { type: "flow", title: "티켓 한 장에 남는 것", steps: ["요청", "작업 내용", "진행 상태"] },
          {
            type: "result",
            label: "결과",
            body: "무엇을 요청했고 어디까지 진행됐는지가 한곳에 남아 소통이 한결 편해졌고, 지금까지 전달 오류가 거의 없이 프로젝트를 이어 가고 있습니다.",
          },
        ],
        tail: [
          {
            type: "result",
            label: "배운 것",
            body: "좋은 협업은 기억이 아니라 기록 위에서 이루어집니다. 앞으로도 팀이 같은 문서를 보며 일하는 환경을 만들고, 그 약속을 가장 먼저 지키는 사람이 되겠습니다.",
          },
        ],
      },
      {
        title: "CASE 2 · 사람이 잊는 규칙은 훅과 테스트가 확인하도록",
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
            items: [
              "nginx 캐시 헤더를 추가해 배포 뒤에도 옛 파일이 쓰이던 문제 해결",
              "Docker 이미지의 OS 패키지 보안 패치 적용",
            ],
          },
        ],
      },
      {
        title: "CASE 3 · 기획서의 규칙 번호가 그대로 코드와 테스트가 되도록",
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
            body: "혼자 맡은 영역일수록 기준을 머릿속이 아니라 밖에 둡니다. 규칙은 테스트에, 약속은 티켓에 두면 제가 없어도 같은 결과가 나옵니다.",
          },
        ],
      },
    ],
  },
  {
    id: "rougether",
    no: "02",
    name: "루게더",
    tagline:
      "루틴을 지키면 방이 자라는 소셜 할 일 관리 앱. iOS·Android 출시, 같은 코드로 웹(PWA)·데스크톱 운영",
    period: "2026.04 ~ 현재",
    covers: "자유 배치 편집기 설계 · 선택과 렌더 최적화 · 웹 버전",
    link: { label: "app.rougether.com", href: "https://app.rougether.com" },
    icon: "/portfolio/rougether-icon.png",
    overview: [
      { label: "역할", lines: ["프론트엔드 1인", "(앱·웹)"] },
      { label: "팀", lines: ["SW마에스트로 17기", "팀 tripleS"] },
      { label: "기간", lines: ["2026.04 ~ 현재", "운영 중"] },
      { label: "스택", lines: ["React · RN Web · Expo", "TypeScript · Reanimated"] },
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
        title: "CASE 1 · 칸에 끼워 넣던 방 꾸미기를 자유 배치 편집기로",
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
              "**드래그 중에는 리렌더 0회.** 손가락을 따라가는 값은 UI 스레드에서만 움직이고, 놓는 순간 한 번만 상태에 반영합니다.",
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
        title: "CASE 2 · \"다른 가구까지 같이 움직여 배치가 불편하다\"",
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
        title: "CASE 3 · 방을 건드릴 때마다 카탈로그 전체가 다시 그려지던 문제",
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
            body: "작은 손맛 하나가 누군가의 창작을 편하게도, 답답하게도 만듭니다. 그 차이는 \"느린 것 같다\"는 느낌이 아니라 횟수를 세는 데서 찾았습니다.",
          },
        ],
      },
      {
        title: "CASE 4 · 하루에도 여러 번 로그인이 풀리던 문제",
        left: [
          {
            type: "text",
            label: "문제와 원인",
            body: "같은 기기인데 하루에도 여러 번 로그인 화면으로 나간다는 보고가 있었습니다. refresh 토큰은 1회용이라 갱신할 때마다 바뀌는데, 여러 탭이나 백그라운드 작업이 동시에 갱신하면 늦은 쪽이 이미 쓰인 토큰을 내밀게 됩니다. 서버는 이를 탈취로 보고 그 회원의 토큰을 모두 폐기했습니다.",
          },
        ],
        right: [
          {
            type: "list",
            label: "해결",
            items: [
              "클라이언트: **Web Locks API**로 탭 사이의 갱신을 한 번으로 묶고, 백그라운드에서는 토큰을 회전하지 않게 했습니다.",
              "서버: 직접 고쳤습니다. 직전 토큰 재사용에 60초 유예를 두고, 폐기 범위를 기기 단위로 좁혔습니다.",
              "바뀐 정책은 팀 공유 문서에 남겼습니다.",
            ],
          },
        ],
      },
      {
        title: "CASE 5 · 같은 코드로 웹과 데스크톱까지: 하이드레이션이 프레임을 지우던 문제",
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
      },
      {
        title: "그 밖에 웹에서 한 일",
        left: [
          {
            type: "list",
            items: [
              "**웹 접근성.** 스토리북의 모든 스토리에 axe 검사를 붙이고, RN Web이 옮기지 않던 접근성 상태를 개별 aria-* 속성으로 바꿔 ARIA 위반 54건을 0건으로 줄였습니다(예외 1건). 이후 회귀는 CI가 막습니다.",
              "**웹 구글 로그인.** 구글 버튼이 iframe으로 바뀌며 로그인이 막힌 문제를 OAuth 리다이렉트 방식으로 바꿔 해결하고, state·nonce 검증과 회귀 테스트를 더했습니다.",
            ],
          },
        ],
        right: [
          {
            type: "list",
            items: [
              "**폰트 글리프.** 사용자가 고르는 폰트의 글리프 표를 대조해, 한 줄 안에서 문장부호만 시스템 서체로 바뀌는 곳 22개를 찾아 고치고 테스트로 고정했습니다.",
              "**자동화.** GitHub Actions 워크플로 14종으로 빌드, 배포, 릴리스 검증을 돌립니다.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "expo-release-guard",
    no: "03",
    name: "expo-release-guard",
    tagline: "Expo 앱의 빌드 산출물을 출시 전에 검사하는 오픈소스 CLI",
    period: "2026.11 ~ 현재",
    covers: "통과한 빌드가 실행 즉시 꺼진 사고를 도구로 만들기",
    link: {
      label: "github.com/evan7484/expo-release-guard",
      href: "https://github.com/evan7484/expo-release-guard",
    },
    overview: [
      { label: "역할", lines: ["개인 프로젝트"] },
      { label: "배포", lines: ["npm v0.3.0", "GitHub Action 포함"] },
      { label: "기간", lines: ["2026.11 ~ 현재"] },
      { label: "스택", lines: ["TypeScript · Node.js", "tsup · Vitest"] },
    ],
    intro: [],
    cases: [
      {
        title: "초록불만 믿어서는 안 된다는 것을 배운 날",
        left: [
          {
            type: "text",
            label: "사고",
            body: "루게더를 AI 에이전트와 함께 빠르게 만들던 때였습니다. 캘린더 기능을 붙인 버전이 **빌드 성공, 테스트 990개 통과, 스토어 업로드**까지 모두 초록불이었는데도, 배포 전 실기기 확인에서 실행하자마자 꺼졌습니다.",
          },
          {
            type: "list",
            items: [
              "원인은 AI가 쓰지 않는 권한이라 판단해 지운 키였습니다. 캘린더 라이브러리가 앱이 켜지는 순간 그 키를 찾았습니다.",
              "설정 파일(입력)은 정상이고 **빌드 산출물만** 깨져 있어, 입력을 보는 테스트는 모두 통과했습니다.",
              "앱이 오류 수집 도구보다 먼저 꺼져 기록도 남지 않았습니다.",
            ],
          },
          {
            type: "list",
            label: "바로 한 일",
            items: [
              "빌드 결과물을 직접 검사하는 단계를 모든 PR에 추가",
              "\"배포 전 실기기 확인은 사람이 맡는다\"를 AI 작업 규칙에 명시",
              "작업마다 무엇을 측정했고 무엇이 추정인지 구분해 기록",
            ],
          },
        ],
        right: [
          {
            type: "terminal",
            lines: [
              { text: "$ npx expo-release-guard check" },
              { text: "✖ ios-plist: 1 of 3 Info.plist rule(s) violated", tone: "fail" },
              { text: "    - NSRemindersUsageDescription is missing" },
              { text: "      or empty." },
              { text: "      expo-calendar reads this key on launch." },
              { text: "      Without it the app dies on the splash" },
              { text: "      screen." },
              { text: "✔ android-manifest: all 15 permission", tone: "pass" },
              { text: "  rule(s) satisfied" },
              { text: "" },
              { text: "1 check(s) failed." },
            ],
            caption:
              "출력 예시(줄바꿈 조정). 무엇이 빠졌는지와, 그 항목을 지우면 안 되는 이유를 함께 보여 줍니다.",
          },
          {
            type: "list",
            label: "도구로 만들며 정한 원칙",
            items: [
              "**입력이 아니라 산출물을 봅니다.**",
              "**모든 규칙에 이유를 적습니다.** 다음 사람이 같은 키를 다시 지우지 않도록.",
              "**추측하지 않습니다.** 후보 파일이 여러 개면 고르지 않고 경로를 요구하며 실패합니다.",
            ],
          },
        ],
      },
    ],
    stats: {
      title: "구성",
      items: [
        { value: "검사 5종", body: "Info.plist 키, Android 권한(소스·병합본), 대체 아이콘, 런처 별칭" },
        { value: "테스트 71개", body: "Vitest · TypeScript strict · 판별 유니온 결과 타입 · 한·영 문서" },
        { value: "루게더 적용", body: "루게더 CI가 기존 스크립트 대신 이 패키지로 검사합니다." },
      ],
    },
    closing: {
      type: "result",
      label: "배운 것",
      body: "AI로 생산성이 올라간 만큼 결과를 끝까지 확인하는 일은 더 온전히 제 몫이 됐습니다. 이제는 \"통과했다\"가 아니라 \"확인했다\"고 말할 수 있을 때 작업을 완료했다고 합니다.",
    },
  },
];

/** 04 · JSChoIog · 당번 — 한 쪽에 나란히 놓이는 작은 프로젝트 둘 */
export const sideProjects = {
  id: "jschoiog-dangbun",
  no: "04",
  name: "JSChoIog · 당번",
  period: "2025.06 ~ 현재",
  covers: "Notion 기반 블로그 · 첫 팀 프로젝트",
  link: { label: "jschoiog.site", href: "https://www.jschoiog.site" },
  items: [
    {
      name: "JSChoIog",
      meta: "Notion을 CMS로 쓰는 기술 블로그·포트폴리오 · 개인 · 2026.02 ~ 현재",
      points: [
        "검색으로 읽혀야 하는 기술 블로그라 **SEO에 유리한 Next.js**를 골랐습니다. 글을 정적 생성하고 글마다 메타데이터·OG 이미지, sitemap·RSS를 제공합니다.",
        "글은 Notion에서 쓰고 API로 읽습니다. API가 느려 **30분 단위 재검증**으로 캐시하고, 중복 호출은 React cache()로 합쳤습니다.",
        "GDGoC Konkuk 결과 공유회 **최우수 스터디(1위)**",
      ],
      stack: "Next.js(App Router) · TypeScript · Tailwind CSS · Notion API",
    },
    {
      name: "당번",
      meta: "역할 분담 자동화 웹 서비스 · KUIT 5기 · 프론트엔드 리드 · 2025.06 ~ 2026.02",
      points: [
        "첫 팀 프로젝트였고, 프론트엔드 3인 중 리드를 맡았습니다.",
        "폴더 구조와 라우터를 먼저 정하고, **공통 버튼·입력 컴포넌트**를 만들어 사용법을 문서로 남겼습니다.",
        "회원가입, 매니저/멤버·플레이스 유형 선택 화면을 구현했습니다.",
        "KUIT 5기 데모데이 **최우수상(2위)**",
      ],
      stack: "React 19 · TypeScript · Vite · Tailwind CSS",
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
