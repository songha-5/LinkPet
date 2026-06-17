import Link from "next/link"
import { ReactNode } from "react"

interface buttonProps{
  color?: "white" | "yellow" | "pink" | "green"
  content: string | ReactNode
  type?: "button" | "submit"
  outline?: boolean
  className?: string
  link?: boolean
  href?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  disabled?: boolean
}


export default function BaseButton({ color = "green", content = "", type = "button", outline = false, className = "", link = false, href = "", onClick, disabled = false }: buttonProps) {
  const baseStyles = "outline-none w-full h-16 text-2xl text-font tracking-[-2px] border-4 transition-all hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer flex justify-center items-center"
  const disabledStyle = "cursor-not-allowed! hover:translate-x-0! hover:translate-y-0! focus-visible:border-gray-default bg-gray-default border-gray-default shadow-[4px_4px_0_var(--color-font-white-shadow)] hover:text-bg-bg text-bg-bg hover:bg-gray-default hover:shadow-[4px_4px_0_var(--color-font-white-shadow)]"
  const colorStyles = {
    green: {
      outline: "focus-visible:border-neonPink border-neonGreen shadow-[4px_4px_0_var(--color-neonGreen-opacity)] text-neonGreen hover:text-font hover:bg-neonGreen hover:shadow-[2px_2px_0_var(--color-neonGreen-opacity)]",
      fill: "focus-visible:border-neonPink bg-neonGreen border-neonGreen shadow-[4px_4px_0_var(--color-neonGreen-opacity)] hover:text-neonGreen hover:bg-bg hover:shadow-[2px_2px_0_var(--color-neonGreen-opacity)]"
    },
    yellow: {
      outline: "focus-visible:border-neonPink border-neonYellow shadow-[4px_4px_0_var(--color-neonYellow-opacity)] text-neonYellow hover:text-font hover:bg-neonYellow hover:shadow-[2px_2px_0_var(--color-neonYellow-opacity)]",
      fill: "focus-visible:border-neonPink bg-neonYellow border-neonYellow shadow-[4px_4px_0_var(--color-neonYellow-opacity)] hover:text-neonYellow hover:bg-bg hover:shadow-[2px_2px_0_var(--color-neonYellow-opacity)]"
    },
    pink: {
      outline: "focus-visible:border-font-white border-neonPink shadow-[4px_4px_0_var(--color-neonPink-opacity)] text-neonPink hover:text-font hover:bg-neonPink hover:shadow-[2px_2px_0_var(--color-neonPink-opacity)]",
      fill: "focus-visible:border-font-white bg-neonPink border-neonPink shadow-[4px_4px_0_var(--color-neonPink-opacity)] hover:text-neonPink hover:bg-bg hover:shadow-[2px_2px_0_var(--color-neonPink-opacity)]"
    },
    white: {
      outline: "focus-visible:border-neonPink border-font-white shadow-[4px_4px_0_var(--color-font-white-shadow)] text-font-white hover:text-font hover:bg-font-white hover:shadow-[2px_2px_0_var(--color-font-white-shadow)]",
      fill: "focus-visible:border-neonPink bg-font-white border-font-white shadow-[4px_4px_0_var(--color-font-white-shadow)] hover:text-font-white hover:bg-bg hover:shadow-[2px_2px_0_var(--color-font-white-shadow)]"
    }
  }

  const variantMode = outline ? 'outline' : "fill"
  const buttonStyles = colorStyles[color][variantMode]

  return (
    <>
      {link ? (
        <Link href={href} className={`${baseStyles} ${buttonStyles} ${className} block text-center content-center`}>
          {content}
        </Link >  
      ) : (
        <button onClick={onClick} type={type} className={`${baseStyles} ${disabled ? disabledStyle : buttonStyles} ${className}`} disabled={disabled}>
          {content}
        </button>
      )}
    </>
  )
}