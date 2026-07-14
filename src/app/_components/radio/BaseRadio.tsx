import { forwardRef, useId } from "react"

interface BaseRadioProps {
  name: string
  value: string
  content: string
  className?: string
  onClick?: () => void
  checked?: boolean
}

const BaseRadio = forwardRef<HTMLInputElement, BaseRadioProps>(({ name, value, content, className, onClick, checked, ...props }, ref) => {
  const id = useId()

  return (
    <div className={`flex-1 ${className}`} onClick={onClick}>
      <input checked={checked} ref={ref} {...props} className="peer sr-only" id={id} type="radio" name={name} value={value} />
      <label className="peer-focus-visible:border-neonPink flex peer-checked:[&_span]:inline-block justify-center cursor-pointer items-center border-5 shadow-[4px_4px_0_var(--color-font-white-shadow)] border-font-white text-lg h-14 bg-bg hover:border-neonPink hover:text-neonPink hover:shadow-[4px_4px_0_var(--color-neonPink)] transition-all peer-checked:text-neonGreen peer-checked:border-neonGreen peer-checked:shadow-[4px_4px_0_var(--color-neonGreen)] peer-checked:hover:border-neonGreen peer-checked:hover:text-neonGreen peer-checked:hover:shadow-[4px_4px_0_var(--color-neonGreen)]" htmlFor={id} >
        <span className="hidden me-1 animate-opacityBlink">▶</span>
        {content}
      </label>
    </div>
  )
})

BaseRadio.displayName = 'BaseRadio'
export default BaseRadio