"use server"

import { QnACreateFormData, QnACreateSchema } from "../app/_lib/qna";
import { getErrorMessage } from "../utils/errorMapper";
import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function qnaCreateAction(data:QnACreateFormData) {
  
  // 유효성 검사
  const parsed = QnACreateSchema.safeParse(data)

  if (!parsed.success) {
    console.log("유효성 검사를 실패했습니다.")
    return { success: false, massage: "유효성 검사 실패"}
  }

  // supabase로 데이터 호출
  const supabase = await createClient()

  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return { success: false, message: "로그인 세션이 만료됬습니다." }
  }

  const { title, content } = parsed.data

  const { data: postsData, error } = await supabase.from('posts').insert({
    title,
    body: content,
    is_answered: false,
    user_id: user.id
  })
    .eq('user_id', user.id)
    .select()
    .single()

  if (error) {
    const translatedmessage = getErrorMessage(error)
    return { success: false, message: translatedmessage }
  }

  revalidatePath(`${user.id}/${postsData.id}`)

  return { success: true }
}