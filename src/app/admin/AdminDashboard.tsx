'use client'

import { useState } from 'react'
import { Users, FileText, BookOpen, Settings, LogOut, LayoutDashboard, Music, Palette } from 'lucide-react'

const tabs = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
  { id: 'contents', label: '콘텐츠 CMS', icon: FileText },
  { id: 'members', label: '회원 관리', icon: Users },
  { id: 'books', label: '도서 관리', icon: BookOpen },
  { id: 'theme', label: '디자인 테마', icon: Palette },
  { id: 'settings', label: '설정', icon: Settings },
]

export default function AdminDashboard({ userEmail }: { userEmail: string }) {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f0ede8' }}>
      {/* 사이드바 */}
      <aside className="w-56 flex-shrink-0" style={{ backgroundColor: '#1a2744', minHeight: '100vh' }}>
        <div className="p-6">
          <div className="mb-8">
            <span className="text-lg font-light" style={{ color: 'white', fontFamily: 'Noto Serif KR', letterSpacing: '0.1em' }}>
              柏香齋
            </span>
            <p className="text-xs mt-1" style={{ color: '#5a6a8a' }}>관리자</p>
          </div>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded text-sm transition-all text-left"
                  style={{
                    backgroundColor: activeTab === tab.id ? 'rgba(168, 196, 224, 0.15)' : 'transparent',
                    color: activeTab === tab.id ? '#a8c4e0' : '#8a9ab5',
                  }}
                >
                  <Icon size={15} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="absolute bottom-6 left-0 w-56 px-6">
          <div className="text-xs mb-4" style={{ color: '#5a6a8a' }}>{userEmail}</div>
          <button className="flex items-center gap-2 text-xs" style={{ color: '#5a6a8a' }}>
            <LogOut size={13} />
            로그아웃
          </button>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-8">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'contents' && <ContentsTab />}
        {activeTab === 'members' && <MembersTab />}
        {activeTab === 'books' && <BooksTab />}
        {activeTab === 'theme' && <ThemeTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  )
}

function DashboardTab() {
  const stats = [
    { label: '전체 회원', value: '—', icon: '👤', color: '#a8c4e0' },
    { label: '승인 대기', value: '—', icon: '⏳', color: '#f0d4c4' },
    { label: '콘텐츠', value: '—', icon: '📄', color: '#c4dcc8' },
    { label: '이번 달 문의', value: '—', icon: '💬', color: '#d4c4e0' },
  ]

  return (
    <div>
      <h1 className="text-xl font-light mb-8" style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}>
        대시보드
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="p-5 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{stat.icon}</span>
              <span className="text-xs" style={{ color: '#8a8580' }}>{stat.label}</span>
            </div>
            <span className="text-2xl font-light" style={{ color: '#1a2744' }}>{stat.value}</span>
          </div>
        ))}
      </div>
      <div className="p-5 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}>
        <p className="text-sm" style={{ color: '#8a8580' }}>
          Supabase 연동 후 실시간 데이터가 표시됩니다.
        </p>
      </div>
    </div>
  )
}

function ContentsTab() {
  const [type, setType] = useState<'듣다' | '읽다'>('듣다')
  const [title, setTitle] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [body, setBody] = useState('')

  return (
    <div>
      <h1 className="text-xl font-light mb-8" style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}>
        콘텐츠 CMS
      </h1>
      <div className="max-w-lg p-6 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}>
        <h2 className="text-sm font-medium mb-5" style={{ color: '#1a2744' }}>새 콘텐츠 등록</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>메뉴 유형</label>
            <div className="flex gap-3">
              {(['듣다', '읽다'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded text-sm transition-all"
                  style={{
                    backgroundColor: type === t ? '#1a2744' : '#f0ede8',
                    color: type === t ? 'white' : '#5a5550',
                  }}
                >
                  {t === '듣다' ? <Music size={13} /> : <FileText size={13} />}
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded outline-none"
              style={{ border: '1px solid #e0dbd4', color: '#1a2744' }}
              placeholder={type === '듣다' ? '플레이리스트 제목' : '에세이 제목'}
            />
          </div>
          {type === '듣다' && (
            <div>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>유튜브 URL</label>
              <input
                type="url"
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded outline-none"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744' }}
                placeholder="https://youtube.com/..."
              />
            </div>
          )}
          {type === '읽다' && (
            <div>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>본문</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                rows={4}
                className="w-full px-3 py-2.5 text-sm rounded outline-none resize-none"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744', lineHeight: '1.8' }}
              />
            </div>
          )}
          <button
            className="w-full py-2.5 text-sm rounded"
            style={{ backgroundColor: '#1a2744', color: 'white' }}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  )
}

function MembersTab() {
  return (
    <div>
      <h1 className="text-xl font-light mb-8" style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}>
        회원 관리
      </h1>
      <div className="p-6 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}>
        <p className="text-sm mb-4" style={{ color: '#8a8580' }}>
          신규 가입자 목록을 확인하고 승인 상태를 변경합니다.
        </p>
        <div
          className="text-center py-10 rounded"
          style={{ backgroundColor: '#f0ede8' }}
        >
          <p className="text-sm" style={{ color: '#c8c4be' }}>
            Supabase 연동 후 회원 목록이 표시됩니다.
          </p>
        </div>
      </div>
    </div>
  )
}

function BooksTab() {
  return (
    <div>
      <h1 className="text-xl font-light mb-8" style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}>
        도서 관리
      </h1>
      <div className="p-6 rounded-lg max-w-lg" style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}>
        <h2 className="text-sm font-medium mb-5" style={{ color: '#1a2744' }}>백향재의 서재 — 도서 등록</h2>
        <div className="space-y-4">
          {['도서 제목', '표지 이미지 URL', '교보문고 링크', 'YES24 링크', '에세이 문구'].map((label) => (
            <div key={label}>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>{label}</label>
              <input
                type="text"
                className="w-full px-3 py-2.5 text-sm rounded outline-none"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744' }}
              />
            </div>
          ))}
          <button
            className="w-full py-2.5 text-sm rounded"
            style={{ backgroundColor: '#1a2744', color: 'white' }}
          >
            도서 등록
          </button>
        </div>
      </div>
    </div>
  )
}

function ThemeTab() {
  const seasons = [
    { id: 'spring', label: '봄', emoji: '🌸', desc: '벚꽃과 새싹 — 시작과 성장의 계절' },
    { id: 'summer', label: '여름', emoji: '🌿', desc: '초록과 열기 — 활동과 탐험의 계절' },
    { id: 'autumn', label: '가을', emoji: '🍂', desc: '단풍과 결실 — 수확과 성찰의 계절' },
    { id: 'winter', label: '겨울', emoji: '❄️', desc: '눈과 고요 — 내면과 회복의 계절' },
  ]
  const [activeSeason, setActiveSeason] = useState('spring')

  return (
    <div>
      <h1 className="text-xl font-light mb-8" style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}>
        디자인 테마
      </h1>
      <div className="max-w-2xl space-y-6">
        {/* 시즌 캐릭터 */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}>
          <h2 className="text-sm font-medium mb-2" style={{ color: '#1a2744' }}>시즌 캐릭터 교체</h2>
          <p className="text-xs mb-5" style={{ color: '#8a8580' }}>
            메인 페이지에 표시되는 학습 정령 캐릭터 이미지를 시즌별로 교체합니다.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {seasons.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSeason(s.id)}
                className="p-4 rounded-lg text-center transition-all"
                style={{
                  backgroundColor: activeSeason === s.id ? '#1a2744' : '#f0ede8',
                  border: activeSeason === s.id ? '1.5px solid #1a2744' : '1px solid #e0dbd4',
                  color: activeSeason === s.id ? 'white' : '#5a5550',
                }}
              >
                <span className="text-2xl block mb-1">{s.emoji}</span>
                <span className="text-xs">{s.label}</span>
              </button>
            ))}
          </div>
          {activeSeason && (
            <p className="text-xs mb-4" style={{ color: '#8a8580' }}>
              {seasons.find(s => s.id === activeSeason)?.desc}
            </p>
          )}
          <div className="flex items-center gap-3">
            <div
              className="flex-1 px-3 py-2.5 text-sm rounded text-center"
              style={{ border: '1px dashed #e0dbd4', color: '#c8c4be' }}
            >
              캐릭터 이미지 업로드 (PNG, 권장 200×200px)
            </div>
            <button
              className="px-5 py-2.5 text-sm rounded"
              style={{ backgroundColor: '#1a2744', color: 'white' }}
            >
              적용
            </button>
          </div>
        </div>

        {/* 메인 카피 */}
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}>
          <h2 className="text-sm font-medium mb-2" style={{ color: '#1a2744' }}>메인 페이지 카피 수정</h2>
          <p className="text-xs mb-5" style={{ color: '#8a8580' }}>
            히어로 섹션의 메인 문구를 수정합니다. 시즌이나 기획에 맞게 변경 가능합니다.
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>메인 슬로건</label>
              <input
                type="text"
                defaultValue="천천히, 그러나 방향은 정확하게."
                className="w-full px-3 py-2.5 text-sm rounded outline-none"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744' }}
              />
            </div>
            <div>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>서브 설명 문구</label>
              <textarea
                defaultValue="각자의 때와 방식으로 성장하는 사람들을 위한 조용한 배움의 공간입니다."
                rows={2}
                className="w-full px-3 py-2.5 text-sm rounded outline-none resize-none"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744', lineHeight: '1.8' }}
              />
            </div>
            <div>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>오늘의 문장 (하단 섹션)</label>
              <textarea
                defaultValue='"배움은 목적지가 아니라 걷는 방식입니다."'
                rows={2}
                className="w-full px-3 py-2.5 text-sm rounded outline-none resize-none"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744', lineHeight: '1.8' }}
              />
            </div>
            <button
              className="px-6 py-2.5 text-sm rounded"
              style={{ backgroundColor: '#1a2744', color: 'white' }}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div>
      <h1 className="text-xl font-light mb-8" style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}>
        설정
      </h1>
      <div className="max-w-lg space-y-5">
        <div className="p-6 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}>
          <h2 className="text-sm font-medium mb-4" style={{ color: '#1a2744' }}>메인 페이지 설정</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>메인 카피 (히어로 섹션)</label>
              <input
                type="text"
                defaultValue="천천히, 그러나 방향은 정확하게."
                className="w-full px-3 py-2.5 text-sm rounded outline-none"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744' }}
              />
            </div>
            <div>
              <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>오늘의 문장</label>
              <textarea
                defaultValue='"배움은 목적지가 아니라 걷는 방식입니다."'
                rows={2}
                className="w-full px-3 py-2.5 text-sm rounded outline-none resize-none"
                style={{ border: '1px solid #e0dbd4', color: '#1a2744' }}
              />
            </div>
            <button
              className="px-6 py-2.5 text-sm rounded"
              style={{ backgroundColor: '#1a2744', color: 'white' }}
            >
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
