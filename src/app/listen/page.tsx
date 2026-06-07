'use client'

import Link from 'next/link'
import { Music, ExternalLink } from 'lucide-react'

const playlists = [
  {
    id: 'study',
    title: '공부할 때',
    emoji: '📚',
    desc: '집중력을 높이고 방해를 줄이는 조용한 음악들',
    color: '#a8c4e0',
    mood: '집중 · 차분 · 깊이',
    items: [
      { title: 'Lofi Hip Hop Study Mix', duration: '2:00:00', message: '방해받지 않는 흐름 속에서' },
      { title: 'Classical Focus — Bach & Mozart', duration: '1:30:00', message: '질서 있는 소리가 생각을 정돈합니다' },
      { title: 'Rain & Cafe Ambience', duration: '3:00:00', message: '카페 구석, 혼자인 듯 함께인 듯' },
    ],
  },
  {
    id: 'drive',
    title: '운전할 때',
    emoji: '🚗',
    desc: '드라이브의 리듬에 맞춰 호흡하는 음악들',
    color: '#c4dcc8',
    mood: '생동 · 여유 · 활기',
    items: [
      { title: 'Easy Drive Mix', duration: '1:00:00', message: '창문 열고, 그냥 달리기만 해도 좋은 날' },
      { title: 'Night Drive Playlist', duration: '1:20:00', message: '야경 속을 달리는 것 같은 느낌' },
    ],
  },
  {
    id: 'meditation',
    title: '명상과 회복',
    emoji: '🌿',
    desc: '마음을 내려놓고 회복하는 시간을 위한 소리',
    color: '#f0d4c4',
    mood: '고요 · 회복 · 내면',
    items: [
      { title: 'Healing Nature Sounds', duration: '1:00:00', message: '자연의 소리가 가장 좋은 치료사' },
      { title: 'Tibetan Bowls Meditation', duration: '45:00', message: '지금 이 순간, 여기에 있습니다' },
    ],
  },
  {
    id: 'sleep',
    title: '잠들기 전',
    emoji: '🌙',
    desc: '하루를 마무리하고 편안히 잠드는 시간을 위해',
    color: '#d4c4e0',
    mood: '포근 · 안정 · 이완',
    items: [
      { title: 'Sleep Soundscape', duration: '8:00:00', message: '오늘 하루도 수고했습니다' },
      { title: 'Gentle Piano for Sleep', duration: '2:00:00', message: '천천히 눈을 감아도 됩니다' },
    ],
  },
  {
    id: 'baekhyangjae',
    title: '백향재 플레이리스트',
    emoji: '✨',
    desc: '백향재가 직접 큐레이션한 특별한 음악 모음',
    color: '#c8c4be',
    mood: '배움 · 성장 · 여백',
    items: [
      { title: 'The Art of Learning', duration: '1:15:00', message: '배움이란 무엇인가를 생각하며' },
      { title: 'Quiet Growth', duration: '50:00', message: '성장은 소리 없이 일어납니다' },
    ],
  },
]

export default function ListenPage() {
  return (
    <div>
      {/* 헤더 */}
      <section
        className="py-28 px-6 text-center"
        style={{ backgroundColor: '#0f1a33' }}
      >
        <p className="text-xs tracking-[0.4em] mb-6" style={{ color: '#5a6a8a' }}>LISTEN</p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <Music size={28} style={{ color: '#a8c4e0' }} />
          <h1
            className="text-4xl font-light"
            style={{ color: 'white', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            듣다
          </h1>
        </div>
        <p className="text-sm mt-4" style={{ color: '#8a9ab5' }}>
          상황과 감정에 맞는 음악을 만나보세요.
        </p>
      </section>

      {/* 카테고리 탭 */}
      <nav className="sticky top-16 z-40 py-4 px-6" style={{ backgroundColor: '#0f1a33', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto flex gap-6 overflow-x-auto">
          {playlists.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="text-sm whitespace-nowrap transition-opacity hover:opacity-100 flex items-center gap-1" style={{ color: '#8a9ab5', opacity: 0.7 }}>
              <span>{p.emoji}</span>
              <span>{p.title}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* 플레이리스트 섹션들 */}
      {playlists.map((playlist, idx) => (
        <section
          key={playlist.id}
          id={playlist.id}
          className="py-20 px-6"
          style={{ backgroundColor: idx % 2 === 0 ? '#0f1a33' : '#0a1228' }}
        >
          <div className="max-w-5xl mx-auto">
            <div className="flex items-start gap-4 mb-10">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: `${playlist.color}20` }}
              >
                {playlist.emoji}
              </div>
              <div>
                <h2
                  className="text-xl font-light mb-1"
                  style={{ color: 'white', fontFamily: 'Noto Serif KR, Georgia, serif' }}
                >
                  {playlist.title}
                </h2>
                <p className="text-xs mb-1" style={{ color: '#5a6a8a' }}>{playlist.mood}</p>
                <p className="text-sm" style={{ color: '#8a9ab5' }}>{playlist.desc}</p>
              </div>
            </div>

            <div className="space-y-3">
              {playlist.items.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg transition-all cursor-pointer group"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(168,196,224,0.08)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.03)'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                      style={{ backgroundColor: `${playlist.color}20`, color: playlist.color }}
                    >
                      ▶
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: '#e0dbd4' }}>{item.title}</p>
                      <p className="text-xs" style={{ color: '#5a6a8a' }}>{item.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono" style={{ color: '#5a6a8a' }}>{item.duration}</span>
                    <ExternalLink size={13} style={{ color: '#5a6a8a' }} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* 안내 배너 */}
      <section className="py-14 px-6 text-center" style={{ backgroundColor: '#1a2744', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="text-sm leading-loose" style={{ color: '#8a9ab5' }}>
          플레이리스트는 유튜브 링크와 연동됩니다.<br />
          더 많은 음악은 순차적으로 추가됩니다.
        </p>
      </section>
    </div>
  )
}
