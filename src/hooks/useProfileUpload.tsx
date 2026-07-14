'use client'

import { ChangeEvent, useState } from "react"
import { useModalStore } from "../store/useModalStore"
import { createClient } from "../utils/supabase/client"
import SimpleModal from "@/src/app/_components/modal/SimpleModal";
import { refreshUserLayout } from "../actions/refresh";

export const useProfileUpload = () => {
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const openModal = useModalStore((state) => state.openModal)

  // 프로필 파일 불러오기
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 선택한 파일 객체
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  // 프로필 파일 업로드
  const handleFileUpload = async () => {
    if (file) {
      const filePath = "avata.jpg"
      const supabase = createClient()
      const { data: { user }, error: authError } = await supabase.auth.getUser()

      setIsUploading(true)
      if (authError || !user) {
        return (
          openModal(
            <SimpleModal
              title="에러발생!"
              content="에러가 발생했습니다. 다시시도해주세요"
              color="pink"
              buttonText="확인 (CONFIRM)"
            />
          )
        )
      }

      const basePath = `users/${user.id}/${filePath}`
      // 기존 파일 삭제
      await supabase.storage
        .from('linkpet')
        .remove([basePath])
      
      // 새파일 올리기
      const response = await supabase.storage
        .from('linkpet')
        .upload(basePath, file, {
          cacheControl: '0',  // 캐시 무효화
        })

      // 에러
      if (response.error) {
        console.error("업로드 실패:", response.error)
        return
      }

      // 이미지 공개주소 연결
      // getPublickUrl로 해당 이미지 정확한 링크 지정
      const { data: urlData } = supabase.storage
        .from('linkpet')
        .getPublicUrl(basePath)
      
      // urlData에서 객체안에서 publicUrl을 꺼냄(주소)
      const basePublicUrl = urlData.publicUrl
      const publicUrl = `${basePublicUrl}?t=${new Date().getTime()}`

      // 유저테이블에 profile_image에 주소 추가
      const { error: dbError } = await supabase
        .from('users')
        .update({ profile_image: publicUrl })
        .eq('id', user.id)
      
      if (dbError) {
        console.log("DB 프로필 이미지 연결 실패", dbError)
        return (
          openModal(
            <SimpleModal
              title="실패했습니다!"
              content="다시 시도해주세요"
              color="pink"
              buttonText="확인 (CONFIRM)"
            />
          )
        )
      }

      // user페이지 캐시 삭제
      await refreshUserLayout('/user')

      setIsUploading(false)

      openModal(
        <SimpleModal
          title="변경완료!"
          content="이미지 변경을 완료했습니다."
          color="green"
          buttonText="확인 (CONFIRM)"
        />
      )
    } else {
      alert('파일을 선택하세요')
    }
  }

  return { file, isUploading, handleFileChange, handleFileUpload }
}