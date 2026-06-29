import { useState } from "react"

interface CheckboxOptionProps {
  id: string
  label: string
  option: string
}

interface BaseCheckboxProps {
  value: CheckboxOptionProps[]
  name: string
  none?: boolean
  noneContent?: string
}

export default function BaseCheckbox({ value, name, none, noneContent }: BaseCheckboxProps) {
  const [checkboxValue, setCheckboxValue] = useState<string[]>([])

  const handleClick = (clickValue: string) => {
    // 해당없음 추가
    if(clickValue === "none") {
      setCheckboxValue(['none'])
    } else {
      // 일방항목 클릭시
      // 이미 체크된 값일 경우 
      if (checkboxValue.includes(clickValue)) {
        const unClickedList = checkboxValue.filter((items) => items !== clickValue)
        setCheckboxValue(unClickedList)
      } else {
        // 새로운 값 추가 (값없음 제외 후 값추가)
        const cleanList = checkboxValue.filter((item) => item !== "none")
        setCheckboxValue([...cleanList, clickValue])
      }
    }
  }


  return (
    <div className="flex flex-col gap-3">
      {value.map((option) => (
        <div key={option.id}>
          <input onChange={() => handleClick(option.id)} checked={checkboxValue.includes(option.id)} value={option.option} id={`select-option-${option.id}`} name={name} type="checkbox" className="appearance-none peer sr-only"/>
          <label htmlFor={`select-option-${option.id}`} className="ps-4 border-5 flex h-14 items-center shadow-[4px_4px_0_var(--color-font-white-shadow)] hover:text-neonPink hover:border-neonPink hover:shadow-[4px_4px_0_var(--color-neonPink)] peer-checked:text-neonGreen peer-checked:shadow-[4px_4px_0_var(--color-neonGreen)] peer-checked:[&_span]:inline-block cursor-pointer peer-checked:hover:text-neonGreen peer-checked:hover:text-neon-green peer-checked:hover:border-neonGreen peer-checked:hover:shadow-[4px_4px_0_var(--color-neonGreen)]">
            <span className="hidden me-1 animate-opacityBlink">▶</span>
            <span>{option.label}</span>
          </label>
        </div>
      ))}


      {none && (
        <div>
          <input onChange={() => handleClick('none')} checked={checkboxValue.includes('none')} id="select-none" name="체크박스" type="checkbox" className="appearance-none peer sr-only"/>
          <label htmlFor="select-none" className="ps-4 border-5 flex h-14 items-center shadow-[4px_4px_0_var(--color-font-white-shadow)] hover:text-neonPink hover:border-neonPink hover:shadow-[4px_4px_0_var(--color-neonPink)] peer-checked:text-neonGreen peer-checked:shadow-[4px_4px_0_var(--color-neonGreen)] peer-checked:[&_span]:inline-block cursor-pointer peer-checked:hover:text-neonGreen peer-checked:hover:text-neon-green peer-checked:hover:border-neonGreen peer-checked:hover:shadow-[4px_4px_0_var(--color-neonGreen)]">
            <span className="hidden me-1 animate-opacityBlink">▶</span>
            <span>{noneContent}</span>
          </label>
        </div>
      )}
    </div>
  )
}