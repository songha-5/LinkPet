import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { supabaseConfig } from './config'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(supabaseConfig.url, supabaseConfig.key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // 서버 컴포넌트 내부에서 쿠키를 세팅하려고 할 때 발생하는 에러를 방지합니다.
            // Middleware나 Server Actions가 처리하므로 무시해도 안전합니다.
          }
        },
      },
    }
  )
}
