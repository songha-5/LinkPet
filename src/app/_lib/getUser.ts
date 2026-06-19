import { createClient } from "@/src/utils/supabase/server"

export const getUser = async () => {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (!user || authError) {
    console.log("세션이 만료됬습니다.")
    throw new Error("로그인이 필요합니다.")
  }

  return user
}