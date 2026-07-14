import { useFormContext } from "react-hook-form"
import BaseCheckbox from "../../_components/checkbox/BaseCheckbox"
import { CHECK_MOUTH } from "../type/checkupType"

export default function CheckupMouth() {
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