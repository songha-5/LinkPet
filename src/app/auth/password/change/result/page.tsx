import BaseButton from "@/src/app/_components/button/BaseButton";
import FloatLayout from "@/src/app/_components/FloatLayout";

export default function PasswordChangeResultPage() {
  return (
    <FloatLayout color="green">
      {/* 타이틀 */}
      <div className="text-center">
        <span className="animate-slowBounce text-5xl text-neonGreen text-shadow-[4px_4px_0_var(--color-neonGreen-opacity)] mbe-4 block">[ 🔒•ﻌ• ]</span>
        <h1 className="text-4xl text-shadow-[3px_3px_0_var(--color-neonGreen)] tracking-wide">UPDATE SUCCESS!</h1>
      </div>

      <div className="border-3 border-dashed border-font-caption p-10 text-md text-font-subText mbs-8">
        <p className="text-[18px]">
          비밀번호가 안전하게 변경되었습니다!<br />
          이제 당신의 반려동물은 <strong className="text-neonGreen">강력한 픽셀 방어막</strong><br />
          안에서 꿀잠을 잘 수 있게 되었습니다.<br />
          <br />
          새로운 비밀번호로 다시 로그인해 주세요.
        </p>
      </div>

      <BaseButton className="mt-9" color="pink" content="메인으로 돌아가기 (MAIN)" link href="/"/>
    </FloatLayout>
  )
}