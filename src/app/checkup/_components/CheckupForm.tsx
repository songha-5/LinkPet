"use client"

import { FormProvider, useForm } from "react-hook-form";
import BaseButton from "../../_components/button/BaseButton";
import CheckupBasicStatus from "./CheckupBasicStatus";
import CheckupAi from "./CheckupAi";
import CheckupSkin from "./CheckupSkin";
import CheckupMouth from "./CheckupMouth";
import CheckupActivity from "./CheckupActivity";
import CheckupEtc from "./CheckupEtc";
import CheckupCat from "./CheckupCat";
import { useState } from "react";
import Link from "next/link";

export default function CheckupForm() {
  const [step, setStep] = useState(0)  

  // 폼 데이터 관리
  const methods = useForm({
    
  })

  // 데이터 전송
  const onSubmit = (data) => {
    console.log("최종 데이터", data)
  }

  // 

  return (
    <FormProvider {...methods}>
    <Link href={'/user'} className="inline-block cursor-pointer transition-all hover:border-neonPink hover:text-neonPink border-5 border-font-white py-2 px-4" aria-label="컨트롤 룸으로 돌아가기">◀ 컨트롤 룸 복귀 (BACK)</Link>

    { /* 현재 페이지 정보 */}
      <form className="mbs-4" onSubmit={methods.handleSubmit(onSubmit)}>
        {/* 타이틀바 */}
        <div className="flex justify-between">
          <div>
            <span className="text-2xl">PHASE_01</span> // PET_CORE_REGISTRATION
          </div>

          <div>
            <span className="text-2xl me-3">
              75% 
            </span>
            COMPLETED
          </div>
        </div>

        {/* 프로그래스 바 */}
        <div className="border-5 border-font-white bg-bg mbs-1">
          <div className="transition-all bg-neonGreen h-4 w-20 m-1"></div>
        </div>
      </form>

      {/* 질문 */}
      <section className="transition-all border-6 bg-bg border-neonPink shadow-[6px_6px_0_var(--color-neonPink)] p-8.5 mbs-4">

        {/* 첫번째 질문 - 반려동물 정보 입력 */}
        <CheckupBasicStatus />
        {/* 두번째 질문 - AI 검사 */}
        <CheckupAi />
        {/* 세번째 질문 - 피부, 귀 */}
        <CheckupSkin />
        {/* 네번째 질문 - 소화기, 구강 */}
        <CheckupMouth />
        {/* 다섯번째 질문 - 관절, 활동량 */}
        <CheckupActivity />
        {/* 여섯번째 질문 - 호흡 및 기타 */}
        <CheckupEtc />
        {/* 고양이 전용 질문 */}
        <CheckupCat />

        {/* 이전/다음/완료 버튼 */}
        <div className="flex gap-2 pbs-8 border-t-2 border-gray-default mbs-18 border-dashed">
          <BaseButton
            type="button"
            content="◀ BACK (이전)"
            color="white"
            outline
          />
          <BaseButton
            type="button"
            content="NEXT (완료) ▶"
            color="pink"
          />
        </div>
      </section>
    </FormProvider>
  )
}