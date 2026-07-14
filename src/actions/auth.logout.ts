'use server'

import { createClient } from "../utils/supabase/server";
import { getErrorMessage } from "../utils/errorMapper";

export async function logoutAction() {
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.log("로그아웃에 실패하였습니다.", error.message)
    const translatedmessage = getErrorMessage(error)
    return { success: false, message: translatedmessage }
  }

  return { success: true }
}