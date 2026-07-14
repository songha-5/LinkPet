interface StateNotiProps {
  title: string
  content: string
  color?: "pink" | "green" | "yellow" | "base"
  className?: string
}

export default function StateNoti({ title, content, color = "base", className }: StateNotiProps) {
  const baseStyleOutline = "flex border-3 px-4 py-3 text-sm"
  const colorStyleOutlien = {
    pink: "border-neonPink shadow-[2px_2px_0_var(--color-neonPink-opacity)]",
    green: "border-neonGreen shadow-[2px_2px_0_var(--color-neonGreen-opacity)]",
    yellow: "border-neonYellow shadow-[2px_2px_0_var(--color-neonYellow-opacity)]",
    base: "border-font-caption opacity-20",
  }
  const baseStyleTitle = "border-3 self-start px-2 me-4"
  const colorStyleTitle = {
    pink: "border-neonPink text-neonPink",
    green: "border-neonGreen text-neonGreen",
    yellow: "border-neoYellow text-neonYellow",
    base: "",
  }

  const styleOutlien = colorStyleOutlien[color]
  const styleTittle = colorStyleTitle[color]

  return (
    <div className={`${baseStyleOutline} ${styleOutlien} ${className}`}>
      <span className={`${baseStyleTitle} ${styleTittle}`}>{title}</span>
      <p className="flex-1">{content}</p>
    </div>
  )
}