'use client'

import Link from 'next/link'
import { BookOpen, Music, Users, MessageCircle, Search, Heart, ArrowRight } from 'lucide-react'

const menuCards = [
  {
    href: '/brand',
    icon: Heart,
    title: '백향재',
    subtitle: '브랜드 소개',
    desc: '백향재의 철학, 공간의 원칙, 운영자 소개, 그리고 걸어온 길.',
    color: '#a8c4e0',
  },
  {
    href: '/listen',
    icon: Music,
    title: '듣다',
    subtitle: '유튜브 연동 음악',
    desc: '공부할 때, 운전할 때, 명상과 회복, 잠들기 전. 상황별 큐레이션 플레이리스트.',
    color: '#c4dcc8',
  },
  {
    href: '/read',
    icon: BookOpen,
    title: '읽다',
    subtitle: '에세이 아카이브',
    desc: '오늘의 문장, 성장 에세이, 부모를 위한 글, 어른의 배움, 신앙과 삶의 문장.',
    color: '#f0d4c4',
  },
  {
    href: '/learn',
    icon: BookOpen,
    title: '배우다',
    subtitle: '프로그램 & 강의',
    desc: '온라인 강의, 오프라인 모임, 부모교육, 진로·상담 교육, 강사·교수자 과정.',
    color: '#d4c4e0',
  },
  {
    href: '/explore',
    icon: Search,
    title: '알아가다',
    subtitle: '진단 · 서재',
    desc: '나를 알아가는 진단 검사(출시 예정)와 백향재의 서재. 자기이해의 여정.',
    color: '#c4d4e0',
  },
  {
    href: '/community',
    icon: Users,
    title: '함께하다',
    subtitle: '프라이빗 라운지',
    desc: '백향재 소식, 함께 읽는 모임, 함께 듣는 시간, 성장 챌린지. 승인 회원 전용.',
    color: '#e0c4c4',
  },
  {
    href: '/contact',
    icon: MessageCircle,
    title: '문의하기',
    subtitle: 'B2B · B2C 협업',
    desc: '강의 의뢰, 프로그램 제안, 콘텐츠 협업, 공간·모임 문의, 1:1 일반 문의.',
    color: '#c8c4be',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* 히어로 섹션 */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: '#1a2744' }}
      >
        {/* 배경 텍스처 */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, #a8c4e0 0%, transparent 50%),
                             radial-gradient(circle at 80% 20%, #c4dcc8 0%, transparent 50%)`,
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          {/* 한자 로고 */}
          <div className="mb-8">
            <span
              className="text-6xl md:text-8xl font-thin block mb-2"
              style={{
                color: 'white',
                fontFamily: 'Noto Serif KR, Georgia, serif',
                letterSpacing: '0.3em',
                opacity: 0.9,
              }}
            >
              柏香齋
            </span>
            <span
              className="text-sm tracking-[0.5em]"
              style={{ color: '#a8c4e0' }}
            >
              백향재
            </span>
          </div>

          {/* 메인 카피 */}
          <h1
            className="text-2xl md:text-4xl font-light mb-6 leading-relaxed"
            style={{ color: 'white', fontFamily: 'Noto Serif KR, Georgia, serif', letterSpacing: '-0.01em' }}
          >
            천천히, 그러나 방향은 정확하게.
          </h1>

          <p
            className="text-sm md:text-base leading-loose max-w-xl mx-auto mb-12"
            style={{ color: '#c8c4be' }}
          >
            각자의 때와 방식으로 성장하는 사람들을 위한<br />
            조용한 배움의 공간입니다.
          </p>

          {/* 캐릭터 플레이스홀더 */}
          <div className="mb-12 flex justify-center">
            <div
              className="character-float w-24 h-24 rounded-full flex items-center justify-center text-4xl"
              style={{ backgroundColor: 'rgba(168, 196, 224, 0.15)', border: '1px solid rgba(168, 196, 224, 0.3)' }}
            >
              ✨
            </div>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/brand"
              className="inline-flex items-center gap-2 px-8 py-3 rounded text-sm transition-all duration-200"
              style={{
                backgroundColor: 'white',
                color: '#1a2744',
                letterSpacing: '0.05em',
              }}
            >
              백향재 알아보기
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 px-8 py-3 rounded text-sm transition-all duration-200"
              style={{
                backgroundColor: 'transparent',
                border: '1.5px solid rgba(168, 196, 224, 0.6)',
                color: '#a8c4e0',
                letterSpacing: '0.05em',
              }}
            >
              프로그램 보기
            </Link>
          </div>
        </div>

        {/* 스크롤 인디케이터 */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: '#5a5550' }}>
          <span className="text-xs tracking-widest">SCROLL</span>
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, #5a5550, transparent)' }} />
        </div>
      </section>

      {/* 브랜드 소개 섹션 */}
      <section className="py-24 px-6" style={{ backgroundColor: '#faf8f5' }}>
        <div className="max-w-3xl mx-auto text-center">
          <p
            className="text-xs tracking-[0.3em] mb-6"
            style={{ color: '#8a8580' }}
          >
            OUR PHILOSOPHY
          </p>
          <h2
            className="text-2xl md:text-3xl font-light leading-relaxed mb-8"
            style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            빠른 성공보다<br />깊은 성장을 지향합니다.
          </h2>
          <p
            className="text-base leading-loose"
            style={{ color: '#5a5550', maxWidth: '520px', margin: '0 auto' }}
          >
            백향재는 각자의 속도로 성장하는 사람들을 믿습니다.
            서두르지 않아도 됩니다. 다만, 방향만큼은 스스로 알아야 합니다.
            이 공간은 그 방향을 찾는 여정을 함께합니다.
          </p>
        </div>
      </section>

      {/* 메뉴 카드 그리드 */}
      <section className="py-20 px-6" style={{ backgroundColor: '#f0ede8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] mb-4" style={{ color: '#8a8580' }}>EXPLORE</p>
            <h2
              className="text-2xl font-light"
              style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
            >
              백향재의 공간들
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {menuCards.map((card) => {
              const Icon = card.icon
              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="group block rounded-lg p-6 transition-all duration-300"
                  style={{
                    backgroundColor: 'white',
                    border: '1px solid #e0dbd4',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.boxShadow = '0 8px 30px rgba(26, 39, 68, 0.1)'
                    el.style.transform = 'translateY(-3px)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.boxShadow = 'none'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${card.color}30` }}
                  >
                    <Icon size={18} style={{ color: card.color === '#c8c4be' ? '#5a5550' : card.color }} />
                  </div>
                  <div className="flex items-baseline gap-2 mb-2">
                    <h3
                      className="text-lg font-medium"
                      style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
                    >
                      {card.title}
                    </h3>
                    <span className="text-xs" style={{ color: '#8a8580' }}>{card.subtitle}</span>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: '#8a8580' }}>
                    {card.desc}
                  </p>
                  <div
                    className="mt-4 flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: '#2d3f6b' }}
                  >
                    둘러보기 <ArrowRight size={12} />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* 오늘의 문장 섹션 */}
      <section className="py-24 px-6" style={{ backgroundColor: '#1a2744' }}>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] mb-8" style={{ color: '#5a6a8a' }}>TODAY&apos;S SENTENCE</p>
          <blockquote
            className="text-xl md:text-2xl font-light leading-loose mb-8"
            style={{ color: 'white', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            "배움은 목적지가 아니라 걷는 방식입니다."
          </blockquote>
          <p className="text-sm" style={{ color: '#5a6a8a' }}>— 백향재</p>
          <div className="mt-10">
            <Link
              href="/read"
              className="text-sm tracking-wider transition-opacity hover:opacity-80"
              style={{ color: '#a8c4e0', borderBottom: '1px solid rgba(168, 196, 224, 0.4)', paddingBottom: '2px' }}
            >
              에세이 더 읽기
            </Link>
          </div>
        </div>
      </section>

      {/* 최신 프로그램 섹션 */}
      <section className="py-20 px-6" style={{ backgroundColor: '#faf8f5' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-xs tracking-[0.3em] mb-3" style={{ color: '#8a8580' }}>PROGRAMS</p>
              <h2
                className="text-2xl font-light"
                style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
              >
                지금 열려있는 과정
              </h2>
            </div>
            <Link href="/learn" className="text-sm flex items-center gap-1" style={{ color: '#8a8580' }}>
              전체보기 <ArrowRight size={13} />
            </Link>
          </div>

          {/* 프로그램 플레이스홀더 카드 3개 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { type: '온라인', title: '4MAT 기반 학습 스타일 진단 과정', price: '모집 예정', color: '#a8c4e0' },
              { type: '오프라인', title: '부모와 자녀를 위한 진로 탐색 워크숍', price: '모집 예정', color: '#c4dcc8' },
              { type: '온라인', title: '어른의 배움 — 강사·교수자 역량 과정', price: '모집 예정', color: '#f0d4c4' },
            ].map((p, i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden"
                style={{ border: '1px solid #e0dbd4' }}
              >
                <div
                  className="h-40 flex items-center justify-center"
                  style={{ backgroundColor: `${p.color}30` }}
                >
                  <span className="text-3xl">📖</span>
                </div>
                <div className="p-5" style={{ backgroundColor: 'white' }}>
                  <span
                    className="text-xs px-2 py-1 rounded-full mb-3 inline-block"
                    style={{
                      backgroundColor: `${p.color}20`,
                      color: p.color === '#c8c4be' ? '#5a5550' : '#2d3f6b',
                    }}
                  >
                    {p.type}
                  </span>
                  <h3
                    className="text-sm font-medium leading-snug mb-3"
                    style={{ color: '#1a2744' }}
                  >
                    {p.title}
                  </h3>
                  <p className="text-xs" style={{ color: '#8a8580' }}>{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 뉴스레터 CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: '#f0ede8' }}>
        <div className="max-w-xl mx-auto text-center">
          <div className="character-float text-4xl mb-6">📬</div>
          <h2
            className="text-xl font-light mb-4"
            style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            백향재 소식 받기
          </h2>
          <p className="text-sm leading-loose mb-8" style={{ color: '#8a8580' }}>
            새로운 에세이, 프로그램 모집 소식, 오늘의 문장을<br />
            가장 먼저 받아보세요.
          </p>
          <form className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="이메일 주소"
              className="flex-1 px-4 py-3 text-sm rounded outline-none"
              style={{
                border: '1px solid #e0dbd4',
                backgroundColor: 'white',
                color: '#1a2744',
              }}
            />
            <button
              type="submit"
              className="px-5 py-3 text-sm rounded transition-all"
              style={{ backgroundColor: '#1a2744', color: 'white' }}
            >
              구독
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
