'use client'

import FloatLayout from "@/src/app/_components/FloatLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PasswordFormData, PasswordSchma } from "@/src/app/_lib/auth";
import BaseInput from "@/src/app/_components/input/BaseInput";
import BaseButton from "@/src/app/_components/button/BaseButton";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PasswordPage() {
  const router = useRouter()  

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordFormData>({
    resolver: zodResolver(PasswordSchma),
    mode: "onChange"
  })
  
  // 유효성 검사 통과 후 실행
  const onSubmit = (data: PasswordFormData) => {
    console.log('유효성 검사 패스! 데이터 보내기', data)
    router.push("/auth/password/result")
  }
  
  return (
    <FloatLayout color='pink'>
      {/* 타이틀 */}
      <div className="text-center">
        <span className="animate-slowBounce text-5xl text-neonYellow text-shadow-[4px_4px_0_var(--color-neonYellow-opacity)] mbe-4 block">[ 🔑•ﻌ• ]</span>
        <h1 className="text-4xl text-shadow-[3px_3px_0_var(--color-neonPink)] tracking-wide">PASSWORD_CHANGE</h1>
      </div>

      {/* 폼 */}
      <fieldset className="mbs-5">
        <legend className="sr-only">비밀번호 변경 form</legend>

        <div className="mbe-8 border-3 border-dashed border-font-caption text-center p-10 text-md text-font-subText">
          <p>[SYSTEM] 비밀번호를 분실하셨나요?<br />가입 시 등록한 <strong className="text-neonYellow">이메일</strong>을 입력하시면<br />인증번호를 전송해 드립니다.</p>
        </div>
        
        {/* input */}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <BaseInput
            title="USER ID / EMAIL_ADDRESS"
            placeholder="이메일을 입력하세요"
            errorMsg={errors.email?.message}
            {...register('email')}
          />

          <div className="mbs-10">
            <BaseButton type='submit' content="인증 메일 전송 (SAND_CODE)" color="green" />
          </div>
        </form>
      </fieldset>

      <div className="mbs-12 border-t-3 border-dashed border-font-caption text-center">
        <Link href="/" className="relative transition-all after:absolute hover:after:border after:bottom-0 after:left-1/2 before:h-0.5 after:w-0 after:bg-neonPink after:duration-300 after:-translate-x-1/2 hover:after:w-full inline-flex text-font-subText text-lg hover:text-neonPink focus-visible:outline-neonPink mbs-6">로그인으로 돌아가기</Link>
        <Link href="/auth/join" className="relative transition-all after:absolute hover:after:border after:bottom-0 after:left-1/2 before:h-0.5 after:w-0 after:bg-neonPink after:duration-300 after:-translate-x-1/2 hover:after:w-full inline-flex text-font-subText text-lg hover:text-neonPink focus-visible:outline-neonPink ms-4">회원가입 (JOIN)</Link>
      </div>
    </FloatLayout>
  )
}