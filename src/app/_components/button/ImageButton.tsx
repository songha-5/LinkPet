import Image from "next/image";
import { useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface ImageButtonProps {
  className?: string
  onFileSelect?: (file: File) => void
}

export default function ImageButton({ className, onFileSelect }: ImageButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // form에 저장할 명령어
  const { watch, setValue } = useFormContext()
  
  // 이미지 Form으로 저장 / 설정되어있지않다면 기본 이미지
  const previewUrl = watch("previewUrl") || './bg_2.svg'

  // input이 대신 실행
  const handleClick = () => {
    fileInputRef.current?.click()
  }

  // 파일이 선택되었을때 실행
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    // 유저 프로필
    const newAvata = file ? URL.createObjectURL(file) : null

    if(file && onFileSelect) {
      onFileSelect(file)

      if(newAvata) {
        setValue("previewUrl", newAvata)
      }
    }

    if (e.target) e.target.value = ""
  }

  return (
    <div className={`text-center ${className}`}>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button type="button" onClick={handleClick} className="peer cursor-pointer border-4 border-dashed bg-bg relative w-50 h-50 border-neonPink">
        <Image src={previewUrl} fill alt="" className="object-cover" />

        <div className="absolute -right-1 -bottom-1 w-10 h-10 border-4 border-neonPink bg-neonPink">
          <svg viewBox="0 0 11 11" width="20" height="20" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 fill-font-white">
            <path d="M4,0h3v11h-3z M0,4h11v3h-11z"></path>
          </svg>
        </div>
        <span className="sr-only">ai검사 이미지 파일 선택</span>
      </button>
    </div>
  )
}