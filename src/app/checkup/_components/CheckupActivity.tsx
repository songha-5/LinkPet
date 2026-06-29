import BaseCheckbox from "../../_components/checkbox/BaseCheckbox";

export default function CheckupActivity() {
  const CHECK_ACTIVITY = [
    { "id": "check-activity-1", "label": "걷는 모습이 불편해 보이거나 다리를 절어요", "option": "관절_통증"},
    { "id": "check-activity-2", "label": "예전보다 활동량이 눈에 띄게 줄었어요", "option": "기력_저하"},
  ]

  return (
    <div>
      <h2 className="text-center text-2xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">CHECK_LIST //<br />관절 & 활동량 검진하기</h2>

      <div className="mbs-10">
        <BaseCheckbox name="activity" value={CHECK_ACTIVITY} none noneContent="없음" />
      </div>
    </div>
  )
}