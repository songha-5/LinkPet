import { userChecked } from "@/src/app/_lib/userChecked";
import { createClient } from "@/src/utils/supabase/server";
import Link from "next/link";
import DeleteRow from "./DeleteTable";

interface QnAButtonProps {
  id: string
  page: string
}

export default async function QnAButton({ id, page }: QnAButtonProps) {
  const supabase = await createClient()

  const user = await userChecked()
  const { data: roleData, error } = await supabase.from('users')
    .select('role')
    .eq('id', user.id)
    .single()
  
  if (roleData === null || error) {
    console.log("데이터 호출을 실패했습니다.", error)
    return 
  }

  return (
    <div className="flex justify-between items-end">
      <Link href={'/user'} className="inline-block cursor-pointer transition-all hover:border-neonPink hover:text-neonPink border-5 border-font-white py-2 px-4" aria-label="컨트롤 룸으로 돌아가기">◀ 컨트롤 룸 복귀 (BACK)</Link>

      {roleData.role === "USER" && (
        <div className="flex gap-3">
          <Link href={`/qna/${id}/${page}/edit`} className="border-3 border-neonYellow text-neonYellow py-1 px-6 cursor-pointer hover:bg-neonYellow hover:text-bg transition-all inline-block">수정</Link>
          <DeleteRow id={id} page={page} />
        </div>
      )}
    </div>
  )
}