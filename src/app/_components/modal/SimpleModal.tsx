import { useModalStore } from "@/src/store/useModalStore";
import BaseButton from "../button/BaseButton";

interface SimpleModalProps {
  title?: string
  content?: string
  color: "pink" | "yellow" | "green" | "white"
  buttonText: string
}

export default function SimpleModal({ title, content, color, buttonText }: SimpleModalProps) {
  const closeModal = useModalStore((state) => state.closeModal)
  
  return (
    <>
      <strong className="block text-neonYellow text-2xl text-center mbs-2">{title}</strong>
      <p className="text-font-white text-center mbs-3 mb-8">{content}</p>
      <BaseButton onClick={closeModal} content={buttonText} color={color} className="text-[18px] h-14!" outline />
    </>
  )
}