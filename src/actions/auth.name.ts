"use server"

import { NameChangeFormData, NameChangeSchma } from "../app/_lib/auth";
import { createClient } from "../utils/supabase/server";
import { getErrorMessage } from "../utils/errorMapper";
import { revalidatePath } from "next/cache";
import { getUser } from "../app/_lib/getUser";

export async function nameChange(data: NameChangeFormData) {
  // 유효성 검사
  const parsed = NameChangeSchma.safeParse(data)

  if (!parsed.success) {
    console.log("에러가 일어났습니다!", parsed.error.message)
    return { success: false, message: "유효성 검사를 실패했습니다."}
  }

  const supabase = await createClient()

  // 현재 로그인한 유저의 정보(ID) 추출
  const user = await getUser()
  
  const { name } = parsed.data

  if (!user) {
    return { success: false, message: "로그인이 필요합니다." }
  }

  const { error } = await supabase.from('users').update({
    username: name
  }).eq('id', user.id)

  if (error) {
    const translatedmessage = getErrorMessage(error)
    return { success: false, message: translatedmessage }
  }

  revalidatePath('/user');

  return { success: true }
}