import { createClient } from '@/src/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // 주소창에서 정보와 code을 추출
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/user'

  if (code) {
    const supabase = await createClient()
    
    // code가 존재하면 쿠키로 변경
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // 경로 이동
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // 에러가 났거나 code가 없으면 메인화면으로 리다이렉트
  return NextResponse.redirect(`${origin}/`)
}