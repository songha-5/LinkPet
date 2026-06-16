import BaseButton from "../button/BaseButton";

interface DelectModalProps {
  onClick: () => void
}

export default function DelectModal({ onClick }: DelectModalProps) {
  return (
    <>
      <strong className="block text-center text-neonGreen text-2xl">FATAL_ERROR // 회원 탈퇴</strong>
      <p className="text-font-white mbs-3 pb-4 text-center">코어 노드와의 연결을 삭제합니다.<br />귀하의 데이터 코어는 3초 내에 우주 먼지로 분해(WIPE)됩니다.<br />정말로 <span className="text-neonPink">탈퇴</span>하시겠습니까?</p>

      <div className="flex gap-2 pbs-4">
        <BaseButton onClick={onClick} content="탈퇴 (TERMINATE)" color="pink" className="text-[18px] h-14!" />
      </div>
    </>
  )
}