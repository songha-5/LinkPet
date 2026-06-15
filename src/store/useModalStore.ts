import { create } from 'zustand'
import { ReactNode } from "react"

interface ModalState {
  isOpen: boolean
  content: ReactNode | null
  openModal: (content: ReactNode) => void
  closeModal: () => void
}

// 오픈상태 체크하여 content를 넣거나, 삭제함
// 모달 상태를 전역에서 확인하여 컨트롤
export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  content: null,
  openModal: (content) => set({
    isOpen: true,
    content: content
  }),
  closeModal: () => set({
    isOpen: false,
    content: null
  })
}))