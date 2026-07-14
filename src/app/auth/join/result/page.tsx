import BaseButton from "@/src/app/_components/button/BaseButton";
import FloatLayout from "@/src/app/_components/FloatLayout";

export default function JoinResultPage() {
  return (
    <FloatLayout color="green">
      {/* 타이틀 */}
      <div className="text-center">
        <span className="animate-slowBounce text-5xl text-neonYellow text-shadow-[4px_4px_0_var(--color-neonYellow-opacity)] mbe-4 block">[ ✧•ﻌ•✧ ]</span>
        <h1 className="text-4xl text-shadow-[3px_3px_0_var(--color-neonGreen)] tracking-wide">NEW WORLD UNLOCKED!</h1>
      </div>

      <div className="mbs-4 border-t-3 border-dashed border-font-caption text-center" />

      {/* 안내 문구 */}
      <p className="text-[20px] text-center mt-6">삐빅- 통신 완료.<br /><strong className="text-neonPink">링크펫 행성</strong>에 오신 것을 환영합니다!</p>
      <p className="text-[20px] text-center mt-8">당신을 애타게 기다리던 반려동물이<br />방금 꼬리를 흔들기 시작했어요.<br />이제 링크펫 행성 산책을 시작해 볼까요?</p>

      <BaseButton className="mt-14" color="pink" content="펫링크로 여행떠나기 (START)" link href="/user"/>
    </FloatLayout>
  )
}