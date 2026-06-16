import { useForm } from "react-hook-form";
import BaseButton from "../button/BaseButton";
import BaseInput from "../input/BaseInput";
import { NameChangeFormData, NameChangeSchma } from "../../_lib/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { nameChange } from "@/src/actions/auth.name";
import { useModalStore } from "@/src/store/useModalStore";
import SimpleModal from "./SimpleModal";
import { useRouter } from "next/navigation"

export default function NameChangeModal() {
  const router = useRouter()
  const openModal = useModalStore((state) => state.openModal)
  
  const {
    register, 
    handleSubmit, 
    setError, 
    formState: { errors }
  } = useForm<NameChangeFormData>({
    resolver: zodResolver(NameChangeSchma),
    mode: "onChange"
  })

  const onSubmit = async (data: NameChangeFormData) => {
    try {
      const result = await nameChange(data)
      if (result.success) {
        openModal(
          <SimpleModal
            title="성공했습니다!"
            content="닉네임 변경에 성공하였습니다!"
            color="green"
            buttonText="확인 (CONFIRM)"
          />
        )
        router.refresh()
      } else {
        setError("root", { message: result.message })
      }
    } catch (error) {
      console.log("닉네임 변경에 실패하였습니다!", error)
      setError("root", { message: "서버와 통신 중 오류가 일어났습니다."})
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <BaseInput
        title="NEW USER NAME"
        placeholder="새로운 닉네임을 입력하세요."
        {...register('name')}
        errorMsg={errors.name?.message}
      />
      <p aria-live="assertive" className='text-neonPink mt-2 text-center'>{errors.root?.message}</p>
      <BaseButton type="submit" content="변경 적용 (APPLY)" outline className="text-[18px] h-14! mt-10"/>
    </form>
  )
}