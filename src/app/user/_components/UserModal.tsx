'use client'

import { useModalStore } from "@/src/store/useModalStore";
import BaseButton from "../../_components/button/BaseButton";
import PasswordModal from "../../_components/modal/PasswordModal";
import NameChangeModal from "../../_components/modal/NameChangModal";

export default function UserModal() {
  const openModal = useModalStore((state) => state.openModal)
  const closeModal = useModalStore((state) => state.closeModal)

  return (
    <div className="mt-10">
      <BaseButton onClick={() => openModal(<NameChangeModal />)} content="닉네임 변경 (UPDATE_NAME)" outline color="white" className="text-[18px] h-14!"/>
      <BaseButton onClick={() => openModal(<PasswordModal onClick={closeModal} />)} content="비밀번호 변경 (PATCH_PW)" outline color="white" className="text-[18px] h-14! mt-4"/>
    </div>
  )
}