'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, LogOut, User, Calendar, Shield, Edit2, Check, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import PageHero from '@/components/ui/PageHero'

const ROLE_LABEL: Record<string, string> = {
  visitor: '방문자',
  subscriber: '구독자',
  participant: '참여자',
  member: '정회원',
  admin: '관리자',
}
const ROLE_COLOR: Record<string, string> = {
  visitor: '#c8c4be',
  subscriber: '#a8c4e0',
  participant: '#c4dcc8',
  member: '#d4c4e0',
  admin: '#f0d4c4',
}

type Profile = {
  id: string
  email: string
  display_name: string | null
  role: string
  is_approved: boolean
  created_at: string
}

export default function MyPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editName, setEditName] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const supabase = createClient()

    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth/login?redirect=/mypage')
        return
      }
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single()
      if (data) {
        setProfile(data)
        setNameInput(data.display_name ?? user.email?.split('@')[0] ?? '')
      } else {
        /* users 테이블에 프로필 없으면 기본값 */
        const fallback: Profile = {
          id: user.id,
          email: user.email ?? '',
          display_name: null,
          role: 'subscriber',
          is_approved: false,
          created_at: user.created_at ?? new Date().toISOString(),
        }
        setProfile(fallback)
        setNameInput(user.email?.split('@')[0] ?? '')
      }
      setLoading(false)
    }
    loadProfile()
  }, [router])

  const saveName = async () => {
    if (!profile) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('users').update({ display_name: nameInput }).eq('id', profile.id)
    setProfile({ ...profile, display_name: nameInput })
    setEditName(false)
    setSaving(false)
  }

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#faf8f5' }}>
        <div className="text-center">
          <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: '#e0dbd4', borderTopColor: '#a8c4e0' }} />
          <p className="text-sm" style={{ color: '#8a8580' }}>불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (!profile) return null

  const displayName = profile.display_name ?? profile.email.split('@')[0]
  const joinedDate = new Date(profile.created_at).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div>
      {/* 히어로 */}
      <PageHero
        imageUrl="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80"
        label="MY PAGE"
        titleKo="나의 공간"
        subtitle="백향재에서의 여정"
        objectPosition="center 55%"
        minHeight="40vh"
      />

      <div className="py-20 px-6" style={{ backgroundColor: '#faf8f5' }}>
        <div className="max-w-2xl mx-auto">

          {/* 관리자 전용 배너 */}
          {profile.role === 'admin' && (
            <Link
              href="/admin"
              className="flex items-center justify-between px-6 py-4 rounded-xl mb-10 transition-all duration-200"
              style={{
                backgroundColor: 'rgba(168,196,224,0.12)',
                border: '1px solid rgba(168,196,224,0.4)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(168,196,224,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(168,196,224,0.12)')}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard size={18} style={{ color: '#a8c4e0' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: '#1a2744' }}>관리자 대시보드</p>
                  <p className="text-xs" style={{ color: '#8a8580' }}>콘텐츠, 프로그램, 회원, 문의를 관리하세요</p>
                </div>
              </div>
              <span className="text-xs" style={{ color: '#a8c4e0' }}>→</span>
            </Link>
          )}

          {/* 프로필 카드 */}
          <div
            className="rounded-2xl p-8 mb-6"
            style={{ backgroundColor: 'white', border: '1px solid #e0dbd4', boxShadow: '0 4px 24px rgba(26,39,68,0.06)' }}
          >
            {/* 아바타 */}
            <div className="flex items-start gap-6 mb-8">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: ROLE_COLOR[profile.role] + '30', border: `2px solid ${ROLE_COLOR[profile.role]}50` }}
              >
                {profile.role === 'admin' ? (
                  <Shield size={28} style={{ color: ROLE_COLOR[profile.role] }} />
                ) : (
                  <User size={28} style={{ color: ROLE_COLOR[profile.role] }} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                {/* 닉네임 인라인 편집 */}
                {editName ? (
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      className="text-lg font-medium px-2 py-1 rounded outline-none flex-1"
                      style={{
                        color: '#1a2744',
                        fontFamily: 'Noto Serif KR, Georgia, serif',
                        border: '1px solid #a8c4e0',
                        backgroundColor: '#faf8f5',
                        maxWidth: '200px',
                      }}
                      autoFocus
                      onKeyDown={(e) => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditName(false) }}
                    />
                    <button onClick={saveName} disabled={saving} style={{ color: '#2d7a4f' }}>
                      <Check size={16} />
                    </button>
                    <button onClick={() => setEditName(false)} style={{ color: '#8a8580' }}>
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-1">
                    <h2
                      className="text-lg font-medium"
                      style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
                    >
                      {displayName}
                    </h2>
                    <button
                      onClick={() => setEditName(true)}
                      className="transition-opacity hover:opacity-70"
                      style={{ color: '#c8c4be' }}
                      title="닉네임 변경"
                    >
                      <Edit2 size={13} />
                    </button>
                  </div>
                )}
                <p className="text-sm" style={{ color: '#8a8580' }}>{profile.email}</p>
              </div>
            </div>

            {/* 정보 항목들 */}
            <div className="space-y-4" style={{ borderTop: '1px solid #f0ede8', paddingTop: '1.5rem' }}>
              <InfoRow label="등급">
                <span
                  className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: ROLE_COLOR[profile.role] + '25',
                    color: '#2d3f6b',
                    border: `1px solid ${ROLE_COLOR[profile.role]}50`,
                  }}
                >
                  {profile.role === 'admin' && <Shield size={10} />}
                  {ROLE_LABEL[profile.role] ?? profile.role}
                </span>
              </InfoRow>

              <InfoRow label="승인 상태">
                <span
                  className="text-xs px-2.5 py-1 rounded-full"
                  style={
                    profile.is_approved
                      ? { backgroundColor: 'rgba(196,220,200,0.3)', color: '#2d7a4f' }
                      : { backgroundColor: 'rgba(240,212,196,0.3)', color: '#8a5a3a' }
                  }
                >
                  {profile.is_approved ? '승인됨' : '승인 대기'}
                </span>
              </InfoRow>

              <InfoRow label="가입일">
                <span className="text-sm flex items-center gap-1.5" style={{ color: '#5a5550' }}>
                  <Calendar size={13} style={{ color: '#c8c4be' }} />
                  {joinedDate}
                </span>
              </InfoRow>
            </div>
          </div>

          {/* 안내 메시지 */}
          {!profile.is_approved && profile.role !== 'admin' && (
            <div
              className="px-6 py-4 rounded-xl mb-6 text-sm leading-relaxed"
              style={{ backgroundColor: 'rgba(240,212,196,0.25)', border: '1px solid rgba(240,212,196,0.5)', color: '#8a5a3a' }}
            >
              계정 승인 후 모든 콘텐츠를 이용하실 수 있습니다.<br />
              승인 요청은 <Link href="/contact" style={{ textDecoration: 'underline' }}>문의하기</Link>를 통해 남겨주세요.
            </div>
          )}

          {/* 로그아웃 */}
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70"
            style={{ color: '#8a8580' }}
          >
            <LogOut size={14} />
            로그아웃
          </button>
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs tracking-wide" style={{ color: '#c8c4be' }}>{label}</span>
      {children}
    </div>
  )
}
