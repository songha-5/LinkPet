import { createClient } from "@/src/utils/supabase/server"
import { redirect } from "next/navigation"

export const userChecked = async () => {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (!user) {
    console.log("세션이 만료됬습니다.")
    redirect('/')
  }
  
  if (authError) {
    console.log("세션이 만료됬습니다.")
    throw new Error("로그인이 필요합니다.")
  }

  return user
} 