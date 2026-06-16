import BaseButton from "../button/BaseButton";
import BaseInput from "../input/BaseInput";

interface PassworModalProps {
  onClick: () => void
}

export default function PasswordModal({ onClick }: PassworModalProps) {

  return (
    <>
      <BaseInput title="PASSWORD" placeholder="현재 비밀번호를 입력해주세요." password/>
      <BaseInput title="NEW PASSWORD" placeholder="새 비밀번호를 입력해주세요." password className="mt-4"/>
      <BaseButton content="비밀번호 수정 (UPDATE)" outline onClick={onClick} className="text-[18px] h-14! mt-10"/>
    </>
  )
}