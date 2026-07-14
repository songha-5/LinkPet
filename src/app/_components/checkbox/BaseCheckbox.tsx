import { forwardRef, InputHTMLAttributes } from "react"
import { useFormContext } from "react-hook-form"

interface CheckboxOptionProps {
  id: string
  label: string
  option: string
}

interface BaseCheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  value: CheckboxOptionProps[]
  none?: boolean
  noneContent?: string
}

const BaseCheckbox = forwardRef<HTMLInputElement, BaseCheckboxProps>(({ value, none, noneContent, ...props }, ref) => {
  const { watch, setValue } = useFormContext()

  // register 이름표 확인
  const fieldName = props.name as string

  // 체크된 배열 가져오기
  const checkboxValue = watch(fieldName) || []

  // 체크 로직 (다중선택 & 하나선택)
  const handleClick = (clickValue: string) => {
    if (!fieldName) return

    if(clickValue === "none") {
      // 해당없음
      setValue(fieldName, ['none'], { shouldValidate: true })
    } else {
      if (checkboxValue.includes(clickValue)) {
        // 이미 체크된 값
        const unClickedList = checkboxValue.filter((item: string) => item !== clickValue)
        setValue(fieldName, unClickedList, { shouldValidate: true })
      } else {
        // 새로운 값 - none 지우고 추가하기
        const cleanList = checkboxValue.filter((item: string) => item !== "none")
        setValue(fieldName, [...cleanList, clickValue], { shouldValidate: true })
      }
    }
  }

  const { ...restProps } = props

  return (
    <div className="flex flex-col gap-3">
      {value.map((option) => (
        <div key={option.id}>
          <input ref={ref} {...restProps} onChange={() => handleClick(option.id)} checked={checkboxValue.includes(option.id)} value={option.option} id={`select-option-${option.id}`} type="checkbox" className="appearance-none peer sr-only"/>
          <label htmlFor={`select-option-${option.id}`} className="ps-4 border-5 flex h-14 items-center shadow-[4px_4px_0_var(--color-font-white-shadow)] hover:text-neonPink hover:border-neonPink hover:shadow-[4px_4px_0_var(--color-neonPink)] peer-checked:text-neonGreen peer-checked:shadow-[4px_4px_0_var(--color-neonGreen)] peer-checked:[&_span]:inline-block cursor-pointer peer-checked:hover:text-neonGreen peer-checked:hover:text-neon-green peer-checked:hover:border-neonGreen peer-checked:hover:shadow-[4px_4px_0_var(--color-neonGreen)] peer-focus-visible:border-neonPink">
            <span className="hidden me-1 animate-opacityBlink">▶</span>
            <span>{option.label}</span>
          </label>
        </div>
      ))}


      {none && (
        <div>
          <input ref={ref} {...restProps} onChange={() => handleClick('none')}
          checked={checkboxValue.includes('none')} id="select-none" type="checkbox" className="appearance-none peer sr-only"/>
          <label htmlFor="select-none" className="ps-4 border-5 flex h-14 items-center shadow-[4px_4px_0_var(--color-font-white-shadow)] hover:text-neonPink hover:border-neonPink hover:shadow-[4px_4px_0_var(--color-neonPink)] peer-checked:text-neonGreen peer-checked:shadow-[4px_4px_0_var(--color-neonGreen)] peer-checked:[&_span]:inline-block cursor-pointer peer-checked:hover:text-neonGreen peer-checked:hover:text-neon-green peer-checked:hover:border-neonGreen peer-checked:hover:shadow-[4px_4px_0_var(--color-neonGreen)] peer-focus-visible:border-neonPink">
            <span className="hidden me-1 animate-opacityBlink">▶</span>
            <span>{noneContent}</span>
          </label>
        </div>
      )}
    </div>
  )
})

BaseCheckbox.displayName = 'BaseCheckbox'
export default BaseCheckbox