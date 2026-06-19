"use client"

import { qnaCreateAction } from "@/src/actions/qna.create";
import BaseInput from "@/src/app/_components/input/BaseInput";
import { TiptapInput } from "@/src/app/_components/input/TiptabInput";
import SimpleModal from "@/src/app/_components/modal/SimpleModal";
import { QnACreateFormData, QnACreateSchema } from "@/src/app/_lib/qna";
import { useModalStore } from "@/src/store/useModalStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, LoaderCircleIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function EditPage() {
  const router = useRouter()
  const openModal = useModalStore((state) => state.openModal)

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(QnACreateSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: ""
    }
  })

  const onSubmit = async (data: QnACreateFormData) => {
    const result = await qnaCreateAction(data)

    try {
      if (result.success) {
        openModal(
          <SimpleModal
            title="등록 완료!"
            content="글 등록을 완료했습니다."
            color="green"
            buttonText="확인"
          />
        )
        router.push('/user')
      } else {
        setError("root", { message: result.message })
      }
    } catch (error) {
      console.log("에러가 발생했습니다", error)
    }
  }

  return (
    <>
      <h1 className="sr-only">게시글 등록</h1>
      <div className="border-5 p-7 bg-bg border-neonPink shadow-[6px_6px_0_var(--color-neonPink)]">
        <h2 className="text-neonPink text-2xl">📝 EDIT_LOG_NODE // 게시글 버퍼 등록</h2>

        <fieldset>
          <legend className="sr-only">질문글 등록 폼</legend>

          <form onSubmit={handleSubmit(onSubmit)}>
            <BaseInput
              title="QUEST_TITLE // 질문 제목"
              placeholder="질문 제목을 입력해주세요."
              className="[&_strong]:text-sm mbs-6 [&_input]:border-4"
              {...register("title")}
              errorMsg={errors.title?.message}
            />
            <BaseInput
              title="TARGET_PET // 대상 반려동물"
              content="초코 (말티즈 / 3세)"
              placeholder="질문 제목을 입력해주세요."
              className="[&_strong]:text-sm mbs-4 [&_input]:border-4"
              disabled
            />

            <div className="mbs-4">
              <strong className="block text-sm text-neonGreen mbe-1" >LOG_CONTENT // 상세 내용 본문</strong>
              <div className="border-4 border-font-white p-4 shadow-[4px_4px_0_var(--color-font-white-shadow)]">
                <TiptapInput control={control} name="content" />
              </div>
            </div>

            <p aria-live="assertive" className='text-neonPink mt-2 text-center'>{errors.root?.message}</p>

            <div className="flex gap-3 justify-end mbs-4">
              <Link href={'/'} className="border-3 border-font-white text-font-wborder-font-white py-1 px-6 cursor-pointer hover:bg-font-white hover:text-bg transition-all inline-block">취소 (CANCEL)</Link>
              <button type="submit" disabled={isSubmitting} className="border-3 border-neonGreen text-neonborder-neonGreen py-1 px-6 cursor-pointer hover:bg-neonGreen hover:text-bg transition-all inline-block text-neonGreen disabled:border-gray-default disabled:text-gray-default disabled:cursor-not-allowed disabled:hover:bg-bg">
                {isSubmitting ? <span className="flex items-center justify-center gap-2"><LoaderCircleIcon className="animate-spin w-4 h-4" /> 로딩중</span> : "등록 (APPLY_PATCH)"}
              </button>
            </div>
          </form>
        </fieldset>
      </div>
    </>
  )
}