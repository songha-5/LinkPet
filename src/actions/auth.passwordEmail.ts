"use server"

import { PasswordEmailSchma, PasswordEmailFormData } from "../app/_lib/auth";
import { getErrorMessage } from "../utils/errorMapper";
import { getURL } from "../utils/getURL";
import { createClient } from "../utils/supabase/server";

export async function passwordEmailAction(data: PasswordEmailFormData) {
  // 서버에서 zod검사를 한번 더 확인함
  // 해커가 강제로 이상한 값을 넘겼을때 통과 안시키기 위한 방어선
  const parsed = PasswordEmailSchma.safeParse(data)

  if (!parsed.success) {
    console.log('유효성 검사를 실패했습니다.', parsed.error)
    return { success: false, message: "유효성 검사를 실패했습니다."}
  }

  const supabase = await createClient()
  
  const { error } = await supabase.auth.resetPasswordForEmail(
    data.email,
    {
      redirectTo: `${getURL()}auth/password/change`
    }
  )

  if (error) {
    const translatedmessage = getErrorMessage(error)
    return { success: false, message: translatedmessage }
  }

  return { success: true }
}