'use client'

import Link from 'next/link'
import { GraduationCap, MapPin, Clock, Users, ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'

const categories = [
  { id: 'online', label: '온라인 강의' },
  { id: 'offline', label: '오프라인 모임' },
  { id: 'parents', label: '부모교육' },
  { id: 'career', label: '진로·상담 교육' },
  { id: 'instructor', label: '강사·교수자 과정' },
  { id: 'institutional', label: '기관 의뢰 강의' },
]

const programs = [
  {
    id: 1,
    categoryId: 'online',
    type: '온라인 강의',
    typeColor: '#a8c4e0',
    status: 'upcoming',
    statusLabel: '모집 예정',
    title: '4MAT 기반 학습 스타일 진단과 적용',
    desc: '자신이 어떻게 배우는 사람인지를 이해하고, 공부·일·관계에서 가장 자신다운 방식을 찾아가는 온라인 과정.',
    duration: '총 6주',
    participants: '20명 정원',
    price: '공개 예정',
    emoji: '🧠',
  },
  {
    id: 2,
    categoryId: 'offline',
    type: '오프라인 모임',
    typeColor: '#c4dcc8',
    status: 'upcoming',
    statusLabel: '모집 예정',
    title: '함께 읽고 나누는 성장 모임',
    desc: '정해진 텍스트를 함께 읽고, 서로의 생각과 경험을 나누는 소규모 오프라인 독서 모임.',
    duration: '월 1회 (3시간)',
    participants: '10명 이내',
    price: '공개 예정',
    emoji: '📚',
    location: '서울',
  },
  {
    id: 3,
    categoryId: 'parents',
    type: '부모교육',
    typeColor: '#f0d4c4',
    status: 'upcoming',
    statusLabel: '모집 예정',
    title: '부모와 자녀를 위한 진로 탐색 워크숍',
    desc: '부모와 자녀가 함께 참여하는 1일 워크숍. 서로의 성향을 이해하고 진로를 함께 이야기합니다.',
    duration: '1일 (6시간)',
    participants: '12가족 정원',
    price: '공개 예정',
    emoji: '🌱',
    location: '서울',
  },
  {
    id: 4,
    categoryId: 'career',
    type: '진로·상담 교육',
    typeColor: '#c4d4e0',
    status: 'upcoming',
    statusLabel: '모집 예정',
    title: '나를 알아가는 진로 탐색 과정',
    desc: '막연한 진로 고민을 구체적인 탐색으로 전환하는 과정. 자기이해를 바탕으로 방향을 찾습니다.',
    duration: '총 4주',
    participants: '15명 정원',
    price: '공개 예정',
    emoji: '⚓',
  },
  {
    id: 5,
    categoryId: 'instructor',
    type: '강사·교수자 과정',
    typeColor: '#d4c4e0',
    status: 'upcoming',
    statusLabel: '모집 예정',
    title: '어른의 배움 — 강사·교수자 역량 과정',
    desc: '4MAT 기반의 강의 설계 원리를 익히고 실제 수업·강의에 적용하는 강사·교수자 전문 과정.',
    duration: '총 8주',
    participants: '15명 정원',
    price: '공개 예정',
    emoji: '🎓',
  },
  {
    id: 6,
    categoryId: 'institutional',
    type: '기관 의뢰 강의',
    typeColor: '#e0d4c4',
    status: 'open',
    statusLabel: '상시 신청',
    title: '기관·단체 맞춤형 강의 의뢰',
    desc: '학교, 기업, 공공기관을 대상으로 부모교육·진로교육·뇌기반 학습 등 맞춤형 강의를 제공합니다.',
    duration: '협의 가능',
    participants: '단체',
    price: '별도 문의',
    emoji: '🏫',
  },
]

export default function LearnPage() {
  return (
    <div>
      {/* 히어로 */}
      <PageHero
        imageUrl="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1920&q=85"
        label="LEARN"
        titleKo="배우다"
        subtitle="각자의 때에 맞는 배움의 과정을 소개합니다."
        objectPosition="center 50%"
        minHeight="46vh"
        bottomColor="#faf8f5"
      />

      {/* 카테고리 필터 */}
      <nav className="sticky top-16 z-40 py-4 px-6" style={{ backgroundColor: '#faf8f5', borderBottom: '1px solid #e0dbd4' }}>
        <div className="max-w-6xl mx-auto flex gap-4 overflow-x-auto">
          <button className="text-sm px-4 py-1.5 rounded-full whitespace-nowrap" style={{ backgroundColor: '#1a2744', color: 'white' }}>
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className="text-sm px-4 py-1.5 rounded-full whitespace-nowrap transition-all"
              style={{ backgroundColor: '#f0ede8', color: '#5a5550', border: '1px solid #e0dbd4' }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </nav>

      {/* 프로그램 그리드 */}
      <section className="py-16 px-6" style={{ backgroundColor: '#faf8f5' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <div
                key={program.id}
                className="rounded-lg overflow-hidden transition-all duration-300"
                style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = '0 8px 30px rgba(26, 39, 68, 0.08)'
                  el.style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.boxShadow = 'none'
                  el.style.transform = 'translateY(0)'
                }}
              >
                {/* 썸네일 */}
                <div
                  className="h-36 flex items-center justify-center text-4xl"
                  style={{ backgroundColor: `${program.typeColor}15` }}
                >
                  {program.emoji}
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: `${program.typeColor}20`, color: '#2d3f6b' }}
                    >
                      {program.type}
                    </span>
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: program.status === 'open' ? '#c4dcc820' : '#f0ede8',
                        color: program.status === 'open' ? '#2d6b3f' : '#8a8580',
                      }}
                    >
                      {program.statusLabel}
                    </span>
                  </div>

                  <h3
                    className="text-base font-medium leading-snug mb-3"
                    style={{ color: '#1a2744' }}
                  >
                    {program.title}
                  </h3>

                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#8a8580' }}>
                    {program.desc}
                  </p>

                  <div className="flex flex-col gap-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#8a8580' }}>
                      <Clock size={11} />
                      {program.duration}
                    </div>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#8a8580' }}>
                      <Users size={11} />
                      {program.participants}
                    </div>
                    {program.location && (
                      <div className="flex items-center gap-2 text-xs" style={{ color: '#8a8580' }}>
                        <MapPin size={11} />
                        {program.location}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid #f0ede8' }}>
                    <span className="text-sm font-medium" style={{ color: '#1a2744' }}>{program.price}</span>
                    <Link
                      href="/contact"
                      className="text-xs flex items-center gap-1 transition-opacity hover:opacity-70"
                      style={{ color: '#2d3f6b' }}
                    >
                      알림 신청 <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 기관 의뢰 배너 */}
      <section className="py-16 px-6" style={{ backgroundColor: '#1a2744' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-xl font-light mb-4"
            style={{ color: 'white', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            기관 강의 의뢰
          </h2>
          <p className="text-sm leading-loose mb-8" style={{ color: '#8a9ab5' }}>
            학교, 기업, 공공기관 등을 대상으로 맞춤형 강의를 제공합니다.<br />
            부모교육, 진로교육, 뇌기반 상담 등 다양한 주제로 협의가 가능합니다.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded text-sm transition-all"
            style={{ backgroundColor: 'white', color: '#1a2744' }}
          >
            강의 의뢰하기 <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  )
}
