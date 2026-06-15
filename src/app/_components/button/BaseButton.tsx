import Link from "next/link"

interface buttonProps{
  color?: "white" | "yellow" | "pink" | "green"
  content: string
  type?: "button" | "submit"
  outline?: boolean
  className?: string
  link?: boolean
  href?: string
  onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void
}


export default function BaseButton({ color = "green", content = "", type = "button", outline = false, className = "", link = false, href = "", onClick }: buttonProps) {
  const baseStyles = "outline-none w-full h-16 text-2xl text-font tracking-[-2px] border-4 transition-all hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
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
        <button onClick={onClick} type={type} className={`${baseStyles} ${buttonStyles} ${className}`}>
          {content}
        </button>
      )}
    </>
  )
}