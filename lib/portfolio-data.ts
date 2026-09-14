// 포트폴리오 내용의 단일 소스.
// 문장·숫자·코드를 고칠 때는 이 파일만 건드리면 된다. 화면 구조는 components/portfolio/*.

export type Emphasis = { text: string; strong?: boolean };
export type Paragraph = string | Emphasis[];

export interface CodeSample {
  file: string;
  code: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface Issue {
  title: string;
  symptom: Paragraph[];
  fixTitle: string;
  fix: Paragraph[];
  code?: CodeSample[];
  /** 같은 손동작이 어디서 어떤 뜻이었는지 — 제스처 이슈에만 쓴다 */
  meanings?: { area: string; meaning: string; kept: boolean }[];
}

export interface Extra {
  title: string;
  body: string[];
}

export interface CaseStudy {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  role: string;
  team: string;
  period: string;
  stack: string[];
  links: { label: string; href: string }[];
  icon: string;
  screenshots?: { src: string; alt: string; width: number; height: number }[];
  theme: {
    /** 풀블리드 헤더 배경 */
    bg: string;
    /** 헤더 위 보조 텍스트 */
    muted: string;
    /** 강조 색 — 단계 번호, 결과 패널 */
    accent: string;
    /** 강조 색의 연한 배경 */
    tint: string;
  };
  responsibilities: { group: string; items: string[] }[];
  deepDive: {
    headline: string;
    background: Paragraph[];
    approach: Step[];
    code: CodeSample[];
    codeNotes: { title: string; body: string }[];
    result: Paragraph[];
    issues: Issue[];
    lesson?: string[];
  };
  extras: { stats?: { value: string; label: string }[]; items: Extra[] };
}

export const profile = {
  name: "최준서",
  title: "Frontend Developer",
  intro: [
    "사용자가 화면과 주고받는 상호작용에서 즐거움을 느껴 프론트엔드를 선택했고, 눌렀을 때의 반응과 흐름의 자연스러움까지 UI/UX의 일부로 여기고 설계합니다.",
    "기획부터 스토어 출시·운영까지, 실제 사용자가 쓰는 제품을 끝까지 만들어 본 프론트엔드 개발자입니다.",
    "인증·유효성 검증·CI/CD 파이프라인처럼 화면 뒤의 안정성도 프론트엔드의 책임으로 여기고 직접 설계합니다.",
  ],
  links: [
    { label: "GitHub", href: "https://github.com/evan7484" },
    { label: "이메일", href: "mailto:evan7484@naver.com" },
  ],
  activities: [
    { name: "SW마에스트로 17기", period: "2026.04 ~ 2026.12", role: "팀 tripleS · 프론트엔드/모바일" },
    { name: "KUIT 5·6·7기", period: "2025.03 ~ 2026.08", role: "웹 FE 파트원 → 파트 리드" },
    { name: "GDGoC Konkuk 25-26", period: "2025.09 ~ 2026.07", role: "스터디원" },
  ],
  education: { school: "건국대학교", major: "컴퓨터공학부", period: "2022.03 ~ 2026.08 (졸업 예정)" },
};

export const caseStudies: CaseStudy[] = [
  {
    id: "rougether",
    name: "루게더",
    subtitle: "Rougether",
    tagline: "루틴이 방을 키우고, 방이 모여 집이 되는 소셜 루틴 앱. iOS·Android 출시, 같은 코드로 웹(PWA)·데스크톱 버전 운영 중.",
    role: "프론트엔드·모바일 리드",
    team: "2인 — 프론트엔드·모바일 1 (본인), 백엔드 1",
    period: "2026.04 ~ 현재 · SW마에스트로 17기",
    stack: [
      "React", "React Native", "React Native Web", "Expo Router", "TypeScript",
      "Reanimated", "Gesture Handler", "TanStack Query", "Jest", "GitHub Actions", "EAS", "PWA", "GA4",
    ],
    links: [
      { label: "서비스", href: "https://rougether.com" },
      { label: "GitHub", href: "https://github.com/TripleS-soma" },
    ],
    icon: "/portfolio/rougether-icon.png",
    screenshots: [
      { src: "/portfolio/rougether-my-room.jpg", alt: "루게더 나의 방 화면", width: 640, height: 1299 },
      { src: "/portfolio/rougether-house.jpg", alt: "루게더 집 화면", width: 640, height: 1299 },
      { src: "/portfolio/rougether-routines.jpg", alt: "루게더 루틴 목록", width: 640, height: 1299 },
    ],
    theme: { bg: "#2D2623", muted: "#E8DCC8", accent: "#7FA87F", tint: "#EEF4EE" },
    responsibilities: [
      {
        group: "프론트엔드·모바일",
        items: [
          "제스처 우선순위 · 페이저 · iOS 엣지 백 설계",
          "웹·데스크톱(PWA) 버전, 2단 레이아웃",
          "컴포넌트 개발 하네스(Dev 탭) 구축",
          "프론트·백 공유 계약(spec) 저장소 운영",
          "스토어 출시 · GA4 계측 · 랜딩(Astro)",
        ],
      },
      {
        group: "빌드·배포",
        items: ["GitHub Actions 워크플로 12종", "EAS 빌드 · OTA 배포 · 릴리스 스모크 테스트"],
      },
    ],
    deepDive: {
      headline: "손가락 하나에 뜻이 다섯이던 화면, 제스처의 우선순위를 설계하자",
      background: [
        [
          { text: "한 화면 위에 " },
          { text: "세로 당김 새로고침, 하단 탭 가로 페이저, 방↔달력 서브탭 플링, 집 화면 핀치 확대·자리 드래그", strong: true },
          { text: "가 겹쳐 있었고, 아이폰 사용자 습관에 맞춰 직접 만든 가장자리 뒤로가기까지 같은 터치를 두고 경합했습니다." },
        ],
        [
          { text: "집을 확대해 두면 옆 탭으로 못 넘어갔고, 같은 가로 스와이프가 위치에 따라 " },
          { text: "'달력으로'와 '집으로'로 갈렸으며", strong: true },
          { text: ", 시뮬레이터에선 되던 것이 실기기·다른 OS에서 달랐습니다. JS 스레드에서 처리하니 손을 놓은 뒤에야 화면이 따라와 '손맛'도 죽었습니다." },
        ],
      ],
      approach: [
        {
          title: "판정 문법을 하나로 — 축과 임계",
          body: "가로 제스처는 activeOffsetX ±24 / failOffsetY ±36, 세로 당김은 activeOffsetY ±12 / failOffsetX ±12. 한쪽의 실패 조건이 다른 쪽의 활성 조건이 되게 맞췄습니다.",
        },
        {
          title: "누가 먼저 판정하는지 그래프로",
          body: "더 깊은 자식 디텍터가 동률에서 이기고, iOS는 자식 ScrollView가 requireExternalGestureToFail로 페이저의 방향 판정을 기다립니다. 새로고침 팬은 스크롤과 동시 인식.",
        },
        {
          title: "UI 스레드로 옮기고 상태 커밋만 JS로",
          body: "worklet에서 판정·이동을 처리하고 runOnJS는 탭 선택·저장 같은 커밋에만 씁니다. 제스처 객체는 마운트 시 1회만 만들어 드래그 중 리렌더에도 살아남게 했습니다.",
        },
      ],
      code: [
        {
          file: "src/utils/gesture.ts",
          code: `// 가로 우세 + 최소 이동일 때만 활성 — 세로 스크롤·탭은 살려 둔다
export const SWIPE_CLAIM_DX = 24;
export const SWIPE_FAIL_DY = SWIPE_CLAIM_DX * 1.5;

export const horizontalFlingGesture = (id, onFling) =>
  Gesture.Pan().withTestId(id).runOnJS(true)
    .activeOffsetX([-SWIPE_CLAIM_DX, SWIPE_CLAIM_DX])
    .failOffsetY([-SWIPE_FAIL_DY, SWIPE_FAIL_DY]);`,
        },
        {
          file: "src/components/ui/pager-scroll-view.tsx",
          code: `// iOS: 자식 ScrollView는 페이저의 방향 판정을 기다린다
export function usePagerNativeGesture(pager) {
  const native = Gesture.Native();
  return pager ? native.requireExternalGestureToFail(pager) : native;
}
// pager && Platform.OS === 'ios'
//   ? <GestureDetector gesture={native}>{scroll}</GestureDetector>
//   : scroll`,
        },
        {
          file: "src/components/screens/house/camera.ts",
          code: `// 집 화면: 카메라가 이동을 가져가는 조건 (UI 스레드)
export function cameraClaimsMove(touchCount, zoomed, draggingSeat, dx, dy) {
  'worklet';
  if (draggingSeat) return false;
  if (touchCount >= 2) return true;
  return zoomed && Math.hypot(dx, dy) > CAM_PAN_SLOP;
}`,
        },
      ],
      codeNotes: [
        {
          title: "임계는 상수로, 한 곳에",
          body: "가로 우세 판정(24px)과 세로 실패 임계(×1.5)를 utils/gesture.ts에 모아, 집 전환·친구 방 순회·온보딩 슬라이드가 같은 문법을 씁니다.",
        },
        {
          title: "iOS만 스크롤 중재",
          body: "iOS는 ScrollView가 페이저보다 먼저 터치를 잡아 가로 스와이프가 죽었습니다. 자식 스크롤을 Gesture.Native로 감싸 페이저가 '아니다'라고 할 때까지 기다리게 했고, Android는 그대로 둡니다.",
        },
        {
          title: "집 화면 잠금",
          body: "두 손가락이거나 확대 상태의 이동은 카메라가 가져가고(worklet), 그동안 페이저를 잠급니다. 단, 집 페이지가 활성일 때만.",
        },
      ],
      result: [
        "세로 당김·가로 페이저·핀치 확대가 한 화면에서 서로를 방해하지 않고, iOS와 Android가 같은 손동작에 같은 결과를 냅니다.",
        "판정과 이동이 UI 스레드에서 돌아 손가락을 따라오는 반응이 즉시 나옵니다.",
      ],
      issues: [
        {
          title: "다 맞춰도, 같은 손동작에 뜻이 셋",
          symptom: [
            [
              { text: "임계와 우선순위를 다 맞춰도 " },
              { text: "'나의 방'에서는 가로 스와이프가 손가락 위치에 따라 다른 뜻", strong: true },
              { text: "이었습니다. 달력 위에서는 '월 이동', 방 영역에서는 '방↔달력 서브탭 전환', 그 밖에서는 '하단 탭 이동'." },
            ],
            "세 제스처가 모두 정상 동작해도 사용자는 무엇이 일어날지 예측할 수 없었습니다. 기술적으로는 풀 수 있는 충돌이었지만, 풀수록 규칙이 늘어 사용자에게 설명이 안 되는 화면이 됐습니다.",
          ],
          meanings: [
            { area: "달력 위", meaning: "월 이동 (#562)", kept: false },
            { area: "방 영역", meaning: "방 ↔ 달력 전환 (#561)", kept: false },
            { area: "그 밖", meaning: "하단 탭 이동 (#563)", kept: true },
          ],
          fixTitle: "충돌을 푸는 대신 뜻을 하나로 줄였습니다",
          fix: [
            "방↔달력 서브탭 플링과 달력 월 스와이프를 제거하고(monthSwipe=false), 가로 스와이프는 어디서 시작하든 하단 탭 이동 하나만 뜻하게 했습니다. 서브탭은 탭 버튼으로만 바꿉니다. (#825)",
            "제거한 코드는 남겨 두지 않고 주석에 이유를 적어, 나중에 누가 다시 붙이려 할 때 왜 뺐는지 알 수 있게 했습니다.",
          ],
          code: [
            {
              file: "src/components/screens/my-room-screen.tsx",
              code: `// monthSwipe=false 유지 (#825) — 달력 위 가로 스와이프가
// '월 이동'이라는 또 다른 뜻을 갖지 않게 한다.
<Calendar monthSwipe={false} ... />

// 스와이프는 전부 셸 탭 페이저 몫 — 나의 방 안에서 같은 손동작이
// 손가락 위치에 따라 '달력으로'와 '집으로'로 갈리던 것을 하나로 통일.`,
            },
          ],
        },
        {
          title: "iOS 실기기에서만, 스와이프가 갑자기 멈춤",
          symptom: [
            [
              { text: "iOS 실기기에서만, 탭 사이를 스와이프하다 갑자기 멈추고 그 뒤로 스와이프가 전혀 먹지 않았습니다.", strong: true },
              { text: " 시뮬레이터에선 재현이 안 됐습니다." },
            ],
            "원인은 뒤로가기였습니다. 앱이 네이티브 스택이 아니라 셸 상태로 화면을 바꾸는 구조라 아이폰 사용자 습관에 맞춰 엣지 백을 직접 만들었는데(#564), 이 팬이 페이저와 같은 터치를 두고 경합했습니다.",
            [
              { text: "형제 디텍터가 리렌더로 재부착되며 활성 팬이 취소되면 " },
              { text: "onFinalize가 JS에 닿지 않아 swiping 래치가 true로 굳고", strong: true },
              { text: ", 이후 활성화가 영영 건너뛰어졌습니다. (2026-09-08 분석)" },
            ],
          ],
          fixTitle: "인식 단계에서 끄고, 래치는 매 터치마다 리셋",
          fix: [
            [
              { text: "탭 루트에선 엣지 백 인식 자체를 끔", strong: true },
              { text: " — JS 가드가 아니라 enabled로, 페이저의 터치를 먼저 잡을 수 없게 (#1143)" },
            ],
            [
              { text: "래치를 매 터치 시작·외부 탭 전환에서 리셋", strong: true },
              { text: " — onFinalize가 누락돼도 다음 스와이프가 살아남게" },
            ],
            [
              { text: "엣지 백은 탭/서브화면 경계를 넘을 때만 재구성", strong: true },
              { text: " — 데이터 리렌더가 활성 제스처를 갈아끼우지 않게. 서브화면은 전폭 스와이프 백(#1135), 가로 제스처를 쓰는 화면은 왼쪽 28px만" },
            ],
          ],
          code: [
            {
              file: "src/components/app/use-app-navigation.ts",
              code: `// 탭 루트에선 인식 자체를 끈다 (#1143)
const edgeBackEnabled =
  Platform.OS === 'ios' && TAB_FOR_SCREEN[screen] == null;

const edgeBackPan = useMemo(() => Gesture.Pan()
  .enabled(edgeBackEnabled).runOnJS(true).maxPointers(1)
  .activeOffsetX(24).failOffsetY([-16, 16])
  .onTouchesDown((e, mgr) => {
    // 서브화면은 전폭(#1135), 가로 제스처 화면은 왼쪽 28px만
    const ok = fullSwipeRef.current || e.allTouches[0].x <= EDGE_BACK_WIDTH;
    if (!ok) mgr.fail();
  })
  .onEnd((e) => {
    if (e.translationX > 64 || e.velocityX > 700) goBackRef.current();
  }),
  [edgeBackEnabled]); // 경계를 넘을 때만 재구성`,
            },
            {
              file: "src/components/app/tab-pager.tsx",
              code: `.onTouchesDown((e, mgr) => {
  // iOS: 활성 팬이 형제 디텍터의 재부착·취소로 드롭되면
  // onFinalize가 JS에 닿지 않아 true로 굳는다 (2026-09-08 분석)
  swiping.value = false;
  ...`,
            },
          ],
        },
      ],
      lesson: [
        "제스처 충돌은 대부분 기술로 풀 수 있지만, 풀었다고 사용자가 편해지는 건 아닙니다. 손동작 하나에 뜻이 여럿이면 규칙을 아무리 잘 세워도 사용자는 그 규칙을 모릅니다.",
        "실기기에서 iOS·Android를 번갈아 눌러 보는 것을 검증 절차에 넣었습니다. 시뮬레이터가 통과시키는 제스처 버그가 생각보다 많았습니다.",
      ],
    },
    extras: {
      stats: [
        { value: "273", label: "컴포넌트" },
        { value: "1,523", label: "테스트 케이스 (파일 250개)" },
        { value: "18", label: "Dev 갤러리 등록 화면·컴포넌트" },
      ],
      items: [
        {
          title: "같은 코드로 웹·데스크톱까지",
          body: [
            "expo export --platform web으로 PWA 빌드, app.rougether.com에 배포. .web.ts 모듈 6개로 네이티브 SDK를 웹 번들에서 제외하고, 카카오 로그인은 REST 인가 코드 리다이렉트를 직접 구현.",
            "데스크톱은 480px 폰 컬럼, 960px 이상은 [캔버스 | 할 일] 2단으로 최대 1200px.",
            "정적 export의 서버 렌더는 창 폭을 몰라 첫 렌더 마크업이 어긋나면 React가 className 차이를 고치지 않아 프레임이 영영 안 붙었습니다. 첫 렌더는 서버와 같게 두고 마운트 뒤에 프레임을 적용하고, 루트 타입이 Fragment↔View로 바뀌어 리마운트되지 않도록 항상 같은 트리를 그립니다.",
          ],
        },
        {
          title: "곰 발바닥 당겨서 새로고침",
          body: [
            "RN RefreshControl은 인디케이터 커스텀이 안 돼, RNGH 팬 + Reanimated로 직접 구현.",
            "맨 위에서 아래로 끌면 콘텐츠가 절반 저항으로 따라오고 발바닥이 자라남 — iOS 바운스는 이중 동작이라 끔.",
          ],
        },
        {
          title: "하단바 드래그 선택",
          body: [
            "알약 안에서 8px 넘게 끌면 선택 표시가 손가락을 따라오고, 놓을 때 한 번만 전환.",
            "실제 탭 너비·중심을 측정해 글꼴·화면 폭이 달라도 좌표를 가정하지 않음.",
          ],
        },
        {
          title: "배포가 사용자에게 닿았는지까지 검증",
          body: [
            "GitHub Actions 워크플로 12종 — CI, EAS 빌드, dev·production OTA, 핫픽스 OTA, iOS 릴리스 스모크 테스트.",
            "배포 후 번들 지문을 대조해 OTA 도달 여부를 확인하고 Sentry 소스맵을 함께 올려, 릴리스 성공 여부를 사람이 확인하지 않아도 되게.",
          ],
        },
      ],
    },
  },
  {
    id: "seedplus",
    name: "SEED+",
    subtitle: "시드플러스",
    tagline: "AI·공공데이터로 상권 분석·수익률·생존율 예측을 제공하는 점포형 창업 의사결정 플랫폼. seedplusai.com 운영 중.",
    role: "프론트엔드 리드 개발자",
    team: "팀 SEED+ — FE 1 (본인), BE, AI",
    period: "2026.02 ~ 현재",
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "framer-motion", "Vitest", "husky", "Docker", "nginx", "GitHub Actions", "GA4"],
    links: [
      { label: "서비스", href: "https://www.seedplusai.com" },
      { label: "GitHub", href: "https://github.com/TEAM-SEED-PLUS/SEED-PLUS-FRONTEND" },
    ],
    icon: "/portfolio/seedplus-icon.png",
    screenshots: [
      { src: "/portfolio/seedplus-dashboard.png", alt: "SEED+ 홈 대시보드 — 상권날씨·주간 브리핑·실시간 채팅", width: 1400, height: 784 },
      { src: "/portfolio/seedplus-store-builder.png", alt: "SEED+ 내 상가 만들기 — 업종·지역 필터와 수익률 카드", width: 1432, height: 806 },
    ],
    theme: { bg: "#3182F6", muted: "#DCEBFF", accent: "#3182F6", tint: "#EAF2FF" },
    responsibilities: [
      {
        group: "프론트엔드 리드",
        items: [
          "수익률·생존율 계산기, 내 상가 만들기(필터·북마크), 마이페이지, 피드 구현 및 실 API 연동",
          "세션 기반 인증·회원가입 폼 흐름, 유효성 규칙 V-01~V-07 구현",
          "랜딩 · SEO(OG/robots/sitemap) · GA 웹 스트림",
          "Vitest 테스트 CI · husky 훅 · Docker + nginx 배포 · PR/이슈 컨벤션 문서화",
        ],
      },
    ],
    deepDive: {
      headline: "기획서의 규칙 번호가 그대로 코드와 테스트가 되게 하자",
      background: [
        [
          { text: "회원가입·로그인 기능명세서 v2.0의 유효성·처리규칙 시트에는 " },
          { text: "V-01(이메일)부터 V-07까지 번호가 붙은 규칙", strong: true },
          { text: "이 있었습니다. 기획·백엔드·프론트가 같은 번호로 대화하는데, 코드에서는 규칙이 컴포넌트 안에 흩어져 \"V-02가 어디 있지?\"를 찾기 어려웠습니다." },
        ],
        [
          { text: "게다가 인증 계약이 휴대폰 → loginId / 이메일 기반으로 바뀌는 중", strong: true },
          { text: "이라 기존 검증을 깨지 않으면서 새 규칙을 준비해야 했습니다." },
        ],
      ],
      approach: [
        {
          title: "규칙 = 함수 = 테스트",
          body: "authValidation.ts에 규칙마다 함수를 두고 주석에 V-번호를 적었으며, Vitest describe 이름도 'V-01 이메일'처럼 같은 번호를 씁니다. 규칙이 바뀌면 테스트가 불일치를 먼저 잡습니다.",
        },
        {
          title: "서버와 같은 정규화",
          body: "서버가 이메일을 소문자로 저장하므로 normalizeEmail로 동일하게 맞췄습니다. V-08(로그인 실패 잠금)은 서버 책임이라 제외했습니다.",
        },
        {
          title: "병행 이행",
          body: "기존 휴대폰 기반 formValidation.ts는 그대로 두고 신규 모듈을 분리해, 백엔드 이메일 API가 준비된 뒤 화면을 연결하도록 했습니다.",
        },
      ],
      code: [
        {
          file: "src/utils/authValidation.ts",
          code: `// 기능명세서 v2.0 ③유효성·처리규칙 시트(V-01~V-07) 구현.
/** V-01 이메일 — RFC 5322 단순화 패턴 */
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/;

/** 서버가 소문자로 정규화해 저장하므로 클라이언트도 동일하게 맞춘다 */
export const normalizeEmail = (v: string) => v.trim().toLowerCase();

/** V-01 */
export const validateEmail = (value: string) => {
  const email = value.trim();
  if (!email) return '이메일을 입력해주세요';
  if (!EMAIL_PATTERN.test(email)) return '올바른 이메일 형식이 아닙니다';
  return '';
};

/** V-02 보조 — 강도바·체크리스트 표시에 사용 */
export const getPasswordChecklist = (v: string) => ({
  hasLetter: /[A-Za-z]/.test(v),
  hasNumber: /\\d/.test(v),
  hasSpecial: /[!@#$%^&*]/.test(v),
  hasMinLength: v.length >= 8 && v.length <= 64,
});`,
        },
        {
          file: "src/utils/authValidation.test.ts",
          code: `// 규칙이 바뀌면 이 테스트가 명세와의 불일치를 잡는다
describe('V-01 이메일', () => {
  it('빈 값과 잘못된 형식을 구분해 안내한다', () => {
    expect(validateEmail('')).toBe('이메일을 입력해주세요');
    expect(validateEmail('seedplus@')).toBe('올바른 이메일 형식이 아닙니다');
  });
  it('앞뒤 공백은 무시한다', () => {
    expect(validateEmail('  seedplus@email.com  ')).toBe('');
  });
});`,
        },
      ],
      codeNotes: [
        { title: "규칙 하나 = 함수 하나", body: "패턴 상수 위에 V-번호 주석을 달아 명세서와 1:1로 대응시켰습니다. 빈 값과 형식 오류를 다른 문구로 안내합니다." },
        { title: "체크리스트 · 강도 표시", body: "V-02 보조 함수로 강도바와 체크리스트 UI가 같은 규칙을 공유합니다." },
        { title: "테스트가 명세를 지킨다", body: "describe('V-01 이메일')처럼 번호를 그대로 써서 리뷰어가 기획서와 테스트를 나란히 읽을 수 있습니다." },
      ],
      result: [
        "기획서 → 코드 → 테스트가 같은 번호를 공유해, 규칙 변경 요청이 오면 어느 함수와 테스트를 고칠지 바로 찾습니다.",
        "휴대폰 기반 검증을 유지한 채 이메일 기반 규칙을 미리 준비해, 백엔드 계약 전환 시 화면 연결만으로 이행했습니다.",
      ],
      issues: [],
    },
    extras: {
      items: [
        {
          title: "사람이 잊는 규칙은 훅과 CI가 대신 기억하게",
          body: [
            "PR CI 7단계 — secrets 스캔 → lint → tsc -b → Vitest → build → Docker build → 이미지 취약점 스캔. 하나라도 실패하면 머지 불가. 테스트가 명세 역할을 하므로 CI가 곧 기획서 검증.",
            "Git 훅(husky) — 브랜치명·커밋 메시지 규칙 검사, 스테이징된 추가 라인만 훑어 하드코딩 IPv4 차단 (127.0.0.1 등 허용, lock 파일 제외).",
            "CI/CD — develop push → Docker 빌드 → ECR push, CI 성공 시 Dev CD가 이어서 배포(workflow_run), prod는 별도 AWS CD. nginx 단일 컨테이너, 환경별 값은 window.__ENV__로 런타임 주입.",
          ],
        },
      ],
    },
  },
];
