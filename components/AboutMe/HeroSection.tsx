import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
      <div>
        <div>
          <h2 className="mb-6">
            <span className="block">성실함과 </span>
            <span className="text-red-500">열정</span>
            <span>을 바탕으로</span>
            <span className="block">성장하는 </span>
            <span className="text-yellow-500">긍정</span>
            <span> 개발자</span>
            <span className="block">최준서입니다! 👋</span>
          </h2>
        </div>

        <p className="text-gray-700 leading-relaxed mb-8">
          항상 프로젝트에서 다양한 분야의 팀원들과 협력하고 재밌게 함께 만들어
          나가는 걸 기대하고 있습니다! 저는 긍정적인 사람으로 팀프로젝트에서도
          제 긍정적인 분위기를 팀원들에게 전달하는 역할을 수행할 수 있을
          것이라고 생각합니다!
        </p>

        <div className="flex flex-wrap gap-3">
          <div className="px-4 py-2 bg-linear-to-r from-orange-100 to-red-100 rounded-full">
            <span className="mr-2">🎯</span>
            <span className="text-gray-800">팀워크</span>
          </div>
          <div className="px-4 py-2 bg-linear-to-r from-yellow-100 to-orange-100 rounded-full">
            <span className="mr-2">💡</span>
            <span className="text-gray-800">문제 해결</span>
          </div>
          <div className="px-4 py-2 bg-linear-to-r from-green-100 to-emerald-100 rounded-full">
            <span className="mr-2">🚀</span>
            <span className="text-gray-800">빠른 학습</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/images/profile1.svg"
            alt="Profile"
            width={400}
            height={400}
            className="w-full h-auto"
          />
        </div>
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-linear-to-br from-orange-300 to-red-300 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-linear-to-br from-yellow-300 to-orange-300 rounded-full blur-3xl opacity-30 -z-10" />
      </div>
    </div>
  );
}
