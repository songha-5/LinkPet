import { createClient } from "@/src/utils/supabase/server"
import { redirect } from "next/navigation"

export const getUser = async () => {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError) {
    console.log("세션이 만료됬습니다.")
    throw new Error("로그인이 필요합니다.")
  }

  if (!user) {
    console.log("세션이 만료됬습니다.")
    redirect('/')
  }

  return user
} 