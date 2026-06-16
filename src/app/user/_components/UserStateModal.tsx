'use client'

import { useModalStore } from "@/src/store/useModalStore"
import LogoutModal from "../../_components/modal/LogoutModal"
import DelectModal from "../../_components/modal/DelectModal"

export default function UserStateModal() {
  const openModal = useModalStore((state) => state.openModal)
  const closeModal = useModalStore((state) => state.closeModal)

  return (
    <div className="flex justify-between mt-8 border-t-2 border-font-caption border-dashed">
      <button onClick={() => openModal(<LogoutModal onClick={closeModal} />)} className="cursor-pointer mbs-4 relative transition-all after:absolute hover:after:border after:bottom-0 after:left-1/2 before:h-0.5 after:w-0 after:bg-neonPink after:duration-300 after:-translate-x-1/2 hover:after:w-full inline-flex text-font-caption text-sm hover:text-neonPink focus-visible:outline-neonPink">로그아웃 (LOGOUT)</button>
      <button onClick={() => openModal(<DelectModal onClick={closeModal} />)} className="cursor-pointer mbs-4 relative transition-all after:absolute hover:after:border after:bottom-0 after:left-1/2 before:h-0.5 after:w-0 after:bg-neonPink after:duration-300 after:-translate-x-1/2 hover:after:w-full inline-flex text-font-caption text-sm hover:text-neonPink focus-visible:outline-neonPink">회원탈퇴 (TERMINATE)</button>
    </div>
  )
}