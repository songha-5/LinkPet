import Image from "next/image";
import BaseButton from "../button/BaseButton";
import { useId } from "react";
import { LoaderCircle } from 'lucide-react';
import { useProfileUpload } from "@/src/hooks/useProfileUpload";

interface AvataModalProps {
  title: string
  content: string
  buttonText: string
  color: "pink" | "yellow" | "green" | "white"
  image: string
}

export default function AvataModal({ title, content, buttonText, color, image }: AvataModalProps) {
  const id = useId()
  const { file, isUploading, handleFileChange, handleFileUpload } = useProfileUpload()

  // 유저 프로필
  const newAvata = file ? URL.createObjectURL(file) : null
  const profile = newAvata || image

  return (
    <>
      <strong className="block text-center text-neonGreen text-2xl">{title}</strong>
      <div className="relative w-40 h-40 m-auto mbs-4">
        <Image
          src={profile}
          alt="유저 프로필 사진"
          fill
          className="object-cover"
        />
        <div className="relative w-full h-full border-font-white border-4">
          <label aria-label="프로필 사진 업로드" tabIndex={0} htmlFor={id} className="absolute -bottom-1 -right-1 block bg-neonGreen w-11 h-11 border-4 border-bg cursor-pointer hover:bg-font-white transition-all">
            <svg viewBox="0 0 11 11" width="16" height="16" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <path d="M4,0h3v11h-3z M0,4h11v3h-11z"></path>
            </svg>
            <span className="sr-only">프로필 이미지 파일 선택</span>
          </label>
          <input type="file" onChange={handleFileChange} id={id} accept="image/*" className="sr-only" />
        </div>
      </div>

      <p className="text-font-white mbs-3 pb-4 text-center">{content}</p>
      <div className="flex gap-2 pbs-4">
        <BaseButton onClick={handleFileUpload} content={isUploading ? (<><LoaderCircle className="animate-spin w-5 h-5 mr-3" /> 로딩 중</>) : buttonText} color={color} className="text-[18px] h-14!" disabled={!file || isUploading} />
      </div>
    </>
  )
}