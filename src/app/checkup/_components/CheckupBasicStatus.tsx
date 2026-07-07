import { useFormContext } from "react-hook-form";
import BaseInput from "../../_components/input/BaseInput";
import BaseRadio from "../../_components/radio/BaseRadio";
import BaseSelect from "../../_components/select/BaseSelect";
import { AGE_OPTIONS } from "../type/checkupType";

export default function CheckupBasicStatus() {
  const { register } = useFormContext()
  
  return (
    <div className="">
      <h2 className="text-center text-2xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">CREATE_PET //<br />반려동물의 코어 데이터를 주입하세요!</h2>

      <BaseInput
        title="PET_NAME // 개체 이름"
        placeholder="반려동물의 이름을 입력하세요"
        className="[&_strong]:text-[16px] mbs-10"
        {...register("name")}
      />

      <BaseSelect
        title="PET_AGE // 개체 나이"
        placeholder="나이를 선택하세요"
        options={AGE_OPTIONS}
        className="mbs-4"
        {...register("age")}
      />

      <BaseInput
        title="PET_WEIGHT // 개체 체중"
        placeholder="반려동물의 체중을 입력하세요"
        className="[&_strong]:text-[16px] mbs-4 [&_input]:appearance-none [&_input::-webkit-outer-spin-button]:appearance-none [&_input::-webkit-inner-spin-button]:appearance-none"
        type="number"
        {...register("weight")}
      />
      
      <div className="mbs-4">
        <strong className="block text-[16px] text-neonGreen mbe-1">PET_TYPE // 개체 종</strong>

        <div className="flex gap-2">
          <BaseRadio
            content="고양이"
            value="cat"
            {...register("type")}
          />
          <BaseRadio
            content="강아지"
            value="dog" 
            {...register("type")}
          />
        </div>
      </div>

      <div className="mbs-4">
        <strong className="block text-[16px] text-neonGreen mbe-1">PET_GENDER // 개체 성별</strong>

        <div className="flex gap-2">
          <BaseRadio
            content="여자아이"
            value="girl"
            {...register("gender")}
          />
          <BaseRadio
            content="남자아이"
            value="boy" 
            {...register("gender")}
          />
        </div>
      </div>

      <div className="mbs-4">
        <strong className="block text-[16px] text-neonGreen mbe-1">PET_NEUTER // 중성화 여부</strong>

        <div className="flex gap-2">
          <BaseRadio
            content="예"
            value="yes"
            {...register("neuter")}
          />
          <BaseRadio
            content="아니요"
            value="no" 
            {...register("neuter")}
          />
        </div>
      </div>
    </div>
  )
}