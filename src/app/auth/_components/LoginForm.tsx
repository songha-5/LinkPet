'use client'

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { LoginFormData, LoginSchma } from "../../_lib/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginAction } from "@/src/actions/auth.login"
import { Kakao } from '@/src/actions/auth.kakao';
import BaseInput from "../../_components/input/BaseInput"
import BaseButton from "../../_components/button/BaseButton"
import { LoaderCircle } from "lucide-react"

export default function LoginForm() {
  const router = useRouter()

  // 유효성 검사 호출
  // register로 타입별 해당하는 유효성 체크
  // handleSubmit으로 해당 타입의 유효성이 맞는지 확인 (submit 눌렀을 시 해당 유효성 작동)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchma),
    mode: "onChange"
  })

  // 유효성 검사 통과 후 실행
  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginAction(data)
      
      if (result.success) {
        router.push("/user")
      } else {
        setError("root", { message: result.message})
      }
    } catch(error) {
      setError("root", { message: "서버와 통신 중 오류가 일어났습니다."})
    }
  }

  return (
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
          title="PASSWORD"
          placeholder="비밀번호를 입력하세요"
          errorMsg={errors.password?.message}
          className='mt-4'
          {...register('password')}
          password
        />

        <p aria-live="assertive" className='text-neonPink mt-2 text-center'>{errors.root?.message}</p>

        <div className="mbs-10">
          <BaseButton type='submit' content={isSubmitting ? ( <><LoaderCircle className="animate-spin w-6 h-6 me-3" /> 로그인 중 (LOGIN...)</> ) : '로그인하기 (LOGIN)'} disabled={isSubmitting}/>
          <BaseButton onClick={Kakao} type='button' content="카카오 로그인 / 회원가입 (KAKAO)" color='yellow' className='mt-4' />
        </div>
      </form>
    </fieldset>
  )
}