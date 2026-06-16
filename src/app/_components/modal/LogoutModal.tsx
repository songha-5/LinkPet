import BaseButton from "../../_components/button/BaseButton";

interface LogoutModalProps {
  onClick: () => void
}

export default function LogoutModal({ onClick }: LogoutModalProps) {
  return (
    <>
      <strong className="block text-center text-neonGreen text-2xl">DISCONNECT // 연결 해제</strong>
      <p className="text-font-white mbs-3 pb-4 text-center">정말로 코어 노드(AUTH_NODE)에서 <span className="text-neonPink">로그아웃</span>하시겠습니까?<br />현재 진행 중인 데이터 스트림이 중단됩니다.</p>

      <div className="flex gap-2 pbs-4">
        <BaseButton onClick={onClick} content="로그아웃 (LOGOUT)" color="pink" className="text-[18px] h-14!" />
      </div>
    </>
  )
}