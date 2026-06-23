
import Link from "next/link";
import Question from "./_components/Question";
import AdminAnswer from "./_components/AdminAnswer";
import { createClient } from "@/src/utils/supabase/server";

interface QnAPageProps {
  params: Promise<{ id: string;  page: string}>
}

export default async function QnAPage({ params }: QnAPageProps) {
  const paramsProps = await params
  const paramsId = paramsProps.id
  const paramsPage = paramsProps.page

  const supabase = await createClient()
  const { error: postError } = await supabase
    .from('posts')
    .select('is_answered, admin_id')
    .eq('user_id', paramsId)
    .eq('id', paramsPage)
    .single()
  if (postError) {
    console.log("데이터를 불러오지 못했습니다.")
    // 404 및 다른 UI페이지
    return
  }

  return (
    <>
      <h1 className="sr-only">나의 반려동물 Q&A 질문 / 답</h1>

      {/* 돌아가기 / 수정 / 삭제 버튼 */}
      <div className="flex justify-between items-end">
        <Link href={'/user'} className="inline-block cursor-pointer transition-all hover:border-neonPink hover:text-neonPink border-5 border-font-white py-2 px-4" aria-label="컨트롤 룸으로 돌아가기">◀ 컨트롤 룸 복귀 (BACK)</Link>

        <div className="flex gap-3">
          <Link href={'/'} className="border-3 border-neonYellow text-neonYellow py-1 px-6 cursor-pointer hover:bg-neonYellow hover:text-bg transition-all inline-block">수정</Link>
          <button type="button" className="border-3 border-neonPink text-neonPink py-1 px-6 cursor-pointer hover:bg-neonPink hover:text-bg transition-all inline-block">삭제</button>
        </div>
      </div>

      {/* 질문리스트 */}
      <Question id={paramsId} page={paramsPage} />

      {/* 답변 */}
      <AdminAnswer />
    </>
  )
}
