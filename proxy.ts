import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let proxyResponse = NextResponse.next({ request })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    return proxyResponse
  }

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        proxyResponse = NextResponse.next({ request })
        cookiesToSet.forEach(({ name, value, options }) =>
          proxyResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // 세션 갱신 (getUser는 항상 서버에서 검증)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // /admin 보호 — 미인증 시 로그인으로 리다이렉트
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      const loginUrl = request.nextUrl.clone()
      loginUrl.pathname = '/auth/login'
      loginUrl.searchParams.set('redirect', '/admin')
      return NextResponse.redirect(loginUrl)
    }
  }

  return proxyResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
