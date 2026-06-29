import Image from "next/image";

interface ImageButtonProps {
  className?: string
}

export default function ImageButton({ className }: ImageButtonProps) {
  return (
    <div className={`text-center ${className}`}>
      <button className="peer cursor-pointer border-4 border-dashed bg-bg relative w-50 h-50 border-neonPink">
        <Image src="./bg_2.svg" fill alt="" className="object-cover" />

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