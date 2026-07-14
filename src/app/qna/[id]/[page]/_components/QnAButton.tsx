import Link from "next/link";
import DeleteRow from "./DeleteTable";

interface QnAButtonProps {
  id: string
  page: string
  role: string
}

export default async function QnAButton({ id, page, role }: QnAButtonProps) {
  return (
    <div className="flex justify-between items-end">
      <Link href={'/user'} className="inline-block cursor-pointer transition-all hover:border-neonPink hover:text-neonPink border-5 border-font-white py-2 px-4" aria-label="컨트롤 룸으로 돌아가기">◀ 컨트롤 룸 복귀 (BACK)</Link>

      {role === "USER" && (
        <div className="flex gap-3">
          <Link href={`/qna/${id}/${page}/edit`} className="border-3 border-neonYellow text-neonYellow py-1 px-6 cursor-pointer hover:bg-neonYellow hover:text-bg transition-all inline-block">수정</Link>
          <DeleteRow id={id} page={page} />
        </div>
      )}
    </div>
  )
}