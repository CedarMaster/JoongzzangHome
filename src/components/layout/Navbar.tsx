'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/brand', label: '백향재' },
  { href: '/listen', label: '듣다' },
  { href: '/read', label: '읽다' },
  { href: '/learn', label: '배우다' },
  { href: '/explore', label: '알아가다' },
  { href: '/community', label: '함께하다' },
  { href: '/contact', label: '문의하기' },
]

/* ── 백향나무 미니 SVG ── */
function CedarMini() {
  return (
    <svg width="14" height="18" viewBox="0 0 44 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="22" y1="52" x2="22" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 18 C17 16 10 18 6 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M22 18 C27 16 34 18 38 24" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M22 32 C16 30 8 33 4 40" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M22 32 C28 30 36 33 40 40" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (data.user) {
        setUser({ email: data.user.email ?? '', name: data.user.email?.split('@')[0] ?? '' })
        /* 역할 확인 */
        const { data: profile } = await supabase
          .from('users')
          .select('role, display_name')
          .eq('id', data.user.id)
          .single()
        if (profile) {
          setIsAdmin(profile.role === 'admin')
          if (profile.display_name) {
            setUser({ email: data.user.email ?? '', name: profile.display_name })
          }
        }
      }
    }
    loadUser()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({ email: session.user.email ?? '', name: session.user.email?.split('@')[0] ?? '' })
      } else {
        setUser(null)
        setIsAdmin(false)
      }
    })

    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    return () => {
      listener.subscription.unsubscribe()
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setIsAdmin(false)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(15, 26, 51, 0.97)' : 'rgba(15, 26, 51, 0.88)',
        backdropFilter: 'blur(14px)',
        boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.2)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2.5">
            <span style={{ color: 'rgba(212,196,164,0.7)' }}>
              <CedarMini />
            </span>
            <span
              className="text-xl font-semibold tracking-wider"
              style={{ color: 'white', fontFamily: 'Noto Serif KR, Georgia, serif', letterSpacing: '0.15em' }}
            >
              柏香齋
            </span>
            <span className="text-xs hidden sm:inline" style={{ color: '#a8c4e0', letterSpacing: '0.1em' }}>백향재</span>
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm transition-colors duration-200"
                style={{ color: '#c8c4be', letterSpacing: '0.05em' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'white')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#c8c4be')}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* 우측 사용자 영역 */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {/* 관리자 전용 버튼 */}
                {isAdmin && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all"
                    style={{
                      backgroundColor: 'rgba(168,196,224,0.15)',
                      border: '1px solid rgba(168,196,224,0.35)',
                      color: '#a8c4e0',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.backgroundColor = 'rgba(168,196,224,0.25)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.backgroundColor = 'rgba(168,196,224,0.15)'
                    }}
                  >
                    <LayoutDashboard size={11} />
                    관리
                  </Link>
                )}
                {/* 마이페이지 */}
                <Link
                  href="/mypage"
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all"
                  style={{
                    backgroundColor: 'rgba(244,237,224,0.1)',
                    border: '1px solid rgba(244,237,224,0.25)',
                    color: '#f4ede0',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.backgroundColor = 'rgba(244,237,224,0.18)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.backgroundColor = 'rgba(244,237,224,0.1)'
                  }}
                >
                  <span style={{ color: 'rgba(212,196,164,0.6)' }}><CedarMini /></span>
                  <span>{user.name}</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="transition-opacity hover:opacity-70"
                  style={{ color: '#5a6a8a' }}
                  title="로그아웃"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-xs px-4 py-2 rounded-full border transition-all duration-200"
                style={{ borderColor: 'rgba(168,196,224,0.5)', color: '#a8c4e0' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.backgroundColor = 'rgba(168,196,224,0.15)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.backgroundColor = 'transparent'
                }}
              >
                로그인
              </Link>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* 모바일 드로어 */}
      {isOpen && (
        <div
          className="md:hidden"
          style={{ backgroundColor: 'rgba(10,18,40,0.98)', borderTop: '1px solid rgba(168,196,224,0.1)' }}
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm py-3"
                style={{ color: '#c8c4be', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 mt-1 flex flex-col gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {user ? (
                <>
                  <Link href="/mypage" className="text-sm py-2 flex items-center gap-2" style={{ color: '#f4ede0' }} onClick={() => setIsOpen(false)}>
                    <span style={{ color: 'rgba(212,196,164,0.5)' }}><CedarMini /></span>
                    {user.name} (마이페이지)
                  </Link>
                  {isAdmin && (
                    <Link href="/admin" className="text-sm py-2" style={{ color: '#a8c4e0' }} onClick={() => setIsOpen(false)}>
                      관리자 대시보드
                    </Link>
                  )}
                  <button onClick={handleSignOut} className="text-left text-sm py-2" style={{ color: '#5a6a8a' }}>
                    로그아웃
                  </button>
                </>
              ) : (
                <Link href="/auth/login" className="text-sm py-2" style={{ color: '#a8c4e0' }} onClick={() => setIsOpen(false)}>
                  로그인 / 회원가입
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
