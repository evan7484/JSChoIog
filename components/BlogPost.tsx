import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";

const posts = [
  {
    id: 1,
    title: "안녕하세요 반가워요 이건 기술블로그",
    category: "Tech",
    date: "2025.11.15",
    excerpt:
      "React와 TypeScript를 활용한 현대적인 웹 개발에 대한 이야기를 시작합니다...",
    readTime: "5분",
    tags: ["React", "TypeScript", "Web Development"],
    color: "from-blue-400 to-cyan-400",
    content: `
      <p>안녕하세요! 오늘은 React와 TypeScript를 활용한 현대적인 웹 개발에 대해 이야기해보려고 합니다.</p>
      
      <h2>React의 강력함</h2>
      <p>React는 현재 가장 인기 있는 프론트엔드 라이브러리 중 하나입니다. 컴포넌트 기반 아키텍처를 통해 재사용 가능한 UI를 쉽게 만들 수 있으며, Virtual DOM을 통해 높은 성능을 보장합니다.</p>
      
      <h3>주요 특징</h3>
      <ul>
        <li><strong>컴포넌트 기반</strong>: 재사용 가능한 UI 구성 요소</li>
        <li><strong>Virtual DOM</strong>: 효율적인 렌더링</li>
        <li><strong>단방향 데이터 흐름</strong>: 예측 가능한 상태 관리</li>
        <li><strong>풍부한 생태계</strong>: 다양한 라이브러리와 도구</li>
      </ul>
      
      <h2>TypeScript와의 조합</h2>
      <p>TypeScript를 React와 함께 사용하면 타입 안정성을 확보할 수 있습니다. 이는 대규모 애플리케이션 개발에서 특히 중요합니다.</p>
      
      <blockquote>
        "TypeScript는 JavaScript에 타입을 추가하여 개발자 경험을 크게 향상시킵니다."
      </blockquote>
      
      <h3>TypeScript의 장점</h3>
      <p>TypeScript를 사용하면 코드 작성 중에 에러를 미리 발견할 수 있고, IDE의 자동완성 기능을 최대한 활용할 수 있습니다. 또한 리팩토링이 훨씬 안전해지며, 코드의 가독성과 유지보수성이 향상됩니다.</p>
      
      <h2>실전 팁</h2>
      <p>React와 TypeScript를 함께 사용할 때는 다음과 같은 점들을 주의해야 합니다:</p>
      <ol>
        <li>Props의 타입을 명확하게 정의하기</li>
        <li>제네릭을 활용한 재사용 가능한 컴포넌트 만들기</li>
        <li>useState와 useRef의 타입 추론 활용하기</li>
        <li>이벤트 핸들러의 타입 정확하게 지정하기</li>
      </ol>
      
      <p>이러한 접근 방식을 통해 더 안정적이고 확장 가능한 웹 애플리케이션을 만들 수 있습니다. 앞으로도 계속해서 React와 TypeScript의 베스트 프랙티스를 공유하겠습니다!</p>
    `,
  },
  {
    id: 2,
    title: "Tailwind CSS로 디자인 시스템 구축하기",
    category: "Frontend",
    date: "2025.11.10",
    excerpt:
      "유틸리티 퍼스트 CSS 프레임워크를 활용한 효율적인 스타일링 방법론...",
    readTime: "7분",
    tags: ["Tailwind", "CSS", "Design System"],
    color: "from-purple-400 to-pink-400",
    content: `
      <p>Tailwind CSS는 유틸리티 퍼스트 접근 방식으로 빠르고 일관된 디자인 시스템을 구축할 수 있게 해줍니다.</p>
      
      <h2>유틸리티 퍼스트란?</h2>
      <p>유틸리티 퍼스트는 미리 정의된 작은 단위의 CSS 클래스를 조합하여 스타일을 만드는 방식입니다. 이를 통해 빠른 개발과 일관성을 동시에 달성할 수 있습니다.</p>
      
      <h3>Tailwind의 장점</h3>
      <ul>
        <li><strong>빠른 개발 속도</strong>: CSS 파일을 왔다갔다 할 필요 없음</li>
        <li><strong>일관된 디자인</strong>: 정해진 디자인 토큰 사용</li>
        <li><strong>작은 번들 크기</strong>: 사용하지 않는 스타일 자동 제거</li>
        <li><strong>반응형 디자인</strong>: 간단한 브레이크포인트 시스템</li>
      </ul>
      
      <blockquote>
        "Tailwind CSS는 디자인 시스템을 코드로 표현하는 가장 효율적인 방법입니다."
      </blockquote>
      
      <p>프로젝트에 Tailwind를 도입하면 개발 생산성이 크게 향상됩니다!</p>
    `,
  },
  {
    id: 3,
    title: "동적 프로그래밍 완벽 가이드",
    category: "Algorithm",
    date: "2025.11.05",
    excerpt: "DP 알고리즘의 핵심 개념과 실전 문제 풀이 전략을 소개합니다...",
    readTime: "10분",
    tags: ["Algorithm", "DP", "Problem Solving"],
    color: "from-green-400 to-emerald-400",
    content: `
      <p>동적 프로그래밍(Dynamic Programming)은 복잡한 문제를 작은 부분 문제로 나누어 해결하는 알고리즘 기법입니다.</p>
      
      <h2>DP의 핵심 개념</h2>
      <p>동적 프로그래밍의 핵심은 <strong>메모이제이션</strong>과 <strong>최적 부분 구조</strong>입니다.</p>
      
      <h3>언제 DP를 사용할까?</h3>
      <ul>
        <li>중복되는 부분 문제가 존재할 때</li>
        <li>최적 부분 구조를 가질 때</li>
        <li>재귀로 풀 수 있지만 비효율적일 때</li>
      </ul>
      
      <h2>DP 문제 해결 단계</h2>
      <ol>
        <li><strong>문제 정의</strong>: dp[i]가 무엇을 의미하는지 정의</li>
        <li><strong>점화식 도출</strong>: 현재 상태와 이전 상태의 관계</li>
        <li><strong>초기값 설정</strong>: 베이스 케이스 설정</li>
        <li><strong>순서 결정</strong>: 어떤 순서로 계산할지 결정</li>
      </ol>
      
      <p>DP는 처음에는 어렵지만, 많은 문제를 풀다 보면 패턴이 보이기 시작합니다!</p>
    `,
  },
  {
    id: 4,
    title: "Next.js 14의 새로운 기능들",
    category: "Tech",
    date: "2025.11.01",
    excerpt:
      "Server Actions와 App Router의 최신 기능을 깊이 있게 탐구합니다...",
    readTime: "8분",
    tags: ["Next.js", "React", "Server Components"],
    color: "from-orange-400 to-red-400",
    content: `
      <p>Next.js 14는 Server Actions, 개선된 App Router 등 혁신적인 기능들을 선보였습니다.</p>
      
      <h2>Server Actions</h2>
      <p>Server Actions를 통해 API 라우트 없이 서버 측 로직을 직접 호출할 수 있게 되었습니다.</p>
      
      <h3>주요 기능</h3>
      <ul>
        <li><strong>Server Actions</strong>: 서버 측 함수를 클라이언트에서 직접 호출</li>
        <li><strong>Partial Prerendering</strong>: 정적/동적 콘텐츠의 효율적인 조합</li>
        <li><strong>향상된 성능</strong>: 더 빠른 빌드와 런타임 성능</li>
      </ul>
      
      <p>Next.js 14는 풀스택 React 개발을 한 단계 더 발전시켰습니다!</p>
    `,
  },
  {
    id: 5,
    title: "반응형 웹 디자인 베스트 프랙티스",
    category: "Frontend",
    date: "2025.10.28",
    excerpt: "모바일부터 데스크톱까지, 모든 디바이스에서 완벽한 UX 제공하기...",
    readTime: "6분",
    tags: ["Responsive", "UX", "CSS"],
    color: "from-yellow-400 to-orange-400",
    content: `
      <p>반응형 웹 디자인은 현대 웹 개발의 필수 요소입니다. 다양한 디바이스에서 최적의 경험을 제공하는 방법을 알아봅시다.</p>
      
      <h2>모바일 퍼스트 접근</h2>
      <p>모바일을 먼저 디자인하고 점진적으로 확장하는 것이 효율적입니다.</p>
      
      <h3>핵심 원칙</h3>
      <ul>
        <li><strong>유연한 그리드</strong>: 고정 픽셀 대신 퍼센트 사용</li>
        <li><strong>유연한 이미지</strong>: 컨테이너에 맞게 조정</li>
        <li><strong>미디어 쿼리</strong>: 브레이크포인트 활용</li>
      </ul>
      
      <p>사용자가 어떤 기기를 사용하든 완벽한 경험을 제공하는 것이 목표입니다!</p>
    `,
  },
  {
    id: 6,
    title: "그래프 알고리즘 마스터하기",
    category: "Algorithm",
    date: "2025.10.25",
    excerpt: "BFS, DFS부터 최단경로 알고리즘까지 완벽 정리...",
    readTime: "12분",
    tags: ["Graph", "Algorithm", "Data Structure"],
    color: "from-indigo-400 to-purple-400",
    content: `
      <p>그래프 알고리즘은 많은 실제 문제를 해결하는 데 필수적입니다. 소셜 네트워크, 지도, 추천 시스템 등 다양한 곳에서 활용됩니다.</p>
      
      <h2>그래프 탐색 알고리즘</h2>
      <p>BFS와 DFS는 그래프 탐색의 기본이 되는 알고리즘입니다.</p>
      
      <h3>BFS (너비 우선 탐색)</h3>
      <ul>
        <li>큐를 사용한 구현</li>
        <li>최단 경로 찾기에 유용</li>
        <li>레벨 순회에 적합</li>
      </ul>
      
      <h3>DFS (깊이 우선 탐색)</h3>
      <ul>
        <li>스택 또는 재귀로 구현</li>
        <li>경로 탐색에 유용</li>
        <li>백트래킹에 적합</li>
      </ul>
      
      <h2>최단 경로 알고리즘</h2>
      <p>다익스트라, 벨만-포드, 플로이드-워셜 등 다양한 최단 경로 알고리즘이 있습니다.</p>
      
      <p>그래프 알고리즘을 마스터하면 복잡한 문제도 쉽게 해결할 수 있습니다!</p>
    `,
  },
];

