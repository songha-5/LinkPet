import { useFormContext } from "react-hook-form";
import ImageButton from "../../_components/button/ImageButton";
import { useState } from "react";

interface CheckupAiProps {
  onAnalyzing: (isAnalyzing: boolean) => void
}

export default function CheckupAi({ onAnalyzing }: CheckupAiProps) {
  const { setValue, watch, setError, formState: { errors } } = useFormContext()
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const aiResult = watch("aiResult")

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true)
    onAnalyzing(true) 

    try {
      // 폼 데이터를 받을 박스 생성
      const formData = new FormData()
      formData.append('image', file)
      const response = await fetch('/api/vision', {
        method: "POST",
        body: formData
      })

      // 에러 캐치 후 전달
      if(!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "서버 에러가 발생하였습니다.")
      }

      const result = await response.json()

      // 부모의 RHF에게 최종 데이터 전달
      setValue("aiResult", result.message, { shouldValidate: true })
    } catch (error: unknown) {
      console.error('AI 검사 실패')

      // 표기될 에러메세지 전달
      if(error instanceof Error) {
        setError("aiResult", {
          type: "server",
          message: error.message
        })
      } else {
        setError("aiResult", {
          type: "server",
          message: "알 수 없는 에러가 발생하였습니다."
        })
      }
    } finally {
      setIsAnalyzing(false)
      onAnalyzing(false)
    }
  }

  return (
    <div>
      <h2 className="text-center text-2xl text-font-white text-shadow-[3px_3px_0_var(--color-neonPink)]">CHECK_AI_PET //<br />반려동물의 건강상태를 AI를 통해 알아보세요!</h2>

      <ImageButton className="mbs-10" onFileSelect={handleImageUpload} />

      <p className="text-center mbs-4 border-3 border-gray-default border-dashed bg-bg-gray-100 px-4 py-2">이미지를 올리시면 <span className="text-neonPink">AI가</span> 우리 반려동물의 건강상태를 검사해줘요!</p>

      <div className="text-center mbs-4 min-h-12.5">
        {isAnalyzing ? (
          <p className="text-neonPink animate-pulse">AI_ANALYZING... (데이터 분석 중)</p>
        ) : errors.aiResult ? (
          // 에러가 발생 
          <p className="text-red-500">
            [분석 실패] <strong>{errors.aiResult.message?.toString()}</strong>
          </p>
        ) : aiResult ? (
          // 성공
          <p className="text-neonGreen">
            [분석 완료] AI 소견: <strong>{aiResult}</strong>
          </p>
        ) : null}
      </div>
    </div>
  )
}