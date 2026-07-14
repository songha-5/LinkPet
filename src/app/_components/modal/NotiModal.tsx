import BaseButton from "../button/BaseButton";
interface NotiModalProps {
  userId: string
  userPassword: string
  adminId: string
  adminPassword: string
  onClick: () => void
}

export default function NotiModal({onClick, userId, userPassword, adminId, adminPassword}: NotiModalProps) {
  return (
    <>
      <strong className="block text-neonGreen text-3xl text-center">[ 🐾 ^•ﻌ•^ 🐾 ]</strong>
      <strong className="block text-neonYellow text-3xl text-center mbs-2">안녕하세요!</strong>
      <p className="text-font-white mbs-6">해당 사이트는 <span className="text-neonPink">포트폴리오용</span>으로 제작한 페이지입니다.</p>
      <p className="text-font-white mbs-2">회원가입을 하셔서 웹사이트를 둘러보실 수 있어요!<br />하지만 회원가입을 하지않고 페이지를 둘러보고싶다면 아래 계정을 이용해주세요.</p>

      <div className="text-font-white border-2 border-gray-default border-dashed p-6 text-center mbs-6">
        <p className="text-2xl">USER</p>
        <strong>ID - {userId}<br />PASSWORD - {userPassword}</strong>
        <p className="mbs-8 text-2xl">ADMIN</p>
        <strong>ID - {adminId}<br />PASSWORD - {adminPassword}</strong>
      </div>
      
      <BaseButton onClick={onClick} content="확인" outline className="mbs-4"/>
    </>
  )
}