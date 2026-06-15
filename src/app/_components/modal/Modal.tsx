'use client'

import { useEffect, useRef } from "react"
import { useModalStore } from "@/src/store/useModalStore"

export default function Modal() {
  const { isOpen, content, closeModal } = useModalStore()
  const modalRef = useRef<HTMLDialogElement>(null)

  // 모달을 선택하여, 열거나 닫을 수 있음
  useEffect(() => {
    if(!modalRef.current) return

    if (isOpen) {
      modalRef.current.showModal()
    } else {
      modalRef.current.close()
    }
  }, [isOpen])


  return (
    <dialog
      ref={modalRef}
      onClose={closeModal}
      className="m-auto bg-transparent outline-none backdrop:bg-black/70"
    >
      <div className="flex flex-col min-w-100 transition-all border-7 p-10 bg-bg m-2 border-neonPink shadow-[10px_10px_0_var(--color-neonPink)]">
        <button type="button" onClick={closeModal} className="self-end mbe-4 text-font-subText cursor-pointer hover:text-neonPink transition-all">[CLOSE_X]</button>
        <div>
          {content}
        </div>
      </div>
    </dialog>
  )
}