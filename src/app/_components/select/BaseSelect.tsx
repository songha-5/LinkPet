import { LucideChevronDown } from "lucide-react";

interface BaseSelectProps {
  title: string
  placeholder: string
}

export default function BaseSelect({ title, placeholder }: BaseSelectProps) {
  return (
    <>
      <label htmlFor="select" className="block text-neonGreen pbe-1">{title}</label>
      <div className="relative">
        <select id="select" className="cursor-pointer transition-all bg-bg w-full border-5 p-1 px-4 shadow-[4px_4px_0_var(--color-font-white-shadow)] text-lg h-15 focus:border-neonPink focus:shadow-[3px_3px_0_var(--color-neonPink)] focus-within:outline-none appearance-none pe-12" defaultValue={-1} >
          <option value={-1} disabled selected>{placeholder}</option>
          <option value={0}>1 세 미만(UNDER_1_YEAR)</option>
          <option value={1}>1 세 (1_YEAR_OLD)</option>
          <option value={2}>2 세 (2_YEAR_OLD)</option>
          <option value={3}>3 세 (3_YEAR_OLD)</option>
          <option value={4}>4 세 (4_YEAR_OLD)</option>
          <option value={5}>5 세 (5_YEAR_OLD)</option>
          <option value={6}>7 세 (6_YEAR_OLD)</option>
          <option value={7}>7 세 이상(OVER_YEAR_OLD)</option>
        </select>

        <div className="absolute top-1/2 -translate-y-1/2 right-4 pointer-events-none">
          <LucideChevronDown />
        </div>
      </div>
    </>
  )
}