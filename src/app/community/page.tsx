import Link from 'next/link'
import { Users, Lock, ArrowRight, FileText, Calendar, Trophy } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'

const subMenus = [
  { icon: '📢', title: '백향재 소식', desc: '운영 소식과 공지', locked: true },
  { icon: '📖', title: '함께 읽는 모임', desc: '에세이를 같이 읽고 나누는 시간', locked: true },
  { icon: '🎵', title: '함께 듣는 시간', desc: '큐레이션 음악과 함께', locked: true },
  { icon: '🌱', title: '성장 챌린지', desc: '매달 진행되는 성장 챌린지', locked: true },
  { icon: '💬', title: '신청/후기 게시판', desc: '참여 후기와 신청 공간', locked: true },
]

export default function CommunityPage() {
  return (
    <div>
      {/* 히어로 */}
      <PageHero
        imageUrl="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=85"
        label="COMMUNITY"
        titleKo="함께하다"
        subtitle="승인된 멤버들을 위한 프라이빗 공간입니다."
        objectPosition="center 45%"
        minHeight="46vh"
      />

      {/* 잠금 안내 */}
      <section className="py-20 px-6" style={{ backgroundColor: '#f0ede8' }}>
        <div className="max-w-2xl mx-auto text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: '#1a2744' }}
          >
            <Lock size={24} style={{ color: '#a8c4e0' }} />
          </div>
          <h2
            className="text-xl font-light mb-4"
            style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            프라이빗 라운지
          </h2>
          <p className="text-sm leading-loose mb-8" style={{ color: '#8a8580' }}>
            이 공간은 프로그램 참여 후 관리자 승인을 받은<br />
            멤버들만 입장할 수 있습니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded text-sm"
              style={{ backgroundColor: '#1a2744', color: 'white' }}
            >
              로그인하기 <ArrowRight size={14} />
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded text-sm"
              style={{ border: '1.5px solid #1a2744', color: '#1a2744' }}
            >
              프로그램 참여하기
            </Link>
          </div>
        </div>
      </section>

      {/* 공간 미리보기 */}
      <section className="py-20 px-6" style={{ backgroundColor: '#faf8f5' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-xl font-light"
              style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
            >
              어떤 공간이 기다리고 있을까요
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {subMenus.map((menu, i) => (
              <div
                key={i}
                className="p-6 rounded-lg relative overflow-hidden"
                style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}
              >
                {/* 잠금 오버레이 */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: 'rgba(250,248,245,0.7)', backdropFilter: 'blur(2px)' }}
                >
                  <Lock size={16} style={{ color: '#c8c4be' }} />
                </div>
                <div className="text-3xl mb-3">{menu.icon}</div>
                <h3
                  className="text-base font-medium mb-1"
                  style={{ color: '#1a2744' }}
                >
                  {menu.title}
                </h3>
                <p className="text-sm" style={{ color: '#8a8580' }}>{menu.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 등급 설명 */}
      <section className="py-20 px-6" style={{ backgroundColor: '#1a2744' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className="text-xl font-light"
              style={{ color: 'white', fontFamily: 'Noto Serif KR, Georgia, serif' }}
            >
              멤버십 등급
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { level: '방문자', emoji: '👤', desc: '누구나 방문 가능한 공개 콘텐츠', color: '#c8c4be', access: '듣다 · 읽다 일부' },
              { level: '구독자', emoji: '📬', desc: '뉴스레터 구독 및 자료 열람', color: '#a8c4e0', access: '읽다 전체 · 자료 일부', free: true },
              { level: '참여자', emoji: '🎓', desc: '온라인/오프라인 과정 참여', color: '#c4dcc8', access: '프로그램 · 함께하다', paid: true },
              { level: '멤버', emoji: '⭐', desc: '프리미엄 콘텐츠 및 심화 서비스', color: '#d4c4e0', access: '전체 콘텐츠 · 검사 보고서', premium: true },
            ].map((tier) => (
              <div
                key={tier.level}
                className="p-5 rounded-lg"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.08)` }}
              >
                <div className="text-2xl mb-3">{tier.emoji}</div>
                <h3 className="text-sm font-medium mb-1" style={{ color: '#e0dbd4' }}>{tier.level}</h3>
                <p className="text-xs mb-3" style={{ color: '#5a6a8a' }}>{tier.desc}</p>
                <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: `${tier.color}20`, color: tier.color }}>
                  {tier.access}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
