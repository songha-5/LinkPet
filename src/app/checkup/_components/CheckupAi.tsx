import { useFormContext } from "react-hook-form";
import ImageButton from "../../_components/button/ImageButton";
import { useState } from "react";

export default function CheckupAi() {
  const { setValue, watch } = useFormContext()

  // 로딩 스피너
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const aiResult = watch("aiResult")

  const handleImageUpload = async (file: File) => {
    setIsAnalyzing(true) 

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      const mockAiData = "정상 (건강함)" 

      setValue("aiResult", mockAiData, { shouldValidate: true })
    } catch (error) {
      console.error("AI 검사 실패", error)
      alert("AI 검사에 실패했습니다. 다시 시도해주세요.")
    } finally {
      setIsAnalyzing(false)
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
        ) : aiResult ? (
          <p className="text-neonGreen">
            [분석 완료] AI 소견: <strong>{aiResult}</strong>
          </p>
        ) : null}
      </div>
    </div>
  )
}