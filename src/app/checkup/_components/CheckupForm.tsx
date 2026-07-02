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
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckupFormData, CheckupSchema } from "../../_lib/checkup";
import { useRouter } from "next/navigation";
import { ALL_CHECKUP_ITEMS } from "../type/checkupType";

export default function CheckupForm() {
  const route = useRouter()
  const [step, setStep] = useState<number>(0)  

  // 폼 데이터 관리
  const methods = useForm({
    resolver: zodResolver(CheckupSchema),
    defaultValues: {
      age: ''
    }
  })

  const petType = methods.watch("type")

  // 각 페이지별 유효성 검사
  const CHECKUP_VALIDATION = [
    ['name', 'age', 'weight', 'type', 'gender', 'neuter'],
    petType === 'cat' ? ['snack', 'outing'] : undefined,
    [],
    ['skin'],
    ['mouth'],
    ['activity'],
    ['etc']
  ].filter(Boolean)

  const checkupMap = CHECKUP_VALIDATION[step] || []
  const checkupWatch = methods.watch(checkupMap as (keyof CheckupFormData)[])
  const isCurrentCheckup = checkupMap?.length === 0 || (checkupMap?.length > 0 && checkupWatch.every((value) => {
    if (value == null) return false
    if (value === "") return false
    if (Array.isArray(value) && value.length === 0) return false
    return true
  }))

  // 데이터 전송
  const onSubmit = async (data: CheckupFormData) => {
    try {
      // 점수 
      let totalScore = 100
      // 항목들 순회사며 점수 계산
      ALL_CHECKUP_ITEMS.forEach((items) => {
        const selectedValue = data[items.category as keyof CheckupFormData]
        
        if (Array.isArray(selectedValue)) {
          // 배열일 경우 - checkbox
          if (selectedValue.includes(items.option)) totalScore += items.score
        } else {
          // 문자열("")일경우 - radio
          if (selectedValue === items.option) totalScore += items.score
        }
      })

      const totalData = {
        ...data,
        point: totalScore
      }

      const response = await fetch('/api/checkup', {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(totalData)
      })

      if(!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "서버 에러가 발생하였습니다.")
      }

      const result = await response.json()
      route.push('/user')
    } catch(error) {
      console.log("데이터 전송 실패", error)
      // 404??
    }
  }

  let CHECKUP_COMPONENT = [
    <CheckupBasicStatus />,
    petType === 'cat' ? <CheckupCat /> : false,
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
              disabled={isCurrentCheckup ? false : true}
            />
          </div>
        </section>
      </form>
    </FormProvider>
  )
}