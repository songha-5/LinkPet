"use client"

import { LucideChevronDown } from "lucide-react";
import { ChangeEvent, useId, useState } from "react";

interface BaseSelectProps {
  title: string
  placeholder: string
  options?: {
    value: string
    label: string
  }[]
  className: string
}

export default function BaseSelect({ title, placeholder, options, className }: BaseSelectProps) {
  const id = useId()
  const [value, setValue] = useState("")

  const handleSelectBox = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.target.value
    setValue(target)
  }

  return (
    <>
      <label htmlFor={id} className={`block text-neonGreen pbe-1 ${className}`}>{title}</label>
      <div className="relative">
        <select onChange={handleSelectBox} value={value} id={id} className="cursor-pointer transition-all bg-bg w-full border-5 p-1 px-4 shadow-[4px_4px_0_var(--color-font-white-shadow)] text-lg h-15 focus:border-neonPink focus:shadow-[3px_3px_0_var(--color-neonPink)] focus-within:outline-none appearance-none pe-12" >
          <option value={""} disabled>{placeholder}</option>
          {options?.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <div className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
          <LucideChevronDown />
        </div>
      </div>
    </>
  )
}