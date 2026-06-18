import TiptapEditor from "@/src/app/_components/editor/Tiptap";
import Tag from "@/src/app/_components/Tag";
import Link from "next/link";

export default function QnAPage() {
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
      <section className="border-5 border-font-white p-7 bg-bg my-5">
        <div>
          <span className="block text-neonPink">USER_LOG // QUEST_NODE_07</span>
          <h2 className="text-2xl mbs-1">타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 타이틀 </h2>
          
          <div className="flex justify-between text-[14px] text-font-subText mbs-5 pbe-2 border-b-2 border-gray-default border-dashed">
            <span>WRITER: CYBER_PET7</span>
            <span>LOG_DATE: 2026.06.01 15:30</span>
          </div>
        </div>

        <div className="pbs-4">
          {/* 반려동물 정보 카드 */}
          <div className="border-3 border-neonPink py-4 px-6 mbe-4">
            <strong className="text-neonPink text-sm">[🐾] TARGET_PET_MANIFEST</strong>
            <p className="text-lg">대상 개체: <span className="text-neonYellow">초코</span> (말티즈 / 3세 / 4.2kg)</p>

            <div className="flex flex-row flex-wrap gap-2 mbs-2">
              <Tag content="내용이들어가요" tag className="py-1! border-2! text-[12px]!" color="green"/>
              <Tag content="내용이들어가요" tag className="py-1! border-2! text-[12px]!" color="green"/>
              <Tag content="내용이들어가요" tag className="py-1! border-2! text-[12px]!" color="green"/>
              <Tag content="내용이들어가요" tag className="py-1! border-2! text-[12px]!" color="green"/>
              <Tag content="내용이들어가요" tag className="py-1! border-2! text-[12px]!" color="green"/>
            </div>
          </div>

          {/* 에디터 자리 */}
          <p className="text-lg">
            저희 집 강아지
            초코가 사흘 전부터 사료연산 버퍼에 오류가 생겼는지 통 입을 대지 않습니다. 원래 밥그릇 비우는 속도가 엄청 빠른 아이였는데, 이제는 간식 주입구 근처에 가져다 대도 고개를 돌려버리네요. 자꾸 거실 어두운 소파 뒤 구석 레이어에만 들어가서 나오지 않고 걱정입니다.
          </p>
        </div>
      </section>
      
      {/* 답변리스트 */}
      <section className="transition-all border-5 bg-bg border-neonGreen shadow-[6px_6px_0_var(--color-neonGreen)] p-8.5">
        <div className="items-center flex border-b-2 pbe-5 border-gray-default border-dashed">
          <div className="border-3 border-neonGreen pbs-2 pbe-1 px-1 text-3xl">🩺</div>
          <div className="ms-4">
            <strong className="block text-neonGreen text-lg">DR. 픽셀캣 (박수의)</strong>
            <p className="text-[14px] text-font-subText">LINKPET 전문 의료 네트워크 위원 // 메디컬 코드 #402</p>
          </div>
        </div>

        <p className="text-lg mbs-5">
          [의학 소견 피드백 로그] 안녕하세요 보호자님, 링크펫 의료진입니다.

          초코의 실시간 거동 버퍼 및 증상 태그를 확인해 본 결과, 현재 개체는 심리적인 스트레스 유발 혹은 내부 하드웨어(특히 소화기계나 신장 라인)의 통증 패킷 신호가 전송되고 있을 확률이 매우 높습니다.

          동물들이 평소와 다르게 구석진 스페이스로 진입해 은폐 모드를 유지하는 행위는 본인의 생체 바이탈 저하 상태를 외부 포식자에게 숨기려는 고유 알고리즘의 일환입니다. 즉, 몸이 어딘가 많이 아프다는 구조 신호일 수 있습니다.

          [추천 프로토콜]
          1. 사료 패킷을 약 30도 내외로 뎁혀 후각 센서를 자극하여 인풋 유도를 시도해 보십시오.
          2. 만약 향후 12시간 이내에 수분 공급(음수)마저 완전 거부되는 드롭 상태가 지속된다면, 이는 급성 대사성 다운타임을 유발할 수 있습니다. 
          3. 이 경우 온라인 분석을 종료하시고 가까운 오프라인 로컬 병원에 긴급 내원하여 하드웨어 정밀 스캔(혈액 패널 검사 및 복부 엑스레이 연산)을 진행하시는 것을 강력하게 권장합니다.
        </p>
      </section>

      {/* 답변 대기 */}
      <section className="flex flex-col items-center border-5 bg-bg border-dashed border-neonYellow shadow-[6px_6px_0_var(--color-neonYellow-opacity)] p-8.5">
        <strong className="animate-blink text-neonYellow text-2xl text-center" aria-label="전문가의 답변을 기다리는 중입니다.">[ ⏳ . . . ]<br />AWAITING_VET_RESPONSE</strong>
        <p className="text-center mbs-4 text-gray-default">전문 수의사 네트워크 노드에 패킷 분배 완료.<br />답변 연산을 동기화 중입니다.<br />실시간 매칭 상태: <span className="text-neonPink">[BUFFERING...]</span></p>
      </section>

      {/* 전문가 답변 */}
      <section className="flex flex-col border-5 bg-bg border-neonYellow shadow-[6px_6px_0_var(--color-neonYellow-opacity)] p-8.5">
        <strong className="block text-2xl text-neonYellow">⚙️ RESPONSE_PATCH_EDITOR // 답변 데이터 수정</strong>

        {/* 에디터 */}
        <div className="mbs-4 border-3 px-5 py-5 shadow-[4px_4px_0_var(--color-font-white-shadow)]">
          <TiptapEditor />
        </div>

        <div className="flex gap-3 self-end mbs-4">
          <button type="button" className="border-3 border-neonPink text-neonPink py-1 px-6 cursor-pointer hover:bg-neonPink hover:text-bg transition-all inline-block">수정 취소 (CANCEL)</button>
          <button type="button" className="border-3 border-font-white text-font-white py-1 px-6 cursor-pointer hover:bg-font-white hover:text-bg transition-all inline-block">수정 완료 (PATCH_APPLY)</button>
        </div>
      </section>

      {/* 전문가 메인페이지 */}
      <section className="flex flex-col border-5 bg-bg border-neonGreen shadow-[6px_6px_0_var(--color-neonGreen-opacity)] p-8.5">
        <strong className="block text-2xl text-neonGreen">⚙️ RESPONSE // 답변 데이터</strong>

        <strong className="mbs-8 animate-blink text-neonYellow text-2xl text-center" aria-label="전문가의 답변을 기다리는 중입니다.">[ ⏳ . . . ]<br />AWAITING_VET_RESPONSE</strong>
        <p className="mbe-6 text-center mbs-4 text-gray-default">전문 수의사 네트워크 노드에 패킷 분배 완료.<br />답변 연산을 동기화 중입니다.<br />실시간 매칭 상태: <span className="text-neonPink">[BUFFERING...]</span></p>

        <div className="flex gap-3 self-end mbs-4">
          <button type="button" className="border-3 border-font-white text-font-white py-1 px-6 cursor-pointer hover:bg-font-white hover:text-bg transition-all inline-block">등록 하기 (CREATE_APPLY)</button>
        </div>
      </section>
    </>
  )
}