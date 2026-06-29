import ImageButton from "../../_components/button/ImageButton";
import BaseInput from "../../_components/input/BaseInput";

export default function CheckupAi() {
  return (
    <div>
      <h2 className="text-center text-2xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">CHECK_AI_PET //<br />반려동물의 건강상태를 AI를 통해 알아보세요!</h2>

      <ImageButton className="mbs-10" />

      <p className="text-center mbs-4 border-3 border-gray-default border-dashed bg-bg-gray-100 px-4 py-2">이미지를 올리시면 우리 반려동물의 건강상태를 검사해줘요!</p>
    </div>
  )
}