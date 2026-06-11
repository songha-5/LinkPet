'use client'

import { getURL } from "../utils/getURL"
import { createClient } from "../utils/supabase/client"

export async function Kakao() {
  
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'kakao',
    options: {
      redirectTo: `${getURL()}api/auth/callback`
    }
  })

  if (error) {
    console.log('카카오 회원가입 에러', error.message)
    return
  }
}