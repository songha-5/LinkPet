
import Question from "./_components/Question";
import AdminAnswer from "./_components/AdminAnswer";
import { createClient } from "@/src/utils/supabase/server";
import QnAButton from "./_components/QnAButton";

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
      <QnAButton id={paramsId} page={paramsPage} />
      {/* 질문리스트 */}
      <Question id={paramsId} page={paramsPage} />
      {/* 답변 */}
      <AdminAnswer />
    </>
  )
}
