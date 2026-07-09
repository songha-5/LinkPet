import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";
import QnACard from "../_components/QnACard";
import UserModal from "./_components/UserModal";
import UserStateModal from "./_components/UserStateModal";
import Avata from "./_components/ProfileImage";
import { createClient } from "@/src/utils/supabase/server";
import Link from "next/link";
import { getUser } from "../_lib/getUser";
import PetInfo from "./_components/PetInfo";
import ErrorBoundaryWaper from "../_components/error/ErrorBoundaryWapper";

export default async function UserPage() {

  // 유저 데이터 호출
  const supabase = await createClient()
  const user = await getUser()

  // 프로필사진 데이터 호출
  const { data: userData } = await supabase
    .from('users')
    .select('profile_image, username, role, pet(id)')
    .eq('id', user.id)
    .single()

  const hasPet = userData?.pet && userData.pet.length > 0
  
  const profileImage = userData?.profile_image || '/bg_2.svg'
  const isAdmin = userData?.role === "ADMIN"
  // QnA 리스트 호출
  // USER QnA 리스트
  const { data: qnaData, error: qnaError } = isAdmin ? 
   await supabase.from('posts').select('id, title, is_answered, created_at, user_id') :
   await supabase.from('posts').select('id, title, is_answered, created_at, user_id').eq('user_id', user.id)
  
  // 에러케이스
  if (qnaError) {
    console.log('QnA리스트를 불러오는 중 에러가 발생했습니다.')
    throw new Error("QnA리스트를 불러오는중 에러가 발생하였습니다.")
  }
  
  // 정렬기능 추가 (최신순, 답변순)
  const qnaSort = [...qnaData].sort((a, b) => {
    const answeredA = Number(a.is_answered)
    const answeredB = Number(b.is_answered)
    if (answeredA !== answeredB) {
      return answeredA - answeredB
    }

    const timeA = new Date(a.created_at).getTime()
    const timeB = new Date(b.created_at).getTime()
    return timeB - timeA
  })

  return (
    <>
      <Header />
      <h1 className="sr-only">나의 반려동물 건강 정보 및 Q&A</h1>

      <main className="relative pbs-25 px-6 mbe-10 max-w-7xl m-auto">
        {/* 반려동물 정보 */}
        <section className="transition-all border-7 bg-bg border-neonPink shadow-[10px_10px_0_var(--color-neonPink)] p-8.5 lg:flex lg:flex-row">

          {/* 반려동물 이름/종/나이/아픈정도/검사페이지 이동 */}
          {hasPet ? ( 
              <ErrorBoundaryWaper>
                <PetInfo />
              </ErrorBoundaryWaper>
            ) : (
              <div>
                <h2 className="text-2xl text-neonPink">🐾 PET_CORE_DATA // 나의 펫 검사하기</h2>
                <Link href={'/checkup'} className="cursor-pointer hover:bg-bg-gray-800 transition-all block text-center p-20 border-4 border-gray-default border-dashed mbs-2 text-4xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">펫_검사하기</Link>
              </div>
            )
          }
        </section>

        {/* 유저정보 및 QnA */}
        <section className="mbs-10 bg-bg lg:flex gap-6">
          {/* 유저 정보 */}
          <div className="border-4 border-font-white p-9 self-start">
            <h2 className="text-center text-2xl text-neonYellow">👤 AUTH_NODE</h2>

            <div className="flex flex-col items-center mbs-6 text-center self-center">
              {/* 이미지 업로드 */}
              <Avata image={profileImage} />

              <strong className="text-lg text-neonGreen mbs-3">NAME: {userData?.username}</strong>
            </div>

            {/* 아이디변경 / 비밀번호 변경 버튼 */}
            <UserModal />
            {/* 로그아웃 / 회원탈퇴 */}
            <UserStateModal />
          </div>

          {/* QnA */}
          <div className="border-4 border-font-white mt-4 p-9 bg-bg lg:mt-0 lg:flex-1">
            <h2 className="text-2xl text-neonGreen">💾 MEDICAL_Q&A_STREAMS // 상담 내역 리스트</h2>

            <ErrorBoundaryWaper>
              <div className={`flex flex-col gap-4 mbs-6 lg:overflow-y-scroll ${userData?.role === "ADMIN" ? 'lg:max-h-110 lg:min-h-110': 'lg:max-h-94 lg:min-h-94'}`}>
                {qnaSort.map((item) => (
                  <QnACard key={item.id} id={item.id} user_id={item.user_id} title={item.title} tags={['태그1', '태그2']} update={item.created_at} isAnwers={item.is_answered} />
                ))}
              </div>
            </ErrorBoundaryWaper>
            
            {/* 질문 등록은 USER만 볼 수 있음 */}
            {userData?.role === "USER" && (
              <Link href={'/qna/id/page/edit'} className="group flex justify-center items-center focus-visible:outline-neonPink p-2 w-full border-3 border-neonPink text-neonPink hover:bg-neonPink hover:text-font-white transition-all mbs-4 cursor-pointer">
                <span className="me-1">질문하기</span>
                <svg viewBox="0 0 11 11" width="12" height="12" className="transition-all fill-neonPink group-hover:fill-white">
                  <path d="M4,0h3v11h-3z M0,4h11v3h-11z"></path>
                </svg>
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}