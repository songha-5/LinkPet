'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PasswordChangeFormData, PasswordChangeSchma } from "@/src/app/_lib/input";
import { useRouter } from "next/navigation";
import BaseButton from "@/src/app/_components/button/BaseButton";
import FloatLayout from "@/src/app/_components/FloatLayout";
import BaseInput from "@/src/app/_components/input/BaseInput";

export default function PasswordChangePage() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PasswordChangeFormData>({
    resolver: zodResolver(PasswordChangeSchma),
    mode: "onChange"
  })
    
  // 유효성 검사 통과 후 실행
  const onSubmit = (data: PasswordChangeFormData) => {
    console.log('유효성 검사 패스! 데이터 보내기', data)
    router.push("/auth/password/change/result")
  }
  

  return (
    <FloatLayout color="pink">
      {/* 타이틀 */}
      <div className="text-center">
        <span className="animate-slowBounce text-5xl text-neonGreen text-shadow-[4px_4px_0_var(--color-neonGreen-opacity)] mbe-4 block">[ 🔒•ﻌ• ]</span>
        <h1 className="text-4xl text-shadow-[3px_3px_0_var(--color-neonGreen)] tracking-wide">PASSWORD_CHANGE</h1>
      </div>

      {/* 폼 */}
      <fieldset className="mbs-5">
        <legend className="sr-only">비밀번호 변경 form</legend>

        {/* input */}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <BaseInput
            title="PASSWORD"
            placeholder="비밀번호를 입력하세요"
            errorMsg={errors.password?.message}
            {...register('password')}
            password
          />
          <BaseInput
            title="CONFIRM PASSWORD"
            placeholder="비밀번호를 재입력하세요"
            errorMsg={errors.confirmPassword?.message}
            {...register('confirmPassword')}
            password
            className="mt-4"
          />

          <div className="mbs-10">
            <BaseButton type='submit' content="비밀번호 변경 (PASSWORD_CHANGE)" color="green" />
          </div>
        </form>
      </fieldset>
    </FloatLayout>
  )
}