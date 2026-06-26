"use server"

import { revalidatePath } from "next/cache";
import { PasswordUserChangeFormData, PasswordUserChangeSchma } from "../app/_lib/auth";
import { getErrorMessage } from "../utils/errorMapper";
import { createClient } from "../utils/supabase/server";
import { getUser } from "../app/_lib/getUser";

export async function passwordUserChange(data: PasswordUserChangeFormData) {  
  // 유효성 검사
  const parsed = PasswordUserChangeSchma.safeParse(data)

  if (!parsed.success) {
    console.log("에러가 일어났습니다!", parsed.error.message)
    return { success: false, message: "유효성 검사를 실패했습니다."}
  }

  const supabase = await createClient()
  // 현재 로그인한 유저의 정보(ID) 추출
  const user = await getUser()

  if (!user.email) {
    return { success: false, message: "이메일 정보가 없는 계정입니다."}
  }

  const { password, userPassword } = parsed.data
  // 기존 비밀번호로 로그인
  const { error: passwordError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: userPassword
  })

  if (passwordError) {
    const translatedmessage = getErrorMessage(passwordError)
    return { success: false, message: translatedmessage }
  }

  // 바뀐 비밀번호로 업데이트
  const { error } = await supabase.auth.updateUser({
    password: password
  })


  if (error) {
    const translatedmessage = getErrorMessage(error)
    return { success: false, message: translatedmessage }
  }

  revalidatePath('/user');
  
  return { success: true }
}