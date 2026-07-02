import Image from "next/image";
import { useRef, useState } from "react";

interface ImageButtonProps {
  className?: string
  onFileSelect?: (file: File) => void
}

export default function ImageButton({ className, onFileSelect }: ImageButtonProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // input이 대신 실행
  const handleClick = () => {
    fileInputRef.current?.click()
  }

  // 파일이 선택되었을때 실행
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    // 유저 프로필
    const newAvata = file ? URL.createObjectURL(file) : null
    const profile = newAvata || './bg_2.svg'

    if(file && onFileSelect) {
      onFileSelect(file)
      setFileName(profile)
    }

    console.log(typeof file?.name)
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
        <Image src={fileName || `./bg_2.svg`} fill alt="" className="object-cover" />

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