import Link from "next/link";
import FloatLayout from "@/src/app/_components/FloatLayout";
import PasswordForm from "./_components/PasswordForm";

export default function PasswordPage() {
  
  return (
    <FloatLayout color='pink'>
      <h1 className="sr-only">비밀번호 변경 - 이메일 입력</h1>
      
      {/* 타이틀 */}
      <div className="text-center">
        <span className="animate-slowBounce text-5xl text-neonYellow text-shadow-[4px_4px_0_var(--color-neonYellow-opacity)] mbe-4 block">[ 🔑•ﻌ• ]</span>
        <h1 className="text-4xl text-shadow-[3px_3px_0_var(--color-neonPink)] tracking-wide">PASSWORD_CHANGE</h1>
      </div>

      {/* 폼 */}
      <PasswordForm />

      <div className="mbs-12 border-t-3 border-dashed border-font-caption text-center">
        <Link href="/" className="relative transition-all after:absolute hover:after:border after:bottom-0 after:left-1/2 before:h-0.5 after:w-0 after:bg-neonPink after:duration-300 after:-translate-x-1/2 hover:after:w-full inline-flex text-font-subText text-lg hover:text-neonPink focus-visible:outline-neonPink mbs-6">로그인으로 돌아가기</Link>
        <Link href="/auth/join" className="relative transition-all after:absolute hover:after:border after:bottom-0 after:left-1/2 before:h-0.5 after:w-0 after:bg-neonPink after:duration-300 after:-translate-x-1/2 hover:after:w-full inline-flex text-font-subText text-lg hover:text-neonPink focus-visible:outline-neonPink ms-4">회원가입 (JOIN)</Link>
      </div>
    </FloatLayout>
  )
}