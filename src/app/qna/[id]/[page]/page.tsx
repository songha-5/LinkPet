
import Question from "./_components/Question";
import AdminAnswer from "./_components/AdminAnswer";
import { createClient } from "@/src/utils/supabase/server";
import QnAButton from "./_components/QnAButton";
import { getUser } from "@/src/app/_lib/getUser";

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

  const user = await getUser()
  const { data: roleData } = await supabase
    .from('users')
    .select('role, username')
    .eq('id', user.id)
    .single()

  if (!roleData) {
    console.log("유저 정보를 불러오지 못했습니다.")
    return  
  }

  // 펫 기본 정보 호출 
  const { data: petData, error: petError } = await supabase
  .from('pet')
  .select('id, name, age, gender, weight, type')
  .eq('user_id', user.id)

  if (!petData || petData.length === 0) {
    console.log("펫 데이터를 불러오지 못하였습니다.", petError)
    // 404에러나 해당 영역 에러케이스 추가
    return
  }

  // 펫 상세 정보 호출
  const { data: statusData, error: statusError } = await supabase
  .from('pet_status')
  .select('symptoms, ai_analysis, point')
  .eq('pet_id', petData[0].id)
  .single()

  if (!statusData || statusError) {
    console.log("펫 상태 정보를 불러오지 못했습니다.", statusError)
    //404에로나 해당 영역 에러케이스 추가
    return
  }

  return (
    <>
      <h1 className="sr-only">나의 반려동물 Q&A 질문 / 답</h1>
      {/* 돌아가기 / 수정 / 삭제 버튼 */}
      <QnAButton id={paramsId} page={paramsPage} role={roleData.role} />
      {/* 질문리스트 */}
      <Question id={paramsId} page={paramsPage} user={user} petData={petData[0]} statusData={statusData} />
      {/* 답변 */}
      <AdminAnswer role={roleData.role} username={roleData.username} />
    </>
  )
}
