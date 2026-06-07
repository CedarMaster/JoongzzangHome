'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, User, LogOut } from 'lucide-react'
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

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<{ email: string } | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUser({ email: data.user.email ?? '' })
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? { email: session.user.email ?? '' } : null)
    })

    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)

    return () => {
      listener.subscription.unsubscribe()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(26, 39, 68, 0.97)' : 'rgba(26, 39, 68, 0.90)',
        backdropFilter: 'blur(12px)',
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.15)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-xl font-semibold tracking-wider"
              style={{ color: 'white', fontFamily: 'Noto Serif KR, Georgia, serif', letterSpacing: '0.15em' }}
            >
              柏香齋
            </span>
            <span className="text-xs" style={{ color: '#a8c4e0', letterSpacing: '0.1em' }}>백향재</span>
          </Link>

          {/* 데스크탑 메뉴 */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm transition-colors duration-200 hover:opacity-100"
                style={{ color: '#c8c4be', letterSpacing: '0.05em' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'white')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = '#c8c4be')}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* 우측 사용자 영역 */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <Link href="/community" className="flex items-center gap-1 text-sm" style={{ color: '#a8c4e0' }}>
                  <User size={15} />
                  <span className="text-xs">{user.email.split('@')[0]}</span>
                </Link>
                <button onClick={handleSignOut} style={{ color: '#8a8580' }}>
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-xs px-4 py-2 rounded border transition-all duration-200"
                style={{ borderColor: '#a8c4e0', color: '#a8c4e0' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.backgroundColor = '#a8c4e0'
                  el.style.color = '#1a2744'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.backgroundColor = 'transparent'
                  el.style.color = '#a8c4e0'
                }}
              >
                로그인
              </Link>
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* 모바일 드로어 */}
      {isOpen && (
        <div
          className="md:hidden"
          style={{ backgroundColor: '#0f1a33', borderTop: '1px solid rgba(168,196,224,0.1)' }}
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm py-2"
                style={{ color: '#c8c4be', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <button onClick={handleSignOut} className="text-left text-sm py-2" style={{ color: '#8a8580' }}>
                로그아웃
              </button>
            ) : (
              <Link href="/auth/login" className="text-sm py-2" style={{ color: '#a8c4e0' }} onClick={() => setIsOpen(false)}>
                로그인 / 회원가입
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
