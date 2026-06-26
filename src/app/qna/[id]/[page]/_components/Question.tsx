import Tag from "@/src/app/_components/Tag";
import { getSession } from "@/src/app/_lib/getSession";
import PostDetail from "@/src/utils/PostDetail";
import { createClient } from "@/src/utils/supabase/server";

interface QuestionProp {
  id: string
  page: string
}

export default async function Question({ id, page }: QuestionProp) {

  // 데이터 호출
  // 유저가 존재하는지 확인
  const user = await getSession()
  if (!user) {
    return { success: false, message: "로그인이 필요합니다." }
  }
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('username')
    .eq('id', user.id)
    .single()
  if (userData === null) {
    console.log('유저 정보를 불러오지 못했습니다.', userError.message)
    // 404페이지
    return
  }
  
  const { data, error } = await supabase.from('posts').select('title, body, created_at').eq('user_id', id).eq('id', page).single()
  if (error || data === null) {
    console.log('유저 QnA글을 불러오지 못했습니다.', error.message)
    // 404페이지
    return
  }

  // 날짜 변경
  const createDay = new Date (user.created_at)
  const year = createDay.getFullYear()
  const month = (createDay.getMonth() + 1).toString().padStart(2, '0')
  const day = createDay.getDate().toString().padStart(2, '0')

  return (
    <section className="border-5 border-font-white p-7 bg-bg my-5">
      <div>
        <span className="block text-neonPink">USER_LOG // QUEST_NODE_07</span>
        <h2 className="text-2xl mbs-1">{data.title}</h2>
        
        <div className="flex justify-between text-[14px] text-font-subText mbs-5 pbe-2 border-b-2 border-gray-default border-dashed">
          <span>WRITER: {userData.username}</span>
          <span>LOG_DATE: {year}.{month}.{day}</span>
        </div>
      </div>

      <div className="pbs-4">
        {/* 반려동물 정보 카드 */}
        <div className="border-3 border-neonPink py-4 px-6 mbe-4">
          <strong className="text-neonPink text-sm">[🐾] TARGET_PET_MANIFEST</strong>
          <p className="text-lg">대상 개체: <span className="text-neonYellow">초코</span> (말티즈 / 3세 / 4.2kg)</p>

          <div className="flex flex-row flex-wrap gap-2 mbs-2">
            <Tag content="내용이들어가요" tag className="py-1! border-2! text-[12px]!" color="green"/>
            <Tag content="내용이들어가요" tag className="py-1! border-2! text-[12px]!" color="green"/>
            <Tag content="내용이들어가요" tag className="py-1! border-2! text-[12px]!" color="green"/>
            <Tag content="내용이들어가요" tag className="py-1! border-2! text-[12px]!" color="green"/>
            <Tag content="내용이들어가요" tag className="py-1! border-2! text-[12px]!" color="green"/>
          </div>
        </div>

        {/* 에디터 자리 */}
        <PostDetail data={data.body} />
      </div>
    </section>
  )
}