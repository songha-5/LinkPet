import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";
import StateNoti from "../_components/StateNoti";
import Tag from "../_components/Tag";
import QnACard from "../_components/QnACard";
import UserModal from "./_components/UserModal";
import UserStateModal from "./_components/UserStateModal";
import Avata from "./_components/ProfileImage";
import { createClient } from "@/src/utils/supabase/server";
import Link from "next/link";
import { getUser } from "../_lib/getUser";

export default async function UserPage() {

  // 유저 데이터 호출
  const supabase = await createClient()
  const user = await getUser()

  // 프로필사진 데이터 호출
  const { data: userData } = await supabase
    .from('users')
    .select('profile_image, role')
    .eq('id', user.id)
    .single()
  
  const profileImage = userData?.profile_image || '/bg_2.svg'
  const isAdmin = userData?.role === "ADMIN"
  // QnA 리스트 호출
  // USER QnA 리스트
  const { data: qnaData, error: qnaError } = isAdmin ? 
   await supabase.from('posts').select('id, title, is_answered, created_at, user_id') :
   await supabase.from('posts').select('id, title, is_answered, created_at, user_id').eq('user_id', user.id)
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

          {/* 반려동물 이름/종/나이/아픈정도 */}
          <div className="text-neonPink">
            <h2 className="text-2xl">🐾 PET_CORE_DATA // 개체 프로필</h2>
            <strong className="block mbs-2 text-4xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">초코 (CODE_V1.0)</strong>
            <p className="text-[16px] text-font-subText">종족: 말티즈 // 나이 프로토콜: YEARS_OLD</p>

            <div className="flex gap-3 flex-wrap mbs-4">
              <Tag content="내용이들어가요" tag />
              <Tag content="내용이들어가요" color="yellow" tag />
              <Tag content="내용이들어가요" color="green" tag />
              <Tag content="내용이_들어가요_들어가요_들어가요" color="white" tag />
              <Tag content="내용이들어가요" tag />
              <Tag content="내용이들어가요" tag />
            </div>
          </div>

          <div className="mbs-10 border-3 border-dashed border-font-caption p-5 bg-bg-gray lg:mt-0 lg:ms-4">
            <strong className="text-font-subText">MATRIX_HEALTH_ALERT // 진단 상태 알림</strong>

            <div className="flex flex-col gap-3 mbs-5">
              <StateNoti title="양호 // SAFE" content="개체 생체 데이터 스트림이 안정 상태입니다. 마이펫 방어막 정상 가동 중." />
              <StateNoti title="경고 // WARN" content="일부 연산 노드에 이상 마찰 징후 검출! 지속적인 증상 트래킹 및 정밀 관찰이 요구됩니다." />
              <StateNoti title="위험 // HG_RISK" content="바이탈 패킷 임계치 초과 발생! 즉시 전문의 오프라인 원격 매칭 또는 병원 이송 통신을 개시하십시오." color="pink"/>
            </div>
          </div>
        </section>

        {/* 유저정보 및 QnA */}
        <section className="mbs-10 bg-bg lg:flex gap-6">
          {/* 유저 정보 */}
          <div className="border-4 border-font-white p-9 self-start">
            <h2 className="text-center text-2xl text-neonYellow">👤 AUTH_NODE</h2>

            <div className="flex flex-col items-center mbs-6 text-center self-center">
              {/* 이미지 업로드 */}
              <Avata image={profileImage} />

              <strong className="text-lg text-neonGreen mbs-3">NAME: CYBER_PET7</strong>
            </div>

            {/* 아이디변경 / 비밀번호 변경 버튼 */}
            <UserModal />
            {/* 로그아웃 / 회원탈퇴 */}
            <UserStateModal />
          </div>

          {/* QnA */}
          <div className="border-4 border-font-white mt-4 p-9 bg-bg lg:mt-0 lg:flex-1">
            <h2 className="text-2xl text-neonGreen">💾 MEDICAL_Q&A_STREAMS // 상담 내역 리스트</h2>

            <div className={`flex flex-col gap-4 mbs-6 lg:overflow-y-scroll ${userData?.role === "ADMIN" ? 'lg:max-h-110 lg:min-h-110': 'lg:max-h-94 lg:min-h-94'}`}>
              {qnaSort.map((item) => (
                <QnACard key={item.id} id={item.id} user_id={item.user_id} title={item.title} tags={['태그1', '태그2']} update={item.created_at} isAnwers={item.is_answered} />
              ))}
            </div>
            
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