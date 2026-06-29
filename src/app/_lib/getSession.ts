import { createClient } from "@/src/utils/supabase/server"
import { redirect } from "next/navigation"

export const getSession = async () => {
  const supabase = await createClient()
  const { data: { session }, error: sessionError } = await supabase.auth.getSession()
  const user = session?.user
  
  if (sessionError) {
    console.log("세션이 만료됬습니다.")
    throw new Error("로그인이 필요합니다.")
  }

  if (!session) {
    console.log("세션이 만료됬습니다.")
    redirect('/')
  }

  return user
} 