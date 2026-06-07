'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, BookOpen, Bell, ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'

const books = [
  {
    id: 1,
    title: '나를 물들이는 시간',
    subtitle: '색과 모양으로 나를 이해하고 회복하는 자기탐색 컬러링북',
    quote: '색을 칠하는 동안, 잊고 지낸 나를 다시 만나는 책.',
    coverEmoji: '📗',
    color: '#c4dcc8',
    links: {
      kyobo: '#',
      yes24: '#',
    },
  },
]

export default function ExplorePage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setEmail('')
    }
  }

  return (
    <div>
      {/* 히어로 */}
      <PageHero
        imageUrl="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=85"
        label="EXPLORE"
        titleKo="알아가다"
        subtitle="나를 더 깊이 이해하는 진단과 탐색의 여정"
        objectPosition="center 40%"
        minHeight="46vh"
      />

      {/* Phase 2 예고 섹션 */}
      <section className="py-24 px-6" style={{ backgroundColor: '#1a2744' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div className="character-float text-5xl mb-8">🔮</div>
          <h2
            className="text-2xl font-light mb-6"
            style={{ color: 'white', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            나를 알아가는 진단 검사와 워크북,<br />
            곧 찾아옵니다.
          </h2>
          <p className="text-sm leading-loose mb-10" style={{ color: '#8a9ab5' }}>
            4MAT 기반의 스토리텔링형 진단 검사를 통해<br />
            나의 학습 스타일, 진로 성향, 관계 패턴을 탐색할 수 있습니다.<br />
            부모교육, 진로코칭, 뇌기반 상담 세 가지 테마로 오픈 예정입니다.
          </p>

          {/* 테마 미리보기 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { theme: '부모교육', emoji: '🌱', desc: '자녀와의 관계\n새싹을 키우듯', color: '#c4dcc8' },
              { theme: '진로코칭', emoji: '⚓', desc: '나만의 항구\n방향을 찾는 여정', color: '#a8c4e0' },
              { theme: '뇌기반 상담', emoji: '⚙️', desc: '마음의 톱니바퀴\n균형을 맞추는 법', color: '#d4c4e0' },
            ].map((t) => (
              <div
                key={t.theme}
                className="p-5 rounded-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <div className="text-3xl mb-3">{t.emoji}</div>
                <h3 className="text-sm font-medium mb-2" style={{ color: '#e0dbd4' }}>{t.theme}</h3>
                <p className="text-xs leading-relaxed" style={{ color: '#5a6a8a', whiteSpace: 'pre-line' }}>{t.desc}</p>
              </div>
            ))}
          </div>

          {/* 이메일 사전 알림 */}
          <div
            className="p-8 rounded-lg"
            style={{ backgroundColor: 'rgba(168, 196, 224, 0.08)', border: '1px solid rgba(168, 196, 224, 0.2)' }}
          >
            <Bell size={20} style={{ color: '#a8c4e0', margin: '0 auto 12px' }} />
            <h3 className="text-base mb-2" style={{ color: 'white' }}>오픈 알림 신청</h3>
            <p className="text-sm mb-6" style={{ color: '#8a9ab5' }}>
              진단 검사가 오픈되면 가장 먼저 알려드립니다.
            </p>
            {submitted ? (
              <p className="text-sm" style={{ color: '#c4dcc8' }}>✓ 신청 완료! 오픈 시 알려드릴게요.</p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일 주소"
                  required
                  className="flex-1 px-4 py-2.5 text-sm rounded outline-none"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                  }}
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm rounded transition-all"
                  style={{ backgroundColor: '#a8c4e0', color: '#1a2744' }}
                >
                  신청
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 백향재의 서재 */}
      <section className="py-20 px-6" style={{ backgroundColor: '#faf8f5' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen size={20} style={{ color: '#2d3f6b' }} />
              <h2
                className="text-2xl font-light"
                style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
              >
                백향재의 서재
              </h2>
            </div>
            <p className="text-sm" style={{ color: '#8a8580' }}>
              출간된 자기탐색 워크북을 소개합니다.<br />
              외부 서점에서 구매하실 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {books.map((book) => (
              <div
                key={book.id}
                className="rounded-lg overflow-hidden transition-all duration-300"
                style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}
              >
                {/* 책 표지 */}
                <div
                  className="h-56 flex items-center justify-center"
                  style={{ backgroundColor: `${book.color}20` }}
                >
                  <div
                    className="w-32 h-44 rounded-sm flex items-center justify-center text-5xl shadow-lg"
                    style={{ backgroundColor: `${book.color}50` }}
                  >
                    {book.coverEmoji}
                  </div>
                </div>

                <div className="p-6">
                  <h3
                    className="text-base font-medium mb-1 leading-snug"
                    style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
                  >
                    {book.title}
                  </h3>
                  {'subtitle' in book && (
                    <p className="text-xs mb-4" style={{ color: '#8a8580' }}>
                      {(book as { subtitle?: string }).subtitle}
                    </p>
                  )}
                  <blockquote
                    className="text-sm italic mb-5 leading-relaxed"
                    style={{ color: '#8a8580', borderLeft: `2px solid ${book.color}`, paddingLeft: '12px' }}
                  >
                    &ldquo;{book.quote}&rdquo;
                  </blockquote>
                  <div className="flex gap-3">
                    <a
                      href={book.links.kyobo}
                      className="flex-1 text-center text-xs py-2 rounded transition-all"
                      style={{ border: '1px solid #e0dbd4', color: '#5a5550' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      교보문고
                    </a>
                    <a
                      href={book.links.yes24}
                      className="flex-1 text-center text-xs py-2 rounded transition-all"
                      style={{ border: '1px solid #e0dbd4', color: '#5a5550' }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      YES24
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
