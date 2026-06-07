'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.')
      return
    }

    if (password.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.')
      return
    }

    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      setError(error.message === 'User already registered' ? '이미 가입된 이메일입니다.' : '회원가입 중 오류가 발생했습니다.')
      setLoading(false)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-6"
        style={{ backgroundColor: '#faf8f5' }}
      >
        <div className="w-full max-w-sm text-center">
          <div className="text-5xl mb-6">📬</div>
          <h2
            className="text-xl font-light mb-4"
            style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            이메일을 확인해주세요.
          </h2>
          <p className="text-sm leading-loose mb-8" style={{ color: '#8a8580' }}>
            {email}으로 확인 이메일을 발송했습니다.<br />
            링크를 클릭하면 가입이 완료됩니다.
          </p>
          <Link href="/auth/login" className="text-sm" style={{ color: '#a8c4e0' }}>
            로그인 페이지로
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: '#faf8f5' }}
    >
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link href="/">
            <span
              className="text-3xl font-thin"
              style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif', letterSpacing: '0.2em' }}
            >
              柏香齋
            </span>
          </Link>
          <p className="text-xs mt-2 tracking-widest" style={{ color: '#8a8580' }}>회원가입</p>
        </div>

        <div className="p-8 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}>
          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>이메일</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded outline-none"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744' }}
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>비밀번호</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded outline-none"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744' }}
                placeholder="8자 이상"
              />
            </div>
            <div>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>비밀번호 확인</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm rounded outline-none"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744' }}
                placeholder="비밀번호 재입력"
              />
            </div>

            {error && (
              <p className="text-xs" style={{ color: '#c44' }}>{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm rounded transition-all"
              style={{ backgroundColor: loading ? '#8a9ab5' : '#1a2744', color: 'white' }}
            >
              {loading ? '가입 중...' : '회원가입'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs" style={{ color: '#8a8580' }}>
              이미 계정이 있으신가요?{' '}
              <Link href="/auth/login" style={{ color: '#2d3f6b' }}>
                로그인
              </Link>
            </p>
          </div>
        </div>

        <p className="text-xs text-center mt-6" style={{ color: '#c8c4be' }}>
          가입 후 관리자 승인 시 함께하다 공간에 입장할 수 있습니다.
        </p>
      </div>
    </div>
  )
}
