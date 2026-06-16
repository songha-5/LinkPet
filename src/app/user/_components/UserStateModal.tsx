'use client'

import { useModalStore } from "@/src/store/useModalStore"
import WaringModal from "../../_components/modal/WaringModal"
import { logoutAction } from "@/src/actions/auth.logout"
import { useRouter } from "next/navigation"
import { delectUserAction } from "@/src/actions/auth.delectUser"
import SimpleModal from "../../_components/modal/SimpleModal"

export default function UserStateModal() {
  const router = useRouter()
  const openModal = useModalStore((state) => state.openModal)

  const handleLogoutButton = async () => {
    try {
      logoutAction()
      router.push('/')
    } catch (error) {
      console.log("로그아웃에 실패했습니다", error)
    }
  }

  const handleDelectUserButton = async () => {
    try {
      const result = await delectUserAction()
      if (result.success) {
      openModal(
        <SimpleModal
          title="감사합니다."
          content="저희 서비스를 이용해주셔서 감사합니다."
          color="green"
          buttonText="확인 (CONFIRM)"
        />
      )
      router.push('/')
    } else {
      openModal(
        <SimpleModal
          title="실패했습니다!"
          content={result.message || "회원탈퇴에 실패하였습니다! 다시 시도해주세요."}
          color="pink"
          buttonText="확인 (CONFIRM)"
        />)
      }
    } catch (error) {
      openModal(
        <SimpleModal
          title="실패했습니다!"
          content="회원탈퇴에 실패하였습니다! 다시시도해주세요."
          color="green"
          buttonText="확인 (CONFIRM)"
        />
      )
      console.log("탈퇴에 실패했습니다", error)
    }
  }

  return (
    <div className="flex justify-between mt-8 border-t-2 border-font-caption border-dashed">
      <button onClick={() => openModal(
        <WaringModal
          title="DISCONNECT // 연결 해제" 
          content={
            <>
              정말로 코어 노드(AUTH_NODE)에서 <span className="text-neonPink">로그아웃</span>하시겠습니까?<br />현재 진행 중인 데이터 스트림이 중단됩니다.
            </>
          }
          buttonText="확인 (CONFIRM)"
          color="pink"
          onClick={handleLogoutButton}
        />)}
        className="cursor-pointer mbs-4 relative transition-all after:absolute hover:after:border after:bottom-0 after:left-1/2 before:h-0.5 after:w-0 after:bg-neonPink after:duration-300 after:-translate-x-1/2 hover:after:w-full inline-flex text-font-caption text-sm hover:text-neonPink focus-visible:outline-neonPink">
        로그아웃 (LOGOUT)
      </button>
      <button onClick={() => openModal(
        <WaringModal
          title="FATAL_ERROR // 회원 탈퇴"
          content={
            <>
              코어 노드와의 연결을 삭제합니다.<br />귀하의 데이터 코어는 3초 내에 우주 먼지로 분해(WIPE)됩니다.<br />정말로 <span className="text-neonPink">탈퇴</span>하시겠습니까?
            </>
          }
          buttonText="탈퇴 (TERMINATE)"
          color="pink"
          onClick={handleDelectUserButton}
        />)} className="cursor-pointer mbs-4 relative transition-all after:absolute hover:after:border after:bottom-0 after:left-1/2 before:h-0.5 after:w-0 after:bg-neonPink after:duration-300 after:-translate-x-1/2 hover:after:w-full inline-flex text-font-caption text-sm hover:text-neonPink focus-visible:outline-neonPink">회원탈퇴 (TERMINATE)</button>
    </div>
  )
}