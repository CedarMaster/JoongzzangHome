'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/'
  const errorParam = searchParams.get('error')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      const msg =
        error.message.includes('Invalid login credentials')
          ? '이메일 또는 비밀번호가 올바르지 않습니다.'
          : error.message.includes('Email not confirmed')
          ? '이메일 인증이 완료되지 않았습니다. 받은 편지함을 확인해주세요.'
          : '로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
      setError(msg)
      setLoading(false)
    } else {
      router.push(redirect)
      router.refresh()
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <div className="w-full max-w-sm">
        {/* 로고 */}
        <div className="text-center mb-10">
          <Link href="/">
            <span
              className="text-3xl font-thin"
              style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif', letterSpacing: '0.2em' }}
            >
              柏香齋
            </span>
          </Link>
          <p className="text-xs mt-2 tracking-widest" style={{ color: '#8a8580' }}>로그인</p>
        </div>

        {/* 이메일 인증 실패 알림 */}
        {errorParam === 'confirmation_failed' && (
          <div
            className="mb-4 px-4 py-3 rounded text-sm"
            style={{ backgroundColor: '#fff3f3', border: '1px solid #f0c4c4', color: '#a04444' }}
          >
            이메일 인증 링크가 만료되었거나 유효하지 않습니다. 다시 시도해주세요.
          </div>
        )}

        <div className="p-8 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}>
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>이메일</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded outline-none transition-all"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744' }}
                placeholder="email@example.com"
                autoComplete="email"
              />
            </div>
            <div>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>비밀번호</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded outline-none transition-all"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744' }}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div
                className="px-3 py-2.5 rounded text-xs leading-relaxed"
                style={{ backgroundColor: '#fff3f3', border: '1px solid #f0c4c4', color: '#a04444' }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm rounded transition-all"
              style={{ backgroundColor: loading ? '#8a9ab5' : '#1a2744', color: 'white', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div className="mt-6 space-y-2 text-center">
            <p className="text-xs" style={{ color: '#8a8580' }}>
              계정이 없으신가요?{' '}
              <Link href="/auth/signup" className="transition-colors" style={{ color: '#2d3f6b' }}>
                무료 회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
