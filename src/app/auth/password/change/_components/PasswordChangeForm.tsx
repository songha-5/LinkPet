'use client'

import { passwordChange } from "@/src/actions/auth.passwordChange"
import BaseButton from "@/src/app/_components/button/BaseButton"
import BaseInput from "@/src/app/_components/input/BaseInput"
import { PasswordChangeFormData, PasswordChangeSchma } from "@/src/app/_lib/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"

export default function PasswordChangeForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<PasswordChangeFormData>({
    resolver: zodResolver(PasswordChangeSchma),
    mode: "onChange"
  })
    
  // 유효성 검사 통과 후 실행
  const onSubmit = async (data: PasswordChangeFormData) => {
    try {
      const result = await passwordChange(data)
      if (result.success) {
        router.push("/auth/password/change/result")
      } else {
        setError("root", { message: result.message })
      }
    } catch(error) {
      console.log("비밀번호 변경에 실패했습니다!", error)
      // 404페이지나 에러팝업띄워야함
      setError("root", { message: "서버와 통신 중 오류가 일어났습니다."})
    }
  }

  return (
   <fieldset className="mbs-5">
      <legend className="sr-only">비밀번호 변경 form</legend>

      {/* input */}
      <form onSubmit={handleSubmit(onSubmit)}>
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
        
        <p aria-live="assertive" className='text-neonPink mt-2 text-center'>{errors.root?.message}</p>

        <div className="mbs-10">
          <BaseButton type='submit' content="비밀번호 변경 (PASSWORD_CHANGE)" color="green" />
        </div>
      </form>
    </fieldset>
  )
}