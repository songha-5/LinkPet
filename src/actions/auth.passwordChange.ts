"use server"

import { PasswordChangeFormData, PasswordChangeSchma } from "../app/_lib/auth";
import { getErrorMessage } from "../utils/errorMapper";
import { createClient } from "../utils/supabase/server";

export async function passwordChange(data: PasswordChangeFormData) {
  // 유효성검사
  const parsed = PasswordChangeSchma.safeParse(data)

  if (!parsed.success) {
    console.log('에러가 일어났습니다!', parsed.error.message)
    return { success: false, message: "유효성 검사를 실패했습니다." }
  }

  const supabase = await createClient()

  const { password } = parsed.data

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    const translatedmessage = getErrorMessage(error)
    return { success: false, message: translatedmessage }
  }

  return { success: true }
}