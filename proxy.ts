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

  // 세션 쿠키 갱신만 수행 (페이지 보호는 각 클라이언트 컴포넌트에서 처리)
  await supabase.auth.getSession()

  return proxyResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|images|assets|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
