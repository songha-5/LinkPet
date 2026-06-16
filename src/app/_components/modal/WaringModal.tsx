import { ReactNode } from "react";
import BaseButton from "../../_components/button/BaseButton";

interface LogoutModalProps {
  title?: string
  content?: string | ReactNode
  color: "pink" | "yellow" | "green" | "white"
  buttonText: string
  onClick: () => void
}

export default function WaringModal({ title, content, color, buttonText, onClick }: LogoutModalProps) {
  return (
    <>
      <strong className="block text-center text-neonGreen text-2xl">{title}</strong>
      <p className="text-font-white mbs-3 pb-4 text-center">{content}</p>

      <div className="flex gap-2 pbs-4">
        <BaseButton onClick={onClick} content={buttonText} color={color} className="text-[18px] h-14!" />
      </div>
    </>
  )
}