'use server'

import { revalidatePath } from "next/cache"
import { createClient } from "../utils/supabase/server"
import { supabaseConfig } from "../utils/supabase/config"
import { createClientAdmin } from "../utils/supabase/admin"
import { userChecked } from "../app/_lib/userChecked"

export async function delectUserAction() {
  const supabase = await createClient()
  
  // 로그인 되어있는지 확인
  const user = await userChecked()

  const bucketName = supabaseConfig.bucketName 
  await supabase.storage
    .from(bucketName)
    .remove([`${user.id}/avatar.jpg`])
  
  // 테이블 소프트 삭제
  const { error: dbError } = await supabase
    .from("users")
    .update({
      username: "탈퇴한 사용자",
      email: `deleted-${user.id}-${user.email}`,
      deleted_at: new Date().toISOString()
    })
    .eq("id", user.id)
  
  if (dbError) {
    return { success: false, message: "데이터베이스 갱신에 실패했습니다." }
  }

  const supabaseAdmin = await createClientAdmin()
  const { error: authDeleteError } = await supabaseAdmin.auth.admin.deleteUser(user.id)

  if (authDeleteError) {
    console.error("어드민 인증 삭제 오류:", authDeleteError.message)
    return { success: false, message: "인증 계정 삭제 중 오류가 발생했습니다." }
  }
  
  revalidatePath('/user', 'layout')

  return { success: true }
}