import BaseButton from "@/src/app/_components/button/BaseButton";
import FloatLayout from "@/src/app/_components/FloatLayout";

export default function PasswordResultPage() {
  return (
    <FloatLayout color="green">
      <h1 className="sr-only">비밀번호 변경 - 메일 전송</h1>
      
      {/* 타이틀 */}
      <div className="text-center">
        <span className="animate-slowBounce text-5xl text-neonGreen text-shadow-[4px_4px_0_var(--color-neonGreen-opacity)] mbe-4 block">[ ✉️•ﻌ• ]</span>
        <h1 className="text-4xl text-shadow-[3px_3px_0_var(--color-neonGreen)] tracking-wide">SAND_MAIL!</h1>
      </div>

      <div className="border-3 border-dashed border-font-caption p-10 text-md text-font-subText mbs-8">
        <p className="text-[18px]">
          [SYSTEM] 메일 전송 프로토콜 정상 작동.<br />
          요청하신 계정의 이메일로 <strong className="text-neonGreen">비밀번호 변경 보안 링크</strong>를 안전하게 전달 완료했습니다!<br />
          <br />
          등록된 메일함의 수신함을 확인해 주시고, 만약 메일이 보이지 않는다면 <strong className="text-neonYellow">[스팸 메일]</strong>을 스캔해 보십시오.
        </p>
      </div>

      <BaseButton className="mt-9" color="pink" content="메인으로 돌아가기 (MAIN)" link href="/"/>
    </FloatLayout>
  )
}