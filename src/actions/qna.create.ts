"use server"

import { QnACreateFormData, QnACreateSchema } from "../app/_lib/qna";
import { getErrorMessage } from "../utils/errorMapper";
import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { getUser } from "../app/_lib/getUser";

export async function qnaCreateAction(data:QnACreateFormData) {
  // 유효성 검사
  const parsed = QnACreateSchema.safeParse(data)

  if (!parsed.success) {
    console.log("유효성 검사를 실패했습니다.")
    return { success: false, message: "유효성 검사 실패"}
  }

  // supabase로 데이터 호출
  const supabase = await createClient()
  const user = await getUser()

  const { title, content } = parsed.data
  // 글 등록
  const { data: postsData, error } = await supabase.from('posts').insert({
    title,
    body: content,
    is_answered: false,
    user_id: user.id
  })
    .select()
    .single()

  if (error) {
    const translatedmessage = getErrorMessage(error)
    return { success: false, message: translatedmessage }
  }
  revalidatePath(`${user.id}/${postsData.id}`)

  return { success: true }
}