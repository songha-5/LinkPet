'use client'

import FloatLayout from "@/src/app/_components/FloatLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignupFormData, SignupSchma } from "@/src/app/_lib/auth";
import BaseInput from "@/src/app/_components/input/BaseInput";
import BaseButton from "@/src/app/_components/button/BaseButton";
import { useRouter } from "next/navigation";
import { joinAction } from "@/src/actions/auth.join";

export default function JoinPage() {
  const router = useRouter()  

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchma),
    mode: "onChange"
  })
  
  // 유효성 검사 통과 후 실행
  const onSubmit = async (data: SignupFormData) => {
    try {
      const result = await joinAction(data)
      
      if (result.success) {
        router.push("/auth/join/result")
      } else {
        setError("root", { message: result.message })
      }

    } catch(error) {
      // 네트워크 단절 등 예상치 못한 오류 처리
      console.error('통신 오류 발생:', error)
      alert('서버와 통신 중 오버플로우가 발생했습니다.')
    }
  }
  
  return (
    <FloatLayout color='pink'>
      {/* 타이틀 */}
      <div className="text-center">
        <span className="animate-slowBounce text-5xl text-neonGreen text-shadow-[4px_4px_0_var(--color-neonGreen-opacity)] mbe-4 block">[ ^•ﻌ•^ ]</span>
        <h1 className="text-4xl text-shadow-[3px_3px_0_var(--color-neonPink)] tracking-wide">JOIN US</h1>
      </div>

      {/* 폼 */}
      <fieldset className="mbs-14">
        <legend className="sr-only">로그인 form</legend>

        {/* input */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <BaseInput
            title="USER ID"
            placeholder="아이디를 입력하세요"
            errorMsg={errors.email?.message}
            {...register('email')}
          />
          <BaseInput
            title="NICKNAME"
            placeholder="별명을 입력하세요"
            className="mt-4"
            errorMsg={errors.name?.message}
            {...register('name')}
          />
          <BaseInput 
            title="PASSWORD"
            placeholder="비밀번호를 입력하세요"
            errorMsg={errors.password?.message}
            className='mt-4'
            {...register('password')}
            password
          />
          <BaseInput 
            title="CONFIRM PASSWORD"
            placeholder="비밀번호를 재입력하세요"
            errorMsg={errors.confirmPassword?.message}
            className='mt-4'
            {...register('confirmPassword')}
            password
          />
          
          <p className='text-neonPink mt-2 text-center'>{errors.root?.message}</p>

          <div className="mbs-10">
            <BaseButton type='submit' content="가입 완료하기 (JOIN)" color="pink" outline />
          </div>
        </form>
      </fieldset>
    </FloatLayout>
  )
}