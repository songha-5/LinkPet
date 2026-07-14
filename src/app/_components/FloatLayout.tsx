import React from 'react'

interface floatLayoutProps {
  children: React.ReactNode
  color?: "pink" | "yellow" | "green" | "white"
}

export default function FloatLayout({ children, color = "pink" }: floatLayoutProps) {
  // 보더 컬러
  const borderBaseStyles = "transition-all border-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-20 px-10 w-[calc(100%-80px)] md:w-xl bg-bg after:w-3 after:h-3 after:block after:absolute after:-top-3 after:-left-3"
  const borderColorsStyle = {
    pink: "border-neonPink shadow-[10px_10px_0_var(--color-neonPink)] after:bg-neonPink",
    yellow: "border-neonYellow shadow-[10px_10px_0_var(--color-neonYellow)] after:bg-neonYellow",
    green: "border-neonGreen shadow-[10px_10px_0_var(--color-neonGreen)] after:bg-neonGreen",
    white: "border-font-white shadow-[10px_10px_0_var(--color-font-white)] after:bg-font-white",
  }
  const borderStyles = borderColorsStyle[color]
 
  // 데코 컬러
  const decoBaseStyle = "absolute text-3xl"
  const decoColorsStyle = {
    pink: "text-neonPink",
    yellow: "text-neonYellow",
    green: "text-neonGreen",
    white: "text-font-white",
  }
  const decoStyles = decoColorsStyle[color]
  return (
    <main className="relative h-full p-10">
      <div className={`${borderBaseStyles} ${borderStyles}`}>
        <div className={`top-5 left-7 ${decoBaseStyle} ${decoStyles}`}>+</div>
        <div className={`bottom-5 right-7 ${decoBaseStyle} ${decoStyles}`}>+</div>
        
        {children}
      </div>
    </main>
  )
}