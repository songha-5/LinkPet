import { useId } from "react"

interface BaseRadioProps {
  name: string
  value: string
  content: string
  className?: string
}

export default function BaseRadio({ name, value, content, className }: BaseRadioProps) {
  const id = useId()

  return (
    <div className={`flex-1 ${className}`}>
      <input className="peer sr-only" id={id} type="radio" name={name} value={value} />
      <label className="flex peer-checked:[&_span]:inline-block justify-center cursor-pointer items-center border-5 shadow-[4px_4px_0_var(--color-font-white-shadow)] border-font-white text-lg h-14 bg-bg hover:border-neonPink hover:text-neonPink hover:shadow-[4px_4px_0_var(--color-neonPink)] transition-all peer-checked:text-neonPink peer-checked:border-neonPink peer-checked:shadow-[4px_4px_0_var(--color-neonPink)]" htmlFor={id} >
        <span className="hidden me-1 animate-opacityBlink">▶</span>
        {content}
      </label>
    </div>
  )
}