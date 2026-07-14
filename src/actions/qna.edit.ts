"use server"

import { QnAEditFormData, QnAEditSchema } from "../app/_lib/qna";
import { getErrorMessage } from "../utils/errorMapper";
import { createClient } from "../utils/supabase/server";
import { revalidatePath } from "next/cache";
import { getUser } from "../app/_lib/getUser";

export async function qnaEditAction(data:QnAEditFormData) {
  // 유효성 검사
  const parsed = QnAEditSchema.safeParse(data)

  if (!parsed.success) {
    console.log("유효성 검사를 실패했습니다.")
    return { success: false, message: "유효성 검사 실패"}
  }

  // supabase로 데이터 호출
  const supabase = await createClient()
  const user = await getUser()

  const { title, content } = parsed.data

  // 글 수정
  const { error: idError } = await supabase.from('posts').update({
    title,
    body: content,
  })
    .eq('user_id', user.id)
    .eq('id', data.id)
  
  if (idError) {
    const translatedmessage = getErrorMessage(idError)
    return { success: false, message: translatedmessage}
  }
  revalidatePath(`${user.id}/${data.id}`)

  return { success: true }
}