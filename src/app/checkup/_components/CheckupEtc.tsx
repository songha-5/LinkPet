import { useFormContext } from "react-hook-form";
import BaseCheckbox from "../../_components/checkbox/BaseCheckbox";

export default function CheckupEtc() {
  const CHECK_ETC = [
    { "id": "check-etc-1", "label": "기침을 자주 하거나 숨쉬기 힘들어해요", "option": "호흡기_이상"},
    { "id": "check-etc-2", "label": "눈곱이 심하게 끼거나 눈이 충혈됐어요", "option": "안구_질환"},
  ]

  const { register } = useFormContext()

  return (
    <div>
      <h2 className="text-center text-2xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">CHECK_LIST //<br />호흡 & 기타 검진하기</h2>

      <div className="mbs-10">
        <BaseCheckbox value={CHECK_ETC} none noneContent="없음" {...register('etc')} />
      </div>
    </div>
  )
}