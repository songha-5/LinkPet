"use client"

import { FormProvider, useForm } from "react-hook-form";
import BaseButton from "../../_components/button/BaseButton";
import CheckupBasicStatus from "./CheckupBasicStatus";
import CheckupAi from "./CheckupAi";
import CheckupSkin from "./CheckupSkin";
import CheckupMouth from "./CheckupMouth";
import CheckupActivity from "./CheckupActivity";
import CheckupEtc from "./CheckupEtc";
import { useState } from "react";
import Link from "next/link";
import CheckupCat from "./CheckupCat";

export default function CheckupForm() {
  const [step, setStep] = useState<number>(0)  
  const [switchData, setSwitchData] = useState<string[]>([])

  // 폼 데이터 관리
  const methods = useForm({
    
  })

  // 데이터 전송
  const onSubmit = (data) => {
    console.log("최종 데이터", data)
  }

  // 페이지 조건 추가
  const stepAdd = (addData: string) => {
   if(switchData.includes(addData)) {
    const filteredArray = switchData.filter((items) => items !== addData)
    setSwitchData(filteredArray)
   } else {
    const newArray = [...switchData, addData]
    setSwitchData(newArray)
   }
  }

  let CHECKUP_COMPONENT = [
    // <CheckupBasicStatus data={} stepAdd={stepAdd}/>,
    switchData.includes('cat') ? <CheckupCat /> : false,
    <CheckupAi />,
    <CheckupSkin />,
    <CheckupMouth />,
    <CheckupActivity />,
    <CheckupEtc />,
  ].filter(Boolean)

  // 프로그래스바
  const progress = Math.round((step / (CHECKUP_COMPONENT.length - 1)) * 100)

  // 다음/이전 페이지 버튼
  const componentsLenght = CHECKUP_COMPONENT.length - 1
  const handleStepCount = (type: string) => {
    if(type === "next") {
      if(componentsLenght > step) {
        setStep((state) => state + 1)
      }
    } else {
      if(0 < step) {
        setStep((state) => state - 1)
      }
    }
  }

  return (
    <FormProvider {...methods}>
      <Link href={'/user'} className="inline-block cursor-pointer transition-all hover:border-neonPink hover:text-neonPink border-5 border-font-white py-2 px-4" aria-label="컨트롤 룸으로 돌아가기">◀ 컨트롤 룸 복귀 (BACK)</Link>

      { /* 현재 페이지 정보 */}
      <form className="mbs-4" onSubmit={methods.handleSubmit(onSubmit)}>
        {/* 타이틀바 */}
        <div className="flex justify-between">
          <div>
            <span className="text-2xl">PHASE_{step + 1}</span> // PET_CORE_REGISTRATION
          </div>

          <div>
            <span className="text-2xl me-3">
              {progress}% 
            </span>
            COMPLETED
          </div>
        </div>

        {/* 프로그래스 바 */}
        <div className="border-5 border-font-white bg-bg mbs-1">
          <div className="transition-all bg-neonGreen h-4 m-1" style={{ width: `calc(${progress}% - 8px`}} aria-label={`${progress}% 진행`} ></div>
        </div>
      </form>

      {/* 질문 */}
      <section className="transition-all border-6 bg-bg border-neonPink shadow-[6px_6px_0_var(--color-neonPink)] p-8.5 mbs-4">

        {/* 검사 폼 컴포넌트 */}
        {CHECKUP_COMPONENT[step]}

        {/* 이전/다음/완료 버튼 */}
        <div className="flex gap-2 pbs-8 border-t-2 border-gray-default mbs-18 border-dashed">
          {step !== 0 && (
            <BaseButton
              type="button"
              content="◀ BACK (이전)"
              color="white"
              outline
              onClick={() => handleStepCount("prev")}
            />
          )} 
          <BaseButton
            type={step !== componentsLenght ? "button" : "submit"}
            content={step !== componentsLenght ? "NEXT (다음) ▶" : "COMPLEATE (제출) ■"}
            color={step !== componentsLenght ? "pink" : "green"}
            onClick={() => handleStepCount("next")}
          />
        </div>
      </section>
    </FormProvider>
  )
}