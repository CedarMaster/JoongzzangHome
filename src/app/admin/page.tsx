'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import AdminDashboard from './AdminDashboard'

type AuthState = 'loading' | 'admin' | 'redirect'

export default function AdminPage() {
  const router = useRouter()
  const [state, setState] = useState<AuthState>('loading')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    const supabase = createClient()

    const check = async () => {
      // getUser()는 서버 검증 — 실패 시 getSession()으로 폴백
      let user = null
      const { data: u1 } = await supabase.auth.getUser()
      if (u1.user) {
        user = u1.user
      } else {
        const { data: { session } } = await supabase.auth.getSession()
        user = session?.user ?? null
      }

      if (!user) {
        window.location.href = '/auth/login?redirect=/admin'
        return
      }

      const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

      if (profile?.role !== 'admin') {
        window.location.href = '/'
        return
      }

      setUserEmail(user.email ?? '')
      setState('admin')
    }

    check()

    /* 세션 변경 시 재검증 */
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.replace('/auth/login?redirect=/admin')
      }
    })

    return () => listener.subscription.unsubscribe()
  }, [router])

  /* 로딩 / 리다이렉트 중 — 전체화면 스플래시 */
  if (state !== 'admin') {
    return (
      <div
        className="fixed inset-0 flex flex-col items-center justify-center"
        style={{ backgroundColor: '#0a1428', zIndex: 200 }}
      >
        <p
          className="text-3xl font-thin tracking-[0.3em] mb-6"
          style={{ color: '#a8c4e0', fontFamily: '"Noto Serif KR", Georgia, serif' }}
        >
          柏香齋
        </p>
        <div
          className="w-6 h-6 rounded-full border-2 animate-spin"
          style={{ borderColor: '#1e2e4a', borderTopColor: '#a8c4e0' }}
        />
        <p className="text-xs mt-5 tracking-widest" style={{ color: '#3a4a6a' }}>
          {state === 'redirect' ? '이동 중...' : '인증 확인 중'}
        </p>
      </div>
    )
  }

  return <AdminDashboard userEmail={userEmail} />
}
