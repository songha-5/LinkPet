import BaseCheckbox from "../../_components/checkbox/BaseCheckbox";
import BaseRadio from "../../_components/radio/BaseRadio";

export default function CheckupCat() {
  return (
    <div>
      <h2 className="text-center text-2xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">CHECK_LIST //<br />생활 습관 검진하기</h2>

      <div className="mbs-10">
        <strong className="block text-[16px] text-neonGreen mbe-1">PET_SNACK // 간식 빈도</strong>

        <div className="flex gap-2">
          <BaseRadio
            content="하루 2회 이상"
            name="snack"
            value="snack_2"
          />
          <BaseRadio
            content="하루 1회"
            name="snack"
            value="snack_1" 
          />
          <BaseRadio
            content="거의 안 먹음"
            name="snack"
            value="snack_0" 
          />
        </div>
      </div>

      <div className="mbs-4">
        <strong className="block text-[16px] text-neonGreen mbe-1">PET_OUTING // 외출 냥이</strong>

        <div className="flex gap-2">
          <BaseRadio
            content="예"
            name="outing" 
            value="outing_cat"
          />
          <BaseRadio
            content="아니요"
            name="outing"
            value="house_cat" 
          />
        </div>
      </div>
    </div>
  )
}