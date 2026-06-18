import TiptapEditor from "@/src/app/_components/editor/Tiptap";
import BaseInput from "@/src/app/_components/input/BaseInput";
import Link from "next/link";

export default function EditPage() {
  return (
    <>
      <h1 className="sr-only">게시글 등록</h1>
      <div className="border-5 p-7 bg-bg border-neonPink shadow-[6px_6px_0_var(--color-neonPink)]">
        <h2 className="text-neonPink text-2xl">📝 EDIT_LOG_NODE // 게시글 버퍼 등록</h2>

        <BaseInput title="QUEST_TITLE // 질문 제목" placeholder="질문 제목을 입력해주세요." className="[&_strong]:text-sm mbs-6 [&_input]:border-4"/>
        <BaseInput title="TARGET_PET // 대상 반려동물" content="초코 (말티즈 / 3세)" placeholder="질문 제목을 입력해주세요." className="[&_strong]:text-sm mbs-4 [&_input]:border-4" disabled />

        <div className="mbs-4">
          <strong className="block text-sm text-neonGreen mbe-1" >LOG_CONTENT // 상세 내용 본문</strong>
          <div className="border-4 border-font-white p-4 shadow-[4px_4px_0_var(--color-font-white-shadow)]">
            <TiptapEditor />
          </div>
        </div>        

        <div className="flex gap-3 justify-end mbs-4">
          <Link href={'/'} className="border-3 border-font-white text-font-wborder-font-white py-1 px-6 cursor-pointer hover:bg-font-white hover:text-bg transition-all inline-block">취소 (CANCEL)</Link>
          <button type="button" className="border-3 border-neonGreen text-neonborder-neonGreen py-1 px-6 cursor-pointer hover:bg-neonGreen hover:text-bg transition-all inline-block text-neonGreen">등록 (APPLY_PATCH)</button>
        </div>
      </div>
    </>
  )
}