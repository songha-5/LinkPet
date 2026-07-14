'use client'

import { useModalStore } from "@/src/store/useModalStore"
import { useEffect } from "react"
import NotiModal from "../../_components/modal/NotiModal"

export default function LoginModal() {
  const openModal = useModalStore((state) => state.openModal)
  const closeModal = useModalStore((state) => state.closeModal)

  // 포트폴리오 안내 모달
  useEffect(() => { 
    openModal(
      <NotiModal
        onClick={closeModal}
        userId="test1@test.com"
        userPassword="password1"
        adminId="admin@test.com"
        adminPassword="admin1"
      />
    )
    return () => closeModal()
  }, [])

  return null
}