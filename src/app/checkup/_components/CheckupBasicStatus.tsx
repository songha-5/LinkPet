import BaseInput from "../../_components/input/BaseInput";
import BaseRadio from "../../_components/radio/BaseRadio";
import BaseSelect from "../../_components/select/BaseSelect";

const AGE_OPTIONS = [
  { value: "1", label: "1 세 (1_YEAR_OLD)" },
  { value: "2", label: "2 세 (2_YEAR_OLD)" },
  { value: "3", label: "3 세 (3_YEAR_OLD)" },
  { value: "4", label: "4 세 (4_YEAR_OLD)" },
  { value: "5", label: "5 세 (5_YEAR_OLD)" },
  { value: "6", label: "6 세 (6_YEAR_OLD)" },
  { value: "7", label: "7 세 (7_YEAR_OLD)" }
]

export default function CheckupBasicStatus() {
  return (
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
        className="mbs-4"
      />

      <BaseInput
        title="PET_NAME // 개체 체중"
        placeholder="반려동물의 이름을 입력하세요"
        className="[&_strong]:text-[16px] mbs-4"
      />
      
      <div className="mbs-4">
        <strong className="block text-[16px] text-neonGreen mbe-1">PET_GENDER // 개체 성별</strong>

        <div className="flex gap-2">
          <BaseRadio
            content="여자아이"
            name="gender" 
            value="girl"
          />
          <BaseRadio
            content="남자아이"
            name="gender"
            value="boy" 
          />
        </div>
      </div>

      <div className="mbs-4">
        <strong className="block text-[16px] text-neonGreen mbe-1">PET_NEUTER // 중성화 여부</strong>

        <div className="flex gap-2">
          <BaseRadio
            content="예"
            name="neuter" 
            value="yes"
          />
          <BaseRadio
            content="아니요"
            name="neuter"
            value="no" 
          />
        </div>
      </div>
    </div>
  )
}