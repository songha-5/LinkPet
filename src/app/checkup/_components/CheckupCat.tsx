import { useFormContext } from "react-hook-form";
import BaseRadio from "../../_components/radio/BaseRadio";

export default function CheckupCat() {
  const { register } = useFormContext()

  return (
    <div>
      <h2 className="text-center text-2xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">CHECK_LIST //<br />생활 습관 검진하기</h2>

      <div className="mbs-10">
        <strong className="block text-[16px] text-neonGreen mbe-1">PET_SNACK // 간식 빈도</strong>

        <div className="flex gap-2">
          <BaseRadio
            content="하루 2회 이상"
            value="snack_2"
            { ...register('snack') }
          />
          <BaseRadio
            content="하루 1회"
            value="snack_1" 
            { ...register('snack') }
          />
          <BaseRadio
            content="거의 안 먹음"
            value="snack_0" 
            { ...register('snack') }
          />
        </div>
      </div>

      <div className="mbs-4">
        <strong className="block text-[16px] text-neonGreen mbe-1">PET_OUTING // 외출 냥이</strong>

        <div className="flex gap-2">
          <BaseRadio
            content="예"
            value="outing_cat"
            { ...register('outing') }
          />
          <BaseRadio
            content="아니요"
            value="house_cat" 
            { ...register('outing') }
          />
        </div>
      </div>
    </div>
  )
}