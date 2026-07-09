'use client'

import { useRouter } from "next/navigation";
import BaseButton from "./_components/button/BaseButton";
import FloatLayout from "./_components/FloatLayout";

export default function NotFound() {
  const router = useRouter()

  return (
    <FloatLayout>
      <h1 className="sr-only">에러페이지입니다. 유효한 링크가 아니거나, 에러가 발생하였습니다.</h1>

      {/* 타이틀 */}
      <div className="text-center">
        <span className="animate-slowBounce text-6xl text-neonPink text-shadow-[4px_4px_0_var(--color-neonPink-opacity)] mbe-4 block">[ X_X ]</span>
        <h1 className="text-4xl text-shadow-[3px_3px_0_var(--color-neonPink)] tracking-wide">SYSTEM ERROR</h1>
      </div>

      {/* 본문 */}
      <p className="text-center mbs-4 text-lg">앗! 치명적인 <span className="text-neonYellow">에러가 발생했습니다.</span><br />요청하신 페이지를 찾을 수 없거나<br />오류로 인해 로딩에 실패했습니다.</p>

      {/* 버튼 */}
      <div className="flex flex-col gap-3 mbs-10 border-t-3 border-dashed border-font-caption text-center">
        <BaseButton className="text-lg h-14!" color="pink" content="전페이지로 돌아가기" outline onClick={() => router.back()} />
        <BaseButton className="text-lg h-14!" color="white" content="페이지 새로고침" outline onClick={() => router.refresh()} />
        <BaseButton className="text-lg h-14!" color="yellow" content="홈으로 돌아가기" outline link href="/" />
      </div>
    </FloatLayout>
  )
}