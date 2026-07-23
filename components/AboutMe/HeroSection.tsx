import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-20">
      <div className="relative w-24 h-24 shrink-0 rounded-full overflow-hidden shadow-lg ring-2 ring-orange-200">
        <Image
          src="/images/profile3.webp"
          alt="최준서 프로필"
          fill
          sizes="96px"
          className="object-cover"
        />
      </div>
      <div>
        <h2 className="mb-2 break-keep">
          최준서{" "}
          <span className="bg-linear-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            — 긍정을 전파하는 개발자
          </span>
        </h2>
        <p className="text-gray-700 leading-relaxed break-keep max-w-2xl">
          다양한 분야의 팀원들과 함께 만드는 과정을 좋아합니다. 프로젝트의
          분위기를 끌어올리는 역할을 맡아 왔고, 지금은 SW마에스트로 17기에서
          팀 프로젝트를 준비하고 있습니다.
        </p>
      </div>
    </div>
  );
}