interface BlogPostProps {
  postId: number | null;
  onBack: () => void;
}

export default function BlogPost({ postId, onBack }: BlogPostProps) {
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12">
        <p className="text-gray-600">포스트를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <motion.button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-700 hover:text-orange-600 transition-colors"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>목록으로 돌아가기</span>
        </motion.button>
      </div>

      {/* Hero section with gradient */}
      <motion.div
        className={`relative h-80 bg-gradient-to-br ${post.color} overflow-hidden mb-12`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        <div className="relative max-w-4xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 rounded-full">
                {post.category}
              </span>
              <span className="text-white/90">{post.readTime}</span>
              <span className="text-white/90">•</span>
              <span className="text-white/90">{post.date}</span>
            </div>
            <h1 className="text-white mb-0 text-4xl md:text-5xl">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.article
        className="max-w-4xl mx-auto px-6 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pb-8 border-b border-gray-200">
          {post.tags.map((tag) => (
            <motion.span
              key={tag}
              className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full hover:bg-orange-100 transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              #{tag}
            </motion.span>
          ))}
        </div>

        {/* Article content with improved typography */}
        <div
          className="prose prose-lg max-w-none
            prose-headings:mt-8 prose-headings:mb-4 prose-headings:text-gray-900
            prose-h2:pb-2 prose-h2:border-b prose-h2:border-gray-200
            prose-h3:text-gray-800
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:my-6 prose-ul:space-y-2
            prose-ol:my-6 prose-ol:space-y-2
            prose-li:text-gray-700 prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-orange-400 
            prose-blockquote:bg-orange-50 prose-blockquote:py-4 prose-blockquote:px-6 
            prose-blockquote:rounded-r-lg prose-blockquote:my-6
            prose-blockquote:text-gray-800 prose-blockquote:italic
            prose-blockquote:not-italic
            [&>p:first-child]:text-xl [&>p:first-child]:text-gray-600 [&>p:first-child]:leading-relaxed
          "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Share and actions */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-gray-600">이 글이 도움이 되셨나요?</p>
            <div className="flex gap-3">
              <motion.button
                className="px-6 py-2 bg-orange-100 text-orange-600 rounded-full hover:bg-orange-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                👍 좋아요
              </motion.button>
              <motion.button
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🔗 공유하기
              </motion.button>
            </div>
          </div>
        </div>

        {/* Back to list */}
        <div className="mt-12 text-center">
          <motion.button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>다른 글 보러가기</span>
          </motion.button>
        </div>
      </motion.article>
    </div>
  );
}
