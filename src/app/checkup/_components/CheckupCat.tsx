import { useFormContext } from "react-hook-form";
import BaseRadio from "../../_components/radio/BaseRadio";
import { CHECK_OUTING, CHECK_SNACK } from "../type/checkupType";

export default function CheckupCat() {
  const { register } = useFormContext()

  return (
    <div>
      <h2 className="text-center text-2xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">CHECK_LIST //<br />생활 습관 검진하기</h2>

      <div className="mbs-10">
        <strong className="block text-[16px] text-neonGreen mbe-1">PET_SNACK // 간식 빈도</strong>

        <div className="flex gap-2">
          {CHECK_SNACK.map((items) => (
            <BaseRadio
              content={items.label}
              value={items.option}
              key={items.id}
              { ...register('snack') }
            />
          ))}
        </div>
      </div>

      <div className="mbs-4">
        <strong className="block text-[16px] text-neonGreen mbe-1">PET_OUTING // 외출 냥이</strong>

        <div className="flex gap-2">
          {CHECK_OUTING.map((items) => (
            <BaseRadio
              content={items.label}
              value={items.option}
              key={items.id}
              { ...register('outing') }
            />
          ))}
        </div>
      </div>
    </div>
  )
}