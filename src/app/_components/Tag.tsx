interface TagProps {
  className?: string
  content: string
  color?: "pink" | "yellow" | "green" | "white"
  tag?: boolean
}

export default function Tag({ className, content, color = 'pink', tag = false }: TagProps) {
  const basicStyle = `px-3 py-2 border-3 text-sm`
  const colorStyle = {
    pink: "border-neonPink text-neonPink",
    yellow: "border-neonYellow text-neonYellow",
    green: "border-neonGreen text-neonGreen",
    white: "border-font-white text-font-white"
  }

  const style = colorStyle[color]


  return (
    <span className={`${basicStyle} ${style} ${className}`} aria-label={`해시태그 ${content}, 위험등급 ${color}`}>{tag ? '#' : ''}{content}</span>
  )
}