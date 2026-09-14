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
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed break-keep max-w-2xl">
          사용자가 화면과 주고받는 상호작용에서 즐거움을 느껴 프론트엔드를
          선택했습니다. 지금은 SW마에스트로 17기에서 소셜 루틴 앱 루게더를
          iOS·Android·웹으로 출시해 운영하고 있습니다.
        </p>
      </div>
    </div>
  );
}
