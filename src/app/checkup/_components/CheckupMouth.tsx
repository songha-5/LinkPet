import { useFormContext } from "react-hook-form"
import BaseCheckbox from "../../_components/checkbox/BaseCheckbox"

export default function CheckupMouth() {
  const CHECK_MOUTH = [
    { "id": "check-mouth-1", "label": "사료를 잘 씹지 못하거나 입냄새가 심해요", "option": "구강_불편"},
    { "id": "check-mouth-2", "label": "구토를 하거나 변 상태가 묽어요", "option": "소화기_이상"},
  ]

  const { register } = useFormContext()

  return (
    <div>
      <h2 className="text-center text-2xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">CHECK_LIST //<br />소화기 & 구강 검진하기</h2>

      <div className="mbs-10">
        <BaseCheckbox value={CHECK_MOUTH} none noneContent="없음" {...register('mouth')} />
      </div>
    </div>
  )
}