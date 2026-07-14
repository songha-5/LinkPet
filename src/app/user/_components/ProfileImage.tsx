'use client'

import { useModalStore } from "@/src/store/useModalStore";
import Image from "next/image";
import AvataModal from "../../_components/modal/AvataModal";

interface UserProfile {
  image: string
}

export default function ProfileImage({ image }: UserProfile) {
  const openModal = useModalStore((state) => state.openModal)

  return (
    <div className="relative border-4 border-font-white w-40 h-40">
      <Image
        src={image}
        alt="유저 프로필 사진"
        fill
        className="object-cover"
      />
      <div className="relative w-full h-full">
        <button onClick={() => openModal(
            <AvataModal
              title="프로필 변경"
              content="프로필을 변경하시겠습니까?"
              buttonText="변경하기 (CHANGE)"
              color="green"
              image={image}
            />
          )}
          className="absolute -bottom-1 -right-1 block bg-neonGreen w-11 h-11 border-4 border-bg cursor-pointer hover:bg-font-white transition-all"
        >
          <svg viewBox="0 0 11 11" width="16" height="16" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <path d="M4,0h3v11h-3z M0,4h11v3h-11z"></path>
          </svg>
          <span className="sr-only">프로필 이미지 파일 선택</span>
        </button>
      </div>
    </div>
  )
}