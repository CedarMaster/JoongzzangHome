'use client'

import Link from 'next/link'
import { useState } from 'react'
import { BookOpen, Lock } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'

const categories = [
  { id: 'all', label: '전체' },
  { id: 'sentence', label: '오늘의 문장', color: '#a8c4e0' },
  { id: 'growth', label: '성장 에세이', color: '#c4dcc8' },
  { id: 'parents', label: '부모를 위한 글', color: '#f0d4c4' },
  { id: 'adult', label: '어른의 배움', color: '#d4c4e0' },
  { id: 'faith', label: '신앙과 삶의 문장', color: '#c8c4be' },
]

const essays = [
  {
    id: 1,
    categoryId: 'sentence',
    category: '오늘의 문장',
    categoryColor: '#a8c4e0',
    title: '배움은 목적지가 아니라 걷는 방식입니다.',
    preview: '우리는 종종 배움을 어떤 상태에 도달하는 것으로 생각합니다. "이것만 다 배우면", "저 자격증만 따면"이라는 말처럼. 하지만 배움은 목적지가 아닙니다. 그것은 걷는 방식이고, 세상을 대하는 태도입니다.',
    question: '오늘 당신이 걷는 방식은 어떤가요?',
    music: '클래식 피아노 소나타',
    isLocked: false,
    date: '2025. 6. 7.',
  },
  {
    id: 2,
    categoryId: 'growth',
    category: '성장 에세이',
    categoryColor: '#c4dcc8',
    title: '느린 것이 부끄럽지 않은 이유',
    preview: '빠른 사회에서 느린 사람으로 산다는 것은 용기가 필요한 일입니다. "아직도?"라는 시선, "왜 그렇게 오래 걸려?"라는 질문이 우리를 작아지게 만듭니다. 하지만 느림에는 빠름이 절대 가질 수 없는 무언가가 있습니다. 깊이 있게 보는 눈, 세밀하게 느끼는 감각, 그리고 중간에 멈춰 서는 여유.',
    question: '당신이 천천히 가고 싶은 분야는 어디인가요?',
    music: 'Lofi Study Mix',
    isLocked: false,
    date: '2025. 6. 5.',
  },
  {
    id: 3,
    categoryId: 'parents',
    category: '부모를 위한 글',
    categoryColor: '#f0d4c4',
    title: '아이의 속도를 믿는 부모의 마음',
    preview: '모든 아이는 각자의 때에 피어납니다. 부모의 역할은 그 때를 재촉하는 것이 아니라, 기다릴 수 있는 공간을 만드는 것입니다.',
    question: '지금 당신의 아이에게 가장 필요한 공간은 무엇인가요?',
    music: '자연의 소리',
    isLocked: true,
    date: '2025. 6. 3.',
  },
  {
    id: 4,
    categoryId: 'adult',
    category: '어른의 배움',
    categoryColor: '#d4c4e0',
    title: '마흔 이후에 시작하는 배움',
    preview: '배움에는 나이가 없다는 말을 많이 합니다. 하지만 실제로 어른의 배움은 어떤 모습이어야 할까요? 그것은 젊은 날의 배움과는 분명히 다릅니다.',
    question: '지금 당신이 새롭게 배우고 싶은 것은 무엇인가요?',
    music: 'Quiet Growth',
    isLocked: true,
    date: '2025. 6. 1.',
  },
  {
    id: 5,
    categoryId: 'faith',
    category: '신앙과 삶의 문장',
    categoryColor: '#c8c4be',
    title: '고요한 곳에서 들려오는 것들',
    preview: '바쁜 삶 속에서 우리는 자주 가장 중요한 목소리를 놓칩니다. 소란이 가라앉은 자리, 그 고요함 안에서 비로소 들려오는 것들이 있습니다. 그것은 종교적 언어로만 담을 수 없는, 삶의 깊은 곳에서 울리는 울림입니다.',
    question: '오늘 당신의 내면은 어떤 소리를 내고 있나요?',
    music: '잠들기 전 플레이리스트',
    isLocked: true,
    date: '2025. 5. 30.',
  },
  {
    id: 6,
    categoryId: 'parents',
    category: '부모를 위한 글',
    categoryColor: '#f0d4c4',
    title: '자녀에게 방향을 알려주는 것과 길을 걸어주는 것의 차이',
    preview: '부모는 자녀의 길을 대신 걸어줄 수 없습니다. 다만 방향을 알려줄 수는 있습니다. 그 둘의 차이를 아는 것이 부모로 성장하는 첫걸음입니다.',
    question: '지금 당신은 자녀에게 방향을 알려주고 있나요, 아니면 길을 대신 걷고 있나요?',
    music: '명상과 회복 플레이리스트',
    isLocked: true,
    date: '2025. 5. 27.',
  },
]

export default function ReadPage() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? essays
    : essays.filter((e) => e.categoryId === activeCategory)

  return (
    <div>
      {/* 히어로 */}
      <PageHero
        imageUrl="https://images.unsplash.com/photo-1476611338391-6f395a0ebc7b?w=1920&q=85"
        label="READ"
        titleKo="읽다"
        subtitle="여백 있게 읽는 시간. 글이 삶에 닿을 때."
        objectPosition="center 40%"
        minHeight="46vh"
        bottomColor="#faf8f5"
      />

      {/* 카테고리 필터 */}
      <nav className="sticky top-16 z-40 py-4 px-6" style={{ backgroundColor: '#faf8f5', borderBottom: '1px solid #e0dbd4' }}>
        <div className="max-w-4xl mx-auto flex gap-3 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="text-sm px-4 py-1.5 rounded-full whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeCategory === cat.id
                  ? '#1a2744'
                  : cat.color ? `${cat.color}18` : '#f0ede8',
                color: activeCategory === cat.id ? 'white' : '#5a5550',
                border: activeCategory === cat.id
                  ? 'none'
                  : cat.color ? `1px solid ${cat.color}40` : '1px solid #e0dbd4',
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 에세이 목록 */}
      <section className="py-14 px-6" style={{ backgroundColor: '#faf8f5' }}>
        <div className="max-w-3xl mx-auto">
          <div className="space-y-5">
            {filtered.map((essay) => (
              <article
                key={essay.id}
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}
              >
                {/* 카테고리 색 바 */}
                <div className="h-0.5" style={{ backgroundColor: essay.categoryColor }} />
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="text-xs px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: `${essay.categoryColor}18`, color: '#2d3f6b' }}
                    >
                      {essay.category}
                    </span>
                    <span className="text-xs" style={{ color: '#c8c4be' }}>{essay.date}</span>
                  </div>

                  <h2
                    className="text-xl font-light mb-5 leading-snug"
                    style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
                  >
                    {essay.title}
                  </h2>

                  {essay.isLocked ? (
                    <div
                      className="flex items-center gap-3 py-5 px-4 rounded-lg"
                      style={{ backgroundColor: '#f5f3f0' }}
                    >
                      <Lock size={13} style={{ color: '#c8c4be' }} />
                      <span className="text-sm" style={{ color: '#8a8580' }}>구독자 전용 콘텐츠입니다.</span>
                      <Link
                        href="/auth/signup"
                        className="text-sm ml-auto"
                        style={{ color: '#a8c4e0' }}
                      >
                        무료 구독하기 →
                      </Link>
                    </div>
                  ) : (
                    <>
                      <p
                        className="text-base leading-[2.1] mb-8"
                        style={{ color: '#5a5550', maxWidth: '600px' }}
                      >
                        {essay.preview}
                      </p>
                      <div
                        className="pt-6 space-y-4"
                        style={{ borderTop: '1px solid #f0ede8' }}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className="text-xs px-2 py-0.5 rounded flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: `${essay.categoryColor}18`, color: '#2d3f6b' }}
                          >
                            적용 질문
                          </span>
                          <p className="text-sm leading-relaxed" style={{ color: '#5a5550' }}>
                            {essay.question}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs" style={{ color: '#c8c4be' }}>♪</span>
                          <Link
                            href="/listen"
                            className="text-xs"
                            style={{ color: '#c8c4be' }}
                          >
                            함께 들으면 좋은 음악: {essay.music}
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>

          {/* 더 보기 */}
          <div
            className="mt-14 text-center p-10 rounded-lg"
            style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}
          >
            <p
              className="text-base font-light mb-3"
              style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
            >
              더 많은 글을 읽고 싶으신가요?
            </p>
            <p className="text-sm mb-6" style={{ color: '#8a8580' }}>
              무료 구독자로 가입하면 모든 에세이와 자료를 열람할 수 있습니다.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-8 py-3 rounded text-sm"
              style={{ backgroundColor: '#1a2744', color: 'white' }}
            >
              무료로 구독하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
