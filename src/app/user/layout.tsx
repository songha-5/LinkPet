import { useId } from "react";
import Image from "next/image";
import Footer from "../_components/footer/Footer";
import Header from "../_components/header/Header";
import StateNoti from "../_components/StateNoti";
import Tag from "../_components/Tag";
import QnACard from "../_components/QnACard";
import UserModal from "./_components/UserModal";
import UserStateModal from "./_components/UserStateModal";

export default function UserLayout() {
  const id = useId()

  return (
    <>
      <Header />
      <h1 className="sr-only">나의 반려동물 건강 정보 및 Q&A</h1>

      <main className="relative pbs-25 px-6 mbe-10">
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
              <div className="relative border-4 border-font-white w-40 h-40">
                <Image
                  src={"/bg_2.svg"}
                  alt="유저 프로필 사진"
                  fill
                  className="object-cover"
                />
                <div className="relative w-full h-full">
                  <label tabIndex={0} htmlFor={id} className="absolute -bottom-1 -right-1 block bg-neonGreen w-11 h-11 border-4 border-bg cursor-pointer hover:bg-font-white transition-all">
                    <svg viewBox="0 0 11 11" width="16" height="16" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <path d="M4,0h3v11h-3z M0,4h11v3h-11z"></path>
                    </svg>
                  </label>
                  <input type="file" id={id} accept="image/*" className="hidden" />
                </div>
              </div>

              <strong className="text-lg text-neonGreen mbs-3">ID: CYBER_PET7</strong>
            </div>

            {/* 아이디변경 / 비밀번호 변경 버튼 */}
            <UserModal />

            {/* 로그아웃 / 회원탈퇴 */}
            <UserStateModal />
          </div>

          {/* QnA */}
          <div className="border-4 border-font-white mt-4 p-9 bg-bg lg:mt-0 lg:flex-1">
            <h2 className="text-2xl text-neonGreen">💾 MEDICAL_Q&A_STREAMS // 상담 내역 리스트</h2>

            <div className="flex flex-col gap-4 mbs-6 lg:overflow-y-scroll lg:max-h-94 lg:min-h-94">
              <QnACard title="QnA리스트가 잘들어오는지 확인합니다." tags={['태그1', '태그2']} update="2026-06-15T13:33:21.000Z" isAnwers={false} />
              <QnACard title="QnA리스트가 잘들어오는지 확인합니다." tags={['태그1', '태그2']} update="2026-06-15T13:33:21.000Z" isAnwers={false} />
              <QnACard title="QnA리스트가 잘들어오는지 확인합니다." tags={['태그1', '태그2']} update="2026-06-15T13:33:21.000Z" isAnwers={false} />
            </div>
            
            <button type="button" className="group flex justify-center items-center focus-visible:outline-neonPink p-2 w-full border-3 border-gray-default text-gray-default hover:border-font-white hover:text-font-white transition-all mbs-4 cursor-pointer">
              <span className="me-1">질문하기</span>
              <svg viewBox="0 0 11 11" width="12" height="12" className="transition-all fill-gray-default group-hover:fill-white">
                <path d="M4,0h3v11h-3z M0,4h11v3h-11z"></path>
              </svg>
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}