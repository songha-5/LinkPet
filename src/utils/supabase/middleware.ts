import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseConfig } from './config'

// 인증 없이 접근 가능한 경로
const PUBLIC_PATHS = [
  '/auth/password',
  '/auth/password/result',
  '/auth/join',
  '/auth/join/result',
  '/api/auth/callback'
]

// 로그인된 유저가 접근하면 안되는 경로
const GUEST_ONLY_PATHS = [
  '/',
  '/auth/password',
  '/auth/join',
  '/api/auth/callback'
]

export async function updateSession(request: NextRequest) {
  // 기본통행증 - 토큰 갱신 시 새로운 쿠키를 반환하여 갱신
  let supabaseResponse = NextResponse.next({
    request,
  })

  // 쿠키 갱신
  const supabase = createServerClient(supabaseConfig.url, supabaseConfig.key,
    {
      cookies: {
        // 브라우저의 쿠키 읽음
        getAll() {
          return request.cookies.getAll()
        },
        // 로그인 기간이 만료됬을때 새쿠키 발급
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )
  // getUser()로 변경 - 서버에서 토큰 검증
  const { data: { user } } = await supabase.auth.getUser()

  const currentPath = request.nextUrl.pathname

  const isPublicPath = currentPath === '/' || PUBLIC_PATHS.some((path) => currentPath.startsWith(path))

  const isGuestOnlyPath = GUEST_ONLY_PATHS.some((path) =>
    currentPath === path
  )


  // 비로그인 유저가 보호된 페이지 접근 시 메인으로
  if (!user && !isPublicPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  // 로그인 유저가 auth관련 페이지 접근 시 홈으로
  if (user && isGuestOnlyPath) {
    const url = request.nextUrl.clone()
    url.pathname = '/user'
    return NextResponse.redirect(url)
  }

  
  // supabaseResponse객체를 그대로 반환해야함
  return supabaseResponse
}