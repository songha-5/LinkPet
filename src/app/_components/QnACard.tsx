import { formatDate } from "@/src/utils/formatDate";
import Tag from "./Tag";
import Link from "next/link";

interface QnACardProps {
  id: number | string
  user_id: string
  title: string
  tags?: string[]
  isAnwers?: boolean
  update: string
}

export default function QnACard({ id, user_id, title, tags, isAnwers = false, update }: QnACardProps) {
  const anwersChack = isAnwers ? "[VET_RESOLVED] 답변완료" : "[VET_PENDING] 답변대기"
  const anwersColor = isAnwers ? "green" : "pink"

  return (
    <Link href={`qna/${user_id}/${id}`} key={id} className="transition-all cursor-pointer hover:border-white focus-visible:outline-neonPink text-left border-font-caption border-3 flex flex-col p-6 bg-bg-gray-200">
      {/* QnA 타이틀 */}
      <div className="flex">
        <h3 className="flex-1 me-8 text-2xl">{title}</h3>
        <Tag content={anwersChack} color={anwersColor} className="self-start py-1! px-2!"/>
      </div>

      {/* QnA 정보 */}
      <div className="flex justify-between align-middle mbs-4 border-t-2 border-dashed border-bg-gray-100">
        <div className="flex flex-wrap gap-3 pbs-2.5 flex-1">
          {tags && (
            <>
              {tags.map((item, i) => (
                <span className="text-neonYellow" key={i} >#{item}</span>
              ))}
            </>
          )}
        </div>
        <small className="pbs-3 ms-4 text-font-subText">LOG_DATE: {formatDate(update)}</small>
      </div>
    </Link>
  )
}