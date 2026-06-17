import FloatLayout from "@/src/app/_components/FloatLayout";
import PasswordChangeForm from "./_components/PasswordChangeForm";

export default function PasswordChangePage() {
  return (
    <FloatLayout color="pink">
      <h1 className="sr-only">비밀번호 변경 입력</h1>
      
      {/* 타이틀 */}
      <div className="text-center">
        <span className="animate-slowBounce text-5xl text-neonGreen text-shadow-[4px_4px_0_var(--color-neonGreen-opacity)] mbe-4 block">[ 🔒•ﻌ• ]</span>
        <h1 className="text-4xl text-shadow-[3px_3px_0_var(--color-neonGreen)] tracking-wide">PASSWORD_CHANGE</h1>
      </div>

      {/* 폼 */}
      <PasswordChangeForm />
    </FloatLayout>
  )
}