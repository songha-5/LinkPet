import Tag from "@/src/app/_components/Tag";
import { ALL_CHECKUP_ITEMS } from "@/src/app/checkup/type/checkupType";
import PostDetail from "@/src/utils/PostDetail";
import { createClient } from "@/src/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { Fragment } from "react";

interface petDataProps {
  id: string
  name: string
  age: string
  gender: string
  weight: number
  type: string
}

interface statusDataProps {
  symptoms: Record<string, string | string[]>
  ai_analysis: string
  point: number
}

interface QuestionProp {
  id: string
  page: string
  user: User
  petData: petDataProps
  statusData: statusDataProps
}

export default async function Question({ id, page, user, petData, statusData }: QuestionProp) {

  // 데이터 호출
  // 유저가 존재하는지 확인
  const supabase = await createClient()
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('username')
    .eq('id', user.id)
    .single()
  if (userData === null) {
    console.log('유저 정보를 불러오지 못했습니다.', userError.message)
    throw new Error("유저 정보를 불러오지 못했습니다.")
  }
  
  const { data, error } = await supabase.from('posts').select('title, body, created_at').eq('user_id', id).eq('id', page).single()
  if (error || data === null) {
    console.log('유저 QnA글을 불러오지 못했습니다.', error.message)
    throw new Error("유버 QnA글을 불러오지 못했습니다.")
  }

  // 날짜 변경
  const createDay = new Date (user.created_at)
  const year = createDay.getFullYear()
  const month = (createDay.getMonth() + 1).toString().padStart(2, '0')
  const day = createDay.getDate().toString().padStart(2, '0')

  const petType = petData.type === "dog" ? "강아지" : "고양이"

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
          <p className="text-lg">대상 개체: <span className="text-neonYellow">{petData.name}</span> ({petType} / {petData.age}세 / {petData.weight}kg)</p>

          <div className="flex flex-row flex-wrap gap-2 mbs-2">
            {Object.entries(statusData.symptoms || {}).map(([key, value]) => {
              // 배열 + 원시타입을 배열화
              const safeValues = Array.isArray(value) ? value : [value]
              return (
                <Fragment key={key}>
                  {safeValues.filter((items) => items !== "on").map((item, index) => {
                    // -10점만 경고 컬러로 변경
                    const foundItem = ALL_CHECKUP_ITEMS.find((check) => check.option === item)
                    const isDanger = foundItem?.score === -10

                    return (
                      <Tag key={index} content={item} tag className="py-1! border-2! text-[12px]!" color={isDanger ? "pink" : "yellow"}/>
                    )
                  })}
                </Fragment>
              )
            })}
          </div>
        </div>

        {/* 에디터 자리 */}
        <PostDetail data={data.body} />
      </div>
    </section>
  )
}