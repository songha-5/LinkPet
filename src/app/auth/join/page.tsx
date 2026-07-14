import FloatLayout from "@/src/app/_components/FloatLayout";
import JoinForm from "./_components/JoinForm";

export default function JoinPage() {
  return (
    <FloatLayout color='pink'>
      {/* 타이틀 */}
      <div className="text-center">
        <span className="animate-slowBounce text-5xl text-neonGreen text-shadow-[4px_4px_0_var(--color-neonGreen-opacity)] mbe-4 block">[ ^•ﻌ•^ ]</span>
        <h1 className="text-4xl text-shadow-[3px_3px_0_var(--color-neonPink)] tracking-wide">JOIN US</h1>
      </div>

      {/* 폼 */}
      <JoinForm />
    </FloatLayout>
  )
}