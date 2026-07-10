import BaseButton from "../button/BaseButton";

interface FallbackProps {
  resetErrorBoundary: () => void
}

export default function FetchErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="text-center border-3 border-dashed border-gray-default p-10 mbs-4">
      <p className="text-lg mbe-6">데이터를 불러오는데 실패했습니다.<br />다시 시도해주세요.</p>
      <BaseButton className="h-14 text-[18px]" content="재시도 하기" color="white" outline onClick={() => resetErrorBoundary()} />
    </div>
  )
}