import { useForm } from "react-hook-form";
import BaseButton from "../button/BaseButton";
import BaseInput from "../input/BaseInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordUserChangeFormData, PasswordUserChangeSchma } from "../../_lib/auth";
import { useModalStore } from "@/src/store/useModalStore";
import SimpleModal from "./SimpleModal";
import { useRouter } from "next/navigation";
import { passwordUserChange } from "@/src/actions/auth.passwordUserChange";
import { LoaderCircle } from "lucide-react";

interface PassworModalProps {
}

export default function PasswordModal({ }: PassworModalProps) {
  const router = useRouter()
  const openModal = useModalStore((state) => state.openModal)

  const { 
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(PasswordUserChangeSchma),
    mode: "onChange"
  })

  const onSubmit = async (data: PasswordUserChangeFormData) => {
    try {
      const result = await passwordUserChange(data)
      if (result.success) {
        openModal(
          <SimpleModal
            title="성공하였습니다!"
            content="비밀번호 변경에 성공하였습니다!"
            color="green"
            buttonText="확인 (CONFIRM)"
          />
        )
        router.refresh()
      } else {
        setError("root", { message: result.message })
      }
    } catch (error) {
      console.log("비밀번호 변경에 실패하였습니다!", error)
      setError("root", { message: "서버와 통신 중 오류가 일어났습니다."})
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseInput
        title="PREVIOUS PASSWORD"
        placeholder="현재 비밀번호를 입력해주세요."
        password
        {...register("userPassword")}
        className="w-100"
        errorMsg={errors.userPassword?.message}
      />
      <BaseInput
        title="NEW PASSWORD"
        placeholder="새 비밀번호를 입력해주세요."
        password
        className="mt-10 w-100"
        {...register("password")}
        errorMsg={errors.password?.message}
      />
      <BaseInput
        title="CONFIRM PASSWORD"
        placeholder="새 비밀번호를 재입력해주세요."
        password
        className="mt-4 w-100"
        {...register("confirmPassword")}
        errorMsg={errors.confirmPassword?.message}
      />
      <p aria-live="assertive" className='text-neonPink mt-2 text-center'>{errors.root?.message}</p>
      <BaseButton type="submit" content={isSubmitting ? (<><LoaderCircle className="animate-spin w-5 h-5 me-3" />비밀번호 수정 중 (UPDATE...)</>) : `비밀번호 수정 (UPDATE)`} outline className="text-[18px] h-14! mt-10" disabled={isSubmitting}/>
    </form>
  )
}