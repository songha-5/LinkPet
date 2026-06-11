'use server'

import { createClient } from "../utils/supabase/server"
import { LoginFormData, LoginSchma } from "../app/_lib/auth"

export async function loginAction(data: LoginFormData) {
  // 서버에서 zod검사를 한번 더 확인함
  // 해커가 강제로 이상한 값을 넘겼을때 통과 안시키기 위한 방어선
  const parsed = LoginSchma.safeParse(data)

  if (!parsed.success) {
    return { success: false, error: "유효하지 않은 데이터입니다."}
  }
  
  const { email, password } = parsed.data

  // supabase에서 회원가입 데이터 전송
  const supabase = await createClient()
  const { data: loginData, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.log("supabase Auth 에러", error.message)
    return { success: false, error: error.message }
  }

  return { success: true }
}