'use client'

import { getErrorMessage } from "../utils/errorMapper"
import { getURL } from "../utils/getURL"
import { createClient } from "../utils/supabase/client"

export async function Kakao() {
  
  const supabase = createClient()
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${getURL()}api/auth/callback`
    }
  })

  if (error) {
    const translatedmessage = getErrorMessage(error)
    return { success: false, message: translatedmessage }
  }
}