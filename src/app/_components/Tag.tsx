interface TagProps {
  className?: string
  content: string
  color?: "pink" | "yellow" | "green" | "white"
}

export default function Tag({ className, content, color = 'pink' }: TagProps) {
  const basicStyle = `px-3 py-2 border-3`
  const colorStyle = {
    pink: "border-neonYellow text-neonYellow",
    yellow: "border-neonYellow text-neonYellow",
    green: "border-neonGreen text-neonGreen",
    white: "border-font-white text-font-white"
  }

  const style = colorStyle[color]


  return (
    <span className={`${basicStyle} ${style} ${className}`} aria-label={`해시태그 ${content}, 위험등급 ${color}`}>#{content}</span>
  )
}