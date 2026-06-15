'use client'

import { ComponentProps, forwardRef, useId, useState } from "react"

interface InputProps extends ComponentProps<'input'> {
  title?: string
  errorMsg?: string
  className?: string
  password?: boolean
}

const BaseInput = forwardRef<HTMLInputElement, InputProps>(
  ({ title, errorMsg, className, password, ...props }, ref) => {
    const id = useId()
    const [onToggle, setOnToggle] = useState(false)

    const errorId = `${id}-error`

    const onChangeEye = () => {
      setOnToggle((prev) => !prev)
    }

    return (
      <div className={className}>
        <label htmlFor={id} className="block" >
          {/* 타이틀 */}
          {title && (
            <strong className="block text-xl text-neonGreen mbe-1" >{title}</strong>
          )}
          <div className="relative">
            {/* input */}
            <input
              type={password ? (onToggle ? "text" : "password") : props.type || "text"}
              id={id}
              ref={ref}
              {...props}
              className="transition-all border-5 w-full px-5 py-3 placeholder:text-lg placeholder:text-font-subText focus-visible:border-neonPink shadow-[4px_4px_0_var(--color-font-white-shadow)] focus:shadow-[4px_4px_0_var(--color-neonPink)] outline-none"
              aria-invalid={errorMsg ? "true" : "false"}
              aria-describedby={errorMsg ? errorId : undefined}
            />

            {/* 비밀번호 보기 / 안보기 */}
            {password && (
              <button type="button" onClick={onChangeEye} className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer" aria-label={onToggle ? "비밀번호 숨기기" : "비밀번호 보기"}>
                {onToggle ? 
                  <svg className="w-7 h-5 fill-font-white" viewBox="0 0 16 12">
                    <path d="M4,2h8v2h-8z M2,4h2v4h-2z M12,4h2v4h-2z M4,8h8v2h-8z M6,5h4v2h-4z"></path>
                  </svg>
                  :
                  <svg className="w-7 h-5 fill-font-white" viewBox="0 0 16 12">
                    <path d="M4,2h8v2h-8z M2,4h2v4h-2z M12,4h2v4h-2z M4,8h8v2h-8z" fill="#555"></path>
                    <path d="M1,0h2v2h-2z M3,2h2v2h-2z M5,4h2v2h-2z M7,6h2v2h-2z M9,8h2v2h-2z M11,10h2v2h-2z" fill="var(--neon-pink)"></path>
                  </svg>
                }
              </button>
            )}
          </div>
          {/* 에러문구 */}
          {errorMsg && (
            <p id={errorId} aria-live="assertive" aria-invalid="false" className="text-neonPink mt-2">{errorMsg}</p>
          )}
        </label>
      </div>
    )
  } 
)

export default BaseInput
