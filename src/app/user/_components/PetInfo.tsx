import { createClient } from "@/src/utils/supabase/server";
import StateNoti from "../../_components/StateNoti";
import Tag from "../../_components/Tag";
import { getUser } from "../../_lib/getUser";
import { Fragment } from "react";
import { ALL_CHECKUP_ITEMS } from "../../checkup/type/checkupType";
import ErrorBoundaryWaper from "../../_components/error/ErrorBoundaryWapper";

export default async function PetInfo() {
  const supabase = await createClient()

  // 로그인된 유저 정보 호출
  const user = await getUser()

  // 펫 기본 정보 호출 
  const { data: petData, error: petError } = await supabase
  .from('pet')
  .select('id, name, age, gender, weight, type, neuter')
  .eq('user_id', user.id)

  const petSelect = petData?.[0]

  if (!petData || petData.length === 0 || !petSelect) {
    console.log("펫 데이터를 불러오지 못하였습니다.", petError)
    throw new Error("펫 데이터를 불러오지 못하였습니다.")
  }

  const statusSelect = petData?.[0]

  if (!statusSelect) {
    console.log("statusSelect가 없습니다") 
    return
  }

  // 펫 상세 정보 호출
  const { data: statusData, error: statusError } = await supabase
  .from('pet_status')
  .select('symptoms, ai_analysis, point')
  .eq('pet_id', statusSelect.id)
  .single()

  if (!statusData || statusError) {
    console.log("펫 상태 정보를 불러오지 못했습니다.", statusError)
    throw new Error("펫 상태 정보를 불러오지 못했습니다.")
  }

  // 성별 구분
  const petGender = petSelect.gender === 'girl' ? "여자아이" : "남자아이"

  // 건강상태 - 점수
  const PET_STATUS = [
    { "title": "양호 // SAFE", "content": "개체 생체 데이터 스트림이 안정 상태입니다. 마이펫 방어막 정상 가동 중.", "type": "safe"},
    { "title": "경고 // WARN", "content": "일부 연산 노드에 이상 마찰 징후 검출! 지속적인 증상 트래킹 및 정밀 관찰이 요구됩니다.", "type": "warn"},
    { "title": "위험 // HG_RISK", "content": "바이탈 패킷 임계치 초과 발생! 즉시 전문의 오프라인 원격 매칭 또는 병원 이송 통신을 개시하십시오.", "type": "hg_risk"},
  ]
  const petScore = (state: string) => {
    if(statusData.point >= 70 && state === "safe" ) {
      return "green"
    } else if ( (70 > statusData.point) && statusData.point >= 60 && state === "warn") {
      return "yellow"
    } else if (60 > statusData.point && state === "hg_risk") {
      return "pink"
    } else {
      return "base"
    }
  }

  return (
    <>
      <div className="text-neonPink">
        <h2 className="text-2xl">🐾 PET_CORE_DATA // 개체 프로필</h2>
        <ErrorBoundaryWaper>
          <strong className="block mbs-2 text-4xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">{petSelect.name} (CODE_V1.0)</strong>
          <p className="text-[16px] text-font-subText">종족: {petGender} {"//"} 나이 프로토콜: {petSelect.age}YEARS_OLD</p>
          <p className="text-[16px] text-font-subText">몸무게: {Math.ceil(petSelect.weight * 100) / 100}kg</p>

          <div className="flex gap-3 flex-wrap mbs-4">
            {Object.entries(statusData.symptoms || {}).map(([key, value]) => {
              // 배열 + 원시타입을 배열화 
              const safeValues = Array.isArray(value) ? value : [value] as string[]
              return (
                <Fragment key={key}>
                  {safeValues.filter((items) => items !== "on").map((item, index) => {
                    // -10점만 경고 컬러로 변경
                    const foundItem = ALL_CHECKUP_ITEMS.find((check) => check.option === item)
                    const isDanger = foundItem?.score === -10
                    const isSafe = foundItem?.score === 0

                    return <Tag key={index} content={item} tag color={isDanger ? "pink" : isSafe ? "green" : "yellow"} />
                  })}
                </Fragment>
              )
            })}
          </div>
        </ErrorBoundaryWaper>
      </div>

      <div className="mbs-10 border-3 border-dashed border-font-caption p-5 bg-bg-gray lg:mt-0 lg:ms-4">
        <strong className="text-font-subText">MATRIX_HEALTH_ALERT // 진단 상태 알림</strong>
          
        <div className="flex flex-col gap-3 mbs-5">
          <ErrorBoundaryWaper>
            {PET_STATUS.map((item, index) => (
              <StateNoti key={index} title={item.title} content={item.content} color={petScore(item.type)}/>
            ))}
          </ErrorBoundaryWaper>
        </div>
      </div>
    </>
  )
}