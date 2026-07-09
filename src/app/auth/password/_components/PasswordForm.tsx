'use client'

import { passwordEmailAction } from "@/src/actions/auth.passwordEmail"
import BaseButton from "@/src/app/_components/button/BaseButton"
import BaseInput from "@/src/app/_components/input/BaseInput"
import { PasswordEmailFormData, PasswordEmailSchma } from "@/src/app/_lib/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { notFound, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function PasswordForm() {
  const router = useRouter()  

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<PasswordEmailFormData>({
    resolver: zodResolver(PasswordEmailSchma),
    mode: "onChange"
  })
  
  // 유효성 검사 통과 후 실행
  const onSubmit = async (data: PasswordEmailFormData) => {
    try {
      const result = await passwordEmailAction(data)
      if (result.success) {
        router.push("/auth/password/result")
      } else {
        setError("root", { message: result.message})
        alert(`error: ${result.message}`)
      }
    } catch(error) {
      console.log("오류가 일어났습니다.", error)
      setError("root", { message: "서버와 통신 중 오류가 일어났습니다."})
      notFound()
    }
  }

  return (
    <fieldset className="mbs-5">
      <legend className="sr-only">비밀번호 변경 form</legend>

      <div className="mbe-8 border-3 border-dashed border-font-caption text-center p-10 text-md text-font-subText">
        <p>[SYSTEM] 비밀번호를 분실하셨나요?<br />가입 시 등록한 <strong className="text-neonYellow">이메일</strong>을 입력하시면<br />인증번호를 전송해 드립니다.</p>
      </div>
      
      {/* input */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <BaseInput
          title="USER ID / EMAIL_ADDRESS"
          placeholder="이메일을 입력하세요"
          errorMsg={errors.email?.message}
          {...register('email')}
        />

        <p aria-live="assertive" className='text-neonPink mt-2 text-center'>{errors.root?.message}</p>
        
        <div className="mbs-10">
          <BaseButton type='submit' content={isSubmitting ? ( <><LoaderCircle className="animate-spin w-6 h-6 me-3" /> 인증 메일 전송 중 (SAND_CODE...)</>) : (`인증 메일 전송 (SAND_CODE)`)} color="green" disabled={isSubmitting}/>
        </div>
      </form>
    </fieldset>
  )
}