import { useFormContext } from "react-hook-form";
import BaseCheckbox from "../../_components/checkbox/BaseCheckbox";

export default function CheckupSkin() {
  const CHECK_SKIN = [
    { "id": "check-skin-1", "label": "피부를 자주 긁거나 핥아요", "option": "피부_가려움"},
    { "id": "check-skin-2", "label": "뾰루지, 각질, 붉은 기가 있어요", "option": "피부_발진"},
    { "id": "check-skin-3", "label": "귀지가 많고 냄새가 나요", "option": "귀_염증의심"},
  ]

  const { register } = useFormContext()

  return (
    <div>
      <h2 className="text-center text-2xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">CHECK_LIST //<br />귀 & 피부 검진하기</h2>

      <div className="mbs-10">
        <BaseCheckbox  value={CHECK_SKIN} none noneContent="없음" {...register('skin') }/>
      </div>
    </div>
  )
}