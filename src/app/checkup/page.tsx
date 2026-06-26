import BaseButton from "../_components/button/BaseButton";
import BaseInput from "../_components/input/BaseInput";
import BaseRadio from "../_components/radio/BaseRadio";
import BaseSelect from "../_components/select/BaseSelect";


const AGE_OPTIONS = [
  { value: "1", label: "1 세 (1_YEAR_OLD)" },
  { value: "2", label: "2 세 (2_YEAR_OLD)" },
  { value: "3", label: "3 세 (3_YEAR_OLD)" },
  { value: "4", label: "4 세 (4_YEAR_OLD)" },
  { value: "5", label: "5 세 (5_YEAR_OLD)" },
  { value: "6", label: "6 세 (6_YEAR_OLD)" },
  { value: "7", label: "7 세 (7_YEAR_OLD)" }
]

export default function CheckupPage() {
  return (
    <>
      <h1 className="sr-only">반려동물의 상태를 체크하는 페이지입니다.</h1>

      {/* 현재 페이지 정보 */}
      <div className="">
        {/* 타이틀바 */}
        <div className="flex justify-between">
          <div className="">
            <span className="text-2xl">PHASE_01</span> // PET_CORE_REGISTRATION
          </div>

          <div className="">
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
      </div>

      {/* 질문 */}
      <section className="transition-all border-6 bg-bg border-neonPink shadow-[6px_6px_0_var(--color-neonPink)] p-8.5 lg:flex lg:flex-row mbs-4">

        {/* 첫번째 질문 - 반려동물 정보 입력 */}
        <div className="">
          <h2 className="text-center text-2xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">CREATE_PET //<br />반려동물의 코어 데이터를 주입하세요!</h2>

          <BaseInput
            title="PET_NAME // 개체 이름"
            placeholder="반려동물의 이름을 입력하세요"
            className="[&_strong]:text-[16px] mbs-10"
          />

          <BaseSelect
            title="PET_AGE // 개체 나이"
            placeholder="나이를 선택하세요"
            options={AGE_OPTIONS}
          />

          <BaseInput
            title="PET_NAME // 개체 체중"
            placeholder="반려동물의 이름을 입력하세요"
            className="[&_strong]:text-[16px] mbs-4"
          />
          
          <BaseRadio />

          <div className="">
            성별
            <p>여</p>
            <p>남</p>
          </div>

          <div className="">
            중성화 여부
            <p>예</p>
            <p>아니요</p>
          </div>
        </div>
        
        <div className="">
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
    </>
  )
}