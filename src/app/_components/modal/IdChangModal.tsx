import BaseButton from "../button/BaseButton";
import BaseInput from "../input/BaseInput";

interface IdChangeProps {
  onClick: () => void
}

export default function IdChangeModal({ onClick }:IdChangeProps) {
  return (
    <>
      <BaseInput title="NEW USER ID" placeholder="새로운 아이디를 입력하세요."/>
      <BaseButton content="변경 적용 (APPLY)" onClick={onClick} outline className="text-[18px] h-14! mt-10"/>
    </>
  )
}