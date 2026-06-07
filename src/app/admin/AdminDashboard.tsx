'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import {
  LayoutDashboard, FileText, Users, BookOpen, Settings,
  LogOut, Music, MessageSquare, Video, ChevronDown, X, Check,
  Trash2, Plus, RefreshCw, Eye, EyeOff, UserCircle,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import type { UserRole } from '@/lib/supabase/types'

const TABS = [
  { id: 'dashboard', label: '대시보드', icon: LayoutDashboard },
  { id: 'contents', label: '콘텐츠', icon: FileText },
  { id: 'programs', label: '프로그램', icon: Video },
  { id: 'members', label: '회원 관리', icon: Users },
  { id: 'inquiries', label: '문의', icon: MessageSquare },
  { id: 'books', label: '도서', icon: BookOpen },
  { id: 'bio', label: '백향지기', icon: UserCircle },
  { id: 'settings', label: '설정', icon: Settings },
]

const card = { backgroundColor: 'white', border: '1px solid #e0dbd4', borderRadius: '8px' }
const input = 'w-full px-3 py-2.5 text-sm rounded outline-none'
const inputStyle = { border: '1px solid #e0dbd4', color: '#1a2744', backgroundColor: 'white' }
const labelStyle = { color: '#8a8580' }
const primaryBtn = { backgroundColor: '#1a2744', color: 'white' }
const dangerBtn = { backgroundColor: '#fee2e2', color: '#dc2626' }

// ──────────────────────────────────────────────
// YouTube 유틸
// ──────────────────────────────────────────────
function extractYoutubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/\s]{11})/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}

function YoutubePreview({ url }: { url: string }) {
  const id = extractYoutubeId(url)
  if (!id) return null
  return (
    <div className="mt-3 rounded overflow-hidden" style={{ aspectRatio: '16/9', maxWidth: 360 }}>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        className="w-full h-full"
        allowFullScreen
        title="YouTube preview"
      />
    </div>
  )
}

// ──────────────────────────────────────────────
// 공통 레이블
// ──────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs block mb-1.5" style={labelStyle}>{children}</label>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-xl font-light mb-6" style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}>
      {children}
    </h1>
  )
}

// ──────────────────────────────────────────────
// 메인 레이아웃
// ──────────────────────────────────────────────
export default function AdminDashboard({ userEmail }: { userEmail: string }) {
  const [activeTab, setActiveTab] = useState('dashboard')
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#f0ede8' }}>
      {/* 사이드바 */}
      <aside className="w-52 flex-shrink-0 flex flex-col" style={{ backgroundColor: '#1a2744', minHeight: '100vh' }}>
        <div className="p-5 flex-1">
          <div className="mb-7">
            <span className="text-lg font-light" style={{ color: 'white', fontFamily: 'Noto Serif KR', letterSpacing: '0.1em' }}>
              柏香齋
            </span>
            <p className="text-xs mt-0.5" style={{ color: '#4a5a7a' }}>관리자 패널</p>
          </div>
          <nav className="space-y-0.5">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-sm transition-all text-left"
                style={{
                  backgroundColor: activeTab === id ? 'rgba(168,196,224,0.18)' : 'transparent',
                  color: activeTab === id ? '#a8c4e0' : '#6a7a9a',
                }}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </nav>
        </div>
        <div className="p-5 border-t" style={{ borderColor: '#2a3754' }}>
          <p className="text-xs mb-3 truncate" style={{ color: '#4a5a7a' }}>{userEmail}</p>
          <button onClick={handleLogout} className="flex items-center gap-2 text-xs" style={{ color: '#6a7a9a' }}>
            <LogOut size={13} /> 로그아웃
          </button>
        </div>
      </aside>

      {/* 콘텐츠 */}
      <main className="flex-1 p-8 overflow-auto">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'contents' && <ContentsTab />}
        {activeTab === 'programs' && <ProgramsTab />}
        {activeTab === 'members' && <MembersTab />}
        {activeTab === 'inquiries' && <InquiriesTab />}
        {activeTab === 'books' && <BooksTab />}
        {activeTab === 'bio' && <BioTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </main>
    </div>
  )
}

// ══════════════════════════════════════════════
// 대시보드
// ══════════════════════════════════════════════
function DashboardTab() {
  const supabase = createClient()
  const [stats, setStats] = useState({ members: 0, pending: 0, contents: 0, inquiries: 0 })
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const [members, pending, contents, inquiries] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_approved', false),
      supabase.from('contents').select('*', { count: 'exact', head: true }),
      supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('is_read', false),
    ])
    setStats({
      members: members.count ?? 0,
      pending: pending.count ?? 0,
      contents: contents.count ?? 0,
      inquiries: inquiries.count ?? 0,
    })
    setLoading(false)
  }, [supabase])

  useEffect(() => { load() }, [load])

  const cards = [
    { label: '전체 회원', value: stats.members, color: '#a8c4e0' },
    { label: '승인 대기', value: stats.pending, color: '#f0d4a8' },
    { label: '전체 콘텐츠', value: stats.contents, color: '#b8d4b8' },
    { label: '미읽은 문의', value: stats.inquiries, color: '#d4b8d4' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>대시보드</SectionTitle>
        <button onClick={load} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded" style={{ backgroundColor: 'white', border: '1px solid #e0dbd4', color: '#8a8580' }}>
          <RefreshCw size={12} /> 새로고침
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, color }) => (
          <div key={label} className="p-5 rounded-lg" style={card}>
            <p className="text-xs mb-2" style={{ color: '#8a8580' }}>{label}</p>
            <p className="text-3xl font-light" style={{ color: loading ? '#ccc' : '#1a2744' }}>
              {loading ? '…' : value}
            </p>
            <div className="mt-3 h-0.5 rounded" style={{ backgroundColor: color, opacity: 0.5 }} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════
// 콘텐츠 CMS
// ══════════════════════════════════════════════
type ContentRow = {
  id: string
  menu_type: '듣다' | '읽다'
  title: string
  text_body: string | null
  media_url: string | null
  tags: string[] | null
  access_level: string
  created_at: string
}

function ContentsTab() {
  const supabase = createClient()
  const [list, setList] = useState<ContentRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')

  const [menuType, setMenuType] = useState<'듣다' | '읽다'>('읽다')
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [mediaUrl, setMediaUrl] = useState('')
  const [tagsInput, setTagsInput] = useState('')
  const [accessLevel, setAccessLevel] = useState('public')

  const loadList = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('contents').select('*').order('created_at', { ascending: false })
    setList(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { loadList() }, [loadList])

  const reset = () => {
    setTitle(''); setBody(''); setMediaUrl(''); setTagsInput(''); setAccessLevel('public')
    setMenuType('읽다'); setMsg('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setSubmitting(true)
    const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : null
    const { error } = await supabase.from('contents').insert({
      menu_type: menuType,
      title: title.trim(),
      text_body: menuType === '읽다' ? body : null,
      media_url: menuType === '듣다' ? mediaUrl : null,
      tags,
      access_level: accessLevel,
    })
    setSubmitting(false)
    if (error) { setMsg('저장 실패: ' + error.message); return }
    setMsg('등록됐습니다.')
    reset()
    setShowForm(false)
    loadList()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('삭제하시겠습니까?')) return
    await supabase.from('contents').delete().eq('id', id)
    loadList()
  }

  const accessLabel: Record<string, string> = {
    public: '전체공개', subscriber: '회원', participant: '참여자', member: '정회원',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>콘텐츠 관리</SectionTitle>
        <button
          onClick={() => { setShowForm(!showForm); setMsg('') }}
          className="flex items-center gap-1.5 text-sm px-4 py-2 rounded"
          style={primaryBtn}
        >
          <Plus size={14} /> 새 콘텐츠
        </button>
      </div>

      {/* 등록 폼 */}
      {showForm && (
        <div className="p-6 rounded-lg mb-6" style={card}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium" style={{ color: '#1a2744' }}>새 콘텐츠 등록</h3>
            <button onClick={() => { setShowForm(false); reset() }}><X size={16} style={{ color: '#8a8580' }} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 유형 */}
            <div>
              <Label>콘텐츠 유형</Label>
              <div className="flex gap-2">
                {(['읽다', '듣다'] as const).map(t => (
                  <button
                    key={t} type="button" onClick={() => setMenuType(t)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded text-sm"
                    style={{ backgroundColor: menuType === t ? '#1a2744' : '#f0ede8', color: menuType === t ? 'white' : '#5a5550' }}
                  >
                    {t === '듣다' ? <Music size={13} /> : <FileText size={13} />} {t}
                  </button>
                ))}
              </div>
            </div>
            {/* 제목 */}
            <div>
              <Label>제목</Label>
              <input value={title} onChange={e => setTitle(e.target.value)} required className={input} style={inputStyle}
                placeholder={menuType === '듣다' ? '음악/강의 제목' : '글 제목'} />
            </div>
            {/* 미디어 URL (듣다) */}
            {menuType === '듣다' && (
              <div>
                <Label>YouTube URL</Label>
                <input value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} className={input} style={inputStyle}
                  placeholder="https://youtube.com/watch?v=... 또는 https://youtu.be/..." />
                {mediaUrl && <YoutubePreview url={mediaUrl} />}
              </div>
            )}
            {/* 본문 (읽다) */}
            {menuType === '읽다' && (
              <div>
                <Label>본문</Label>
                <textarea value={body} onChange={e => setBody(e.target.value)} rows={6}
                  className="w-full px-3 py-2.5 text-sm rounded outline-none resize-y"
                  style={{ ...inputStyle, lineHeight: '1.8' }} />
              </div>
            )}
            {/* 태그 */}
            <div>
              <Label>태그 (쉼표 구분)</Label>
              <input value={tagsInput} onChange={e => setTagsInput(e.target.value)} className={input} style={inputStyle}
                placeholder="배움, 성장, 음악" />
            </div>
            {/* 접근 레벨 */}
            <div>
              <Label>공개 범위</Label>
              <select value={accessLevel} onChange={e => setAccessLevel(e.target.value)}
                className={input} style={inputStyle}>
                <option value="public">전체 공개</option>
                <option value="subscriber">회원 공개</option>
                <option value="participant">참여자 이상</option>
                <option value="member">정회원 이상</option>
              </select>
            </div>
            {msg && <p className="text-xs" style={{ color: msg.includes('실패') ? '#dc2626' : '#16a34a' }}>{msg}</p>}
            <div className="flex gap-2 pt-1">
              <button type="submit" disabled={submitting} className="flex-1 py-2.5 text-sm rounded"
                style={{ ...primaryBtn, opacity: submitting ? 0.6 : 1 }}>
                {submitting ? '저장 중…' : '등록'}
              </button>
              <button type="button" onClick={() => { setShowForm(false); reset() }}
                className="px-5 py-2.5 text-sm rounded" style={{ backgroundColor: '#f0ede8', color: '#5a5550' }}>
                취소
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 목록 */}
      <div className="rounded-lg overflow-hidden" style={card}>
        {loading ? (
          <div className="p-8 text-center text-sm" style={{ color: '#c8c4be' }}>불러오는 중…</div>
        ) : list.length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: '#c8c4be' }}>등록된 콘텐츠가 없습니다.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f8f6f3', borderBottom: '1px solid #e0dbd4' }}>
                {['유형', '제목', '공개범위', '등록일', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: '#8a8580' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f0ede8' }}>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 rounded text-xs" style={{
                      backgroundColor: item.menu_type === '듣다' ? '#e8f0f8' : '#f0f8e8',
                      color: item.menu_type === '듣다' ? '#2d5a8a' : '#2d6a3d',
                    }}>
                      {item.menu_type === '듣다' ? '🎵' : '📝'} {item.menu_type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium" style={{ color: '#1a2744' }}>
                    <div>{item.title}</div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {item.tags.map(t => (
                          <span key={t} className="text-xs px-1.5 py-0.5 rounded" style={{ backgroundColor: '#f0ede8', color: '#8a8580' }}>{t}</span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#8a8580' }}>{accessLabel[item.access_level] ?? item.access_level}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#c8c4be' }}>{item.created_at.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded" style={dangerBtn}>
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════
// 프로그램 관리
// ══════════════════════════════════════════════
type ProgramRow = {
  id: string; title: string; type: string; price: number; status: string
  description: string | null; duration: string | null; participants: string | null
  location: string | null; created_at: string
}

function ProgramsTab() {
  const supabase = createClient()
  const [list, setList] = useState<ProgramRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({
    title: '', type: '온라인', price: '0', status: 'upcoming',
    description: '', duration: '', participants: '', location: '',
  })

  const loadList = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('programs').select('*').order('created_at', { ascending: false })
    setList(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { loadList() }, [loadList])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const { error } = await supabase.from('programs').insert({
      title: form.title, type: form.type, price: Number(form.price),
      status: form.status, description: form.description || null,
      duration: form.duration || null, participants: form.participants || null,
      location: form.location || null,
    })
    setSubmitting(false)
    if (error) { setMsg('저장 실패: ' + error.message); return }
    setMsg('등록됐습니다.')
    setForm({ title: '', type: '온라인', price: '0', status: 'upcoming', description: '', duration: '', participants: '', location: '' })
    setShowForm(false); loadList()
  }

  const statusLabel: Record<string, string> = { open: '모집중', closed: '마감', upcoming: '예정' }
  const statusColor: Record<string, string> = { open: '#16a34a', closed: '#dc2626', upcoming: '#d97706' }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>프로그램 관리</SectionTitle>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 text-sm px-4 py-2 rounded" style={primaryBtn}>
          <Plus size={14} /> 새 프로그램
        </button>
      </div>

      {showForm && (
        <div className="p-6 rounded-lg mb-6" style={card}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium" style={{ color: '#1a2744' }}>프로그램 등록</h3>
            <button onClick={() => setShowForm(false)}><X size={16} style={{ color: '#8a8580' }} /></button>
          </div>
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label>프로그램명</Label>
              <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                required className={input} style={inputStyle} />
            </div>
            <div>
              <Label>유형</Label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
                className={input} style={inputStyle}>
                {['온라인', '오프라인', '부모교육', '진로상담', '강사교수자', '기관의뢰'].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <Label>상태</Label>
              <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                className={input} style={inputStyle}>
                <option value="upcoming">예정</option>
                <option value="open">모집중</option>
                <option value="closed">마감</option>
              </select>
            </div>
            <div>
              <Label>가격 (원)</Label>
              <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                className={input} style={inputStyle} />
            </div>
            <div>
              <Label>기간</Label>
              <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                className={input} style={inputStyle} placeholder="예: 4주 / 매주 화요일" />
            </div>
            <div>
              <Label>정원</Label>
              <input value={form.participants} onChange={e => setForm(f => ({ ...f, participants: e.target.value }))}
                className={input} style={inputStyle} placeholder="예: 20명 이내" />
            </div>
            <div>
              <Label>장소</Label>
              <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                className={input} style={inputStyle} placeholder="온라인 Zoom / 서울 종로구…" />
            </div>
            <div className="col-span-2">
              <Label>설명</Label>
              <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={3} className="w-full px-3 py-2.5 text-sm rounded outline-none resize-y" style={{ ...inputStyle, lineHeight: '1.8' }} />
            </div>
            {msg && <p className="col-span-2 text-xs" style={{ color: msg.includes('실패') ? '#dc2626' : '#16a34a' }}>{msg}</p>}
            <div className="col-span-2 flex gap-2">
              <button type="submit" disabled={submitting} className="flex-1 py-2.5 text-sm rounded" style={{ ...primaryBtn, opacity: submitting ? 0.6 : 1 }}>
                {submitting ? '저장 중…' : '등록'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 text-sm rounded" style={{ backgroundColor: '#f0ede8', color: '#5a5550' }}>취소</button>
            </div>
          </form>
        </div>
      )}

      <div className="rounded-lg overflow-hidden" style={card}>
        {loading ? (
          <div className="p-8 text-center text-sm" style={{ color: '#c8c4be' }}>불러오는 중…</div>
        ) : list.length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: '#c8c4be' }}>등록된 프로그램이 없습니다.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f8f6f3', borderBottom: '1px solid #e0dbd4' }}>
                {['프로그램명', '유형', '가격', '상태', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: '#8a8580' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f0ede8' }}>
                  <td className="px-4 py-3 font-medium" style={{ color: '#1a2744' }}>{item.title}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#8a8580' }}>{item.type}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#8a8580' }}>{item.price === 0 ? '무료' : item.price.toLocaleString() + '원'}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium" style={{ color: statusColor[item.status] ?? '#8a8580' }}>
                      {statusLabel[item.status] ?? item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={async () => { if (confirm('삭제?')) { await supabase.from('programs').delete().eq('id', item.id); loadList() } }}
                      className="p-1.5 rounded" style={dangerBtn}>
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════
// 회원 관리
// ══════════════════════════════════════════════
type MemberRow = { id: string; email: string; display_name: string | null; role: UserRole; is_approved: boolean; created_at: string }

function MembersTab() {
  const supabase = createClient()
  const [list, setList] = useState<MemberRow[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('users').select('*').order('created_at', { ascending: false })
    setList(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { load() }, [load])

  const updateRole = async (id: string, role: UserRole) => {
    await supabase.from('users').update({ role }).eq('id', id)
    setList(prev => prev.map(m => m.id === id ? { ...m, role } : m))
  }

  const toggleApproval = async (id: string, current: boolean) => {
    await supabase.from('users').update({ is_approved: !current }).eq('id', id)
    setList(prev => prev.map(m => m.id === id ? { ...m, is_approved: !current } : m))
  }

  const roleColor: Record<string, string> = {
    admin: '#1a2744', member: '#2d5a8a', participant: '#2d6a3d', subscriber: '#8a8580', visitor: '#c8c4be',
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>회원 관리</SectionTitle>
        <button onClick={load} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded"
          style={{ backgroundColor: 'white', border: '1px solid #e0dbd4', color: '#8a8580' }}>
          <RefreshCw size={12} /> 새로고침
        </button>
      </div>
      <div className="rounded-lg overflow-hidden" style={card}>
        {loading ? (
          <div className="p-8 text-center text-sm" style={{ color: '#c8c4be' }}>불러오는 중…</div>
        ) : list.length === 0 ? (
          <div className="p-8 text-center text-sm" style={{ color: '#c8c4be' }}>가입한 회원이 없습니다.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#f8f6f3', borderBottom: '1px solid #e0dbd4' }}>
                {['이메일', '이름', '등급', '승인', '가입일'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium" style={{ color: '#8a8580' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {list.map(m => (
                <tr key={m.id} style={{ borderBottom: '1px solid #f0ede8' }}>
                  <td className="px-4 py-3" style={{ color: '#1a2744' }}>{m.email}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#8a8580' }}>{m.display_name ?? '—'}</td>
                  <td className="px-4 py-3">
                    <select
                      value={m.role}
                      onChange={e => updateRole(m.id, e.target.value as UserRole)}
                      className="text-xs px-2 py-1 rounded outline-none"
                      style={{ border: '1px solid #e0dbd4', color: roleColor[m.role] ?? '#8a8580', backgroundColor: 'white' }}
                    >
                      {(['visitor', 'subscriber', 'participant', 'member', 'admin'] as UserRole[]).map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleApproval(m.id, m.is_approved)}
                      className="flex items-center gap-1 text-xs px-2.5 py-1 rounded"
                      style={{
                        backgroundColor: m.is_approved ? '#f0fdf4' : '#fff7ed',
                        color: m.is_approved ? '#16a34a' : '#d97706',
                        border: `1px solid ${m.is_approved ? '#bbf7d0' : '#fed7aa'}`,
                      }}
                    >
                      {m.is_approved ? <><Check size={11} /> 승인됨</> : <><X size={11} /> 미승인</>}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: '#c8c4be' }}>{m.created_at.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════
// 문의 관리
// ══════════════════════════════════════════════
type InquiryRow = { id: string; type: string; name: string; email: string; organization: string | null; message: string; is_read: boolean; created_at: string }

function InquiriesTab() {
  const supabase = createClient()
  const [list, setList] = useState<InquiryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    setList(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { load() }, [load])

  const toggleRead = async (id: string, current: boolean) => {
    await supabase.from('inquiries').update({ is_read: !current }).eq('id', id)
    setList(prev => prev.map(i => i.id === id ? { ...i, is_read: !current } : i))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>문의 관리</SectionTitle>
        <button onClick={load} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded"
          style={{ backgroundColor: 'white', border: '1px solid #e0dbd4', color: '#8a8580' }}>
          <RefreshCw size={12} /> 새로고침
        </button>
      </div>
      <div className="space-y-3">
        {loading ? (
          <div className="p-8 text-center text-sm rounded-lg" style={{ ...card, color: '#c8c4be' }}>불러오는 중…</div>
        ) : list.length === 0 ? (
          <div className="p-8 text-center text-sm rounded-lg" style={{ ...card, color: '#c8c4be' }}>문의가 없습니다.</div>
        ) : list.map(item => (
          <div key={item.id} className="rounded-lg overflow-hidden" style={{ ...card, opacity: item.is_read ? 0.7 : 1 }}>
            <div className="flex items-center gap-3 px-5 py-4 cursor-pointer"
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  {!item.is_read && <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#2d5a8a' }} />}
                  <span className="text-sm font-medium truncate" style={{ color: '#1a2744' }}>{item.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: '#f0ede8', color: '#8a8580' }}>{item.type}</span>
                </div>
                <p className="text-xs truncate" style={{ color: '#8a8580' }}>{item.email}{item.organization ? ` · ${item.organization}` : ''}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs" style={{ color: '#c8c4be' }}>{item.created_at.slice(0, 10)}</span>
                <button onClick={e => { e.stopPropagation(); toggleRead(item.id, item.is_read) }}
                  className="p-1.5 rounded" style={{ backgroundColor: '#f0ede8' }}>
                  {item.is_read ? <EyeOff size={12} style={{ color: '#8a8580' }} /> : <Eye size={12} style={{ color: '#2d5a8a' }} />}
                </button>
                <ChevronDown size={14} style={{ color: '#c8c4be', transform: expanded === item.id ? 'rotate(180deg)' : 'rotate(0)', transition: '0.2s' }} />
              </div>
            </div>
            {expanded === item.id && (
              <div className="px-5 pb-4 pt-0">
                <div className="p-4 rounded text-sm leading-relaxed" style={{ backgroundColor: '#f8f6f3', color: '#3a3530', whiteSpace: 'pre-wrap' }}>
                  {item.message}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════
// 도서 관리
// ══════════════════════════════════════════════
type BookRow = { id: string; book_title: string; subtitle: string | null; cover_image_url: string | null; purchase_url_kyobo: string | null; purchase_url_yes24: string | null; quote_text: string | null; created_at: string }

function BooksTab() {
  const supabase = createClient()
  const [list, setList] = useState<BookRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [msg, setMsg] = useState('')
  const [form, setForm] = useState({ book_title: '', subtitle: '', cover_image_url: '', purchase_url_kyobo: '', purchase_url_yes24: '', quote_text: '' })

  const load = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('books_outlinks').select('*').order('created_at', { ascending: false })
    setList(data ?? [])
    setLoading(false)
  }, [supabase])

  useEffect(() => { load() }, [load])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const { error } = await supabase.from('books_outlinks').insert({
      book_title: form.book_title,
      subtitle: form.subtitle || null,
      cover_image_url: form.cover_image_url || null,
      purchase_url_kyobo: form.purchase_url_kyobo || null,
      purchase_url_yes24: form.purchase_url_yes24 || null,
      quote_text: form.quote_text || null,
    })
    setSubmitting(false)
    if (error) { setMsg('저장 실패: ' + error.message); return }
    setForm({ book_title: '', subtitle: '', cover_image_url: '', purchase_url_kyobo: '', purchase_url_yes24: '', quote_text: '' })
    setShowForm(false); load()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <SectionTitle>도서 관리</SectionTitle>
        <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 text-sm px-4 py-2 rounded" style={primaryBtn}>
          <Plus size={14} /> 도서 추가
        </button>
      </div>

      {showForm && (
        <div className="p-6 rounded-lg mb-6" style={card}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium" style={{ color: '#1a2744' }}>도서 등록</h3>
            <button onClick={() => setShowForm(false)}><X size={16} style={{ color: '#8a8580' }} /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>도서 제목 *</Label>
                <input value={form.book_title} onChange={e => setForm(f => ({ ...f, book_title: e.target.value }))}
                  required className={input} style={inputStyle} />
              </div>
              <div>
                <Label>부제</Label>
                <input value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))}
                  className={input} style={inputStyle} />
              </div>
              <div>
                <Label>표지 이미지 URL</Label>
                <input value={form.cover_image_url} onChange={e => setForm(f => ({ ...f, cover_image_url: e.target.value }))}
                  className={input} style={inputStyle} placeholder="https://..." />
              </div>
              <div>
                <Label>교보문고 링크</Label>
                <input value={form.purchase_url_kyobo} onChange={e => setForm(f => ({ ...f, purchase_url_kyobo: e.target.value }))}
                  className={input} style={inputStyle} placeholder="https://kyobo.com/..." />
              </div>
              <div>
                <Label>YES24 링크</Label>
                <input value={form.purchase_url_yes24} onChange={e => setForm(f => ({ ...f, purchase_url_yes24: e.target.value }))}
                  className={input} style={inputStyle} placeholder="https://yes24.com/..." />
              </div>
            </div>
            <div>
              <Label>인용 문구</Label>
              <textarea value={form.quote_text} onChange={e => setForm(f => ({ ...f, quote_text: e.target.value }))}
                rows={2} className="w-full px-3 py-2.5 text-sm rounded outline-none resize-none"
                style={{ ...inputStyle, lineHeight: '1.8' }} placeholder="이 책에서 가장 인상 깊은 구절…" />
            </div>
            {msg && <p className="text-xs" style={{ color: '#dc2626' }}>{msg}</p>}
            <div className="flex gap-2">
              <button type="submit" disabled={submitting} className="flex-1 py-2.5 text-sm rounded" style={{ ...primaryBtn, opacity: submitting ? 0.6 : 1 }}>
                {submitting ? '저장 중…' : '등록'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 text-sm rounded" style={{ backgroundColor: '#f0ede8', color: '#5a5550' }}>취소</button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 p-8 text-center text-sm rounded-lg" style={{ ...card, color: '#c8c4be' }}>불러오는 중…</div>
        ) : list.length === 0 ? (
          <div className="col-span-3 p-8 text-center text-sm rounded-lg" style={{ ...card, color: '#c8c4be' }}>등록된 도서가 없습니다.</div>
        ) : list.map(book => (
          <div key={book.id} className="p-4 rounded-lg" style={card}>
            {book.cover_image_url && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={book.cover_image_url} alt={book.book_title} className="w-full h-36 object-cover rounded mb-3" />
            )}
            <p className="text-sm font-medium mb-0.5" style={{ color: '#1a2744' }}>{book.book_title}</p>
            {book.subtitle && <p className="text-xs mb-2" style={{ color: '#8a8580' }}>{book.subtitle}</p>}
            {book.quote_text && <p className="text-xs italic mb-3 leading-relaxed" style={{ color: '#a8a4a0' }}>"{book.quote_text}"</p>}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {book.purchase_url_kyobo && <a href={book.purchase_url_kyobo} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#f0ede8', color: '#5a5550' }}>교보</a>}
                {book.purchase_url_yes24 && <a href={book.purchase_url_yes24} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 rounded" style={{ backgroundColor: '#f0ede8', color: '#5a5550' }}>YES24</a>}
              </div>
              <button onClick={async () => { if (confirm('삭제?')) { await supabase.from('books_outlinks').delete().eq('id', book.id); load() } }}
                className="p-1.5 rounded" style={dangerBtn}>
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ══════════════════════════════════════════════
// 백향지기 소개 관리
// ══════════════════════════════════════════════
type BioRow = {
  id: string
  name: string
  title: string | null
  summary: string | null
  career: Array<{ period: string; role: string; desc: string }>
  expertise: string[]
}

function BioTab() {
  const supabase = createClient()
  const [bio, setBio] = useState<BioRow | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [msg, setMsg] = useState('')

  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [expertiseText, setExpertiseText] = useState('')
  const [careerJson, setCareerJson] = useState('')

  useEffect(() => {
    supabase.from('bio').select('*').limit(1).single().then(({ data }) => {
      if (data) {
        setBio(data)
        setName(data.name ?? '')
        setTitle(data.title ?? '')
        setSummary(data.summary ?? '')
        setExpertiseText((data.expertise ?? []).join(', '))
        setCareerJson(JSON.stringify(data.career ?? [], null, 2))
      }
      setLoading(false)
    })
  }, [supabase])

  const save = async () => {
    setSaving(true); setMsg('')
    let parsedCareer = []
    try { parsedCareer = JSON.parse(careerJson) } catch { setMsg('이력 JSON 형식이 잘못됐습니다.'); setSaving(false); return }
    const expertise = expertiseText.split(',').map(s => s.trim()).filter(Boolean)
    const payload = { name, title, summary, career: parsedCareer, expertise, updated_at: new Date().toISOString() }
    if (bio) {
      await supabase.from('bio').update(payload).eq('id', bio.id)
    } else {
      await supabase.from('bio').insert(payload)
    }
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div>
      <SectionTitle>백향지기 소개 관리</SectionTitle>
      <p className="text-xs mb-6" style={{ color: '#8a8580' }}>
        브랜드 페이지의 &apos;백향지기 이력 보기&apos; 팝업에 표시될 정보를 편집합니다.
      </p>
      {loading ? (
        <p className="text-sm" style={{ color: '#c8c4be' }}>불러오는 중…</p>
      ) : (
        <div className="max-w-2xl space-y-5">
          <div className="p-6 rounded-lg space-y-4" style={card}>
            <div>
              <Label>이름</Label>
              <input value={name} onChange={e => setName(e.target.value)} className={input} style={inputStyle} placeholder="조중현" />
            </div>
            <div>
              <Label>직함·자격</Label>
              <input value={title} onChange={e => setTitle(e.target.value)} className={input} style={inputStyle} placeholder="교육학 박사 · 4MAT 전문 강사 · …" />
            </div>
            <div>
              <Label>소개 요약</Label>
              <textarea value={summary} onChange={e => setSummary(e.target.value)} rows={3}
                className="w-full px-3 py-2.5 text-sm rounded outline-none resize-none"
                style={{ ...inputStyle, lineHeight: '1.8' }} placeholder="소개 문단…" />
            </div>
            <div>
              <Label>전문 분야 (쉼표로 구분)</Label>
              <input value={expertiseText} onChange={e => setExpertiseText(e.target.value)} className={input} style={inputStyle} placeholder="4MAT 러닝 시스템, 진로 탐색 교육, 부모교육, …" />
            </div>
            <div>
              <Label>이력 (JSON 배열)</Label>
              <p className="text-xs mb-2" style={{ color: '#a8a4a0' }}>
                형식: {'[{"period":"現재","role":"직책","desc":"설명"},…]'}
              </p>
              <textarea value={careerJson} onChange={e => setCareerJson(e.target.value)} rows={10}
                className="w-full px-3 py-2.5 text-sm rounded outline-none resize-none font-mono"
                style={{ ...inputStyle, lineHeight: '1.6', fontSize: '0.75rem' }} />
            </div>
            {msg && <p className="text-xs" style={{ color: '#dc2626' }}>{msg}</p>}
            <button onClick={save} disabled={saving}
              className="px-6 py-2.5 text-sm rounded flex items-center gap-2"
              style={{ ...primaryBtn, opacity: saving ? 0.6 : 1 }}>
              {saved ? <><Check size={14} /> 저장됐습니다</> : saving ? '저장 중…' : '저장'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════
// 사이트 설정
// ══════════════════════════════════════════════
function SettingsTab() {
  const supabase = createClient()
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    supabase.from('site_settings').select('*').then(({ data }) => {
      const map: Record<string, string> = {}
      data?.forEach(({ key, value }) => { map[key] = value })
      setSettings(map)
      setLoading(false)
    })
  }, [supabase])

  const save = async () => {
    setSaving(true)
    await Promise.all(
      Object.entries(settings).map(([key, value]) =>
        supabase.from('site_settings').upsert({ key, value, updated_at: new Date().toISOString() })
      )
    )
    setSaving(false); setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const fields = [
    { key: 'hero_copy', label: '메인 슬로건', placeholder: '천천히, 그러나 방향은 정확하게.', rows: 1 },
    { key: 'today_sentence', label: '오늘의 문장', placeholder: '배움은 목적지가 아니라 걷는 방식입니다.', rows: 2 },
  ]

  return (
    <div>
      <SectionTitle>사이트 설정</SectionTitle>
      <div className="max-w-lg p-6 rounded-lg" style={card}>
        {loading ? (
          <p className="text-sm" style={{ color: '#c8c4be' }}>불러오는 중…</p>
        ) : (
          <div className="space-y-5">
            {fields.map(({ key, label, placeholder, rows }) => (
              <div key={key}>
                <Label>{label}</Label>
                {rows === 1 ? (
                  <input value={settings[key] ?? ''} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                    className={input} style={inputStyle} placeholder={placeholder} />
                ) : (
                  <textarea value={settings[key] ?? ''} onChange={e => setSettings(s => ({ ...s, [key]: e.target.value }))}
                    rows={rows} className="w-full px-3 py-2.5 text-sm rounded outline-none resize-none"
                    style={{ ...inputStyle, lineHeight: '1.8' }} placeholder={placeholder} />
                )}
              </div>
            ))}
            <button onClick={save} disabled={saving}
              className="px-6 py-2.5 text-sm rounded flex items-center gap-2"
              style={{ ...primaryBtn, opacity: saving ? 0.6 : 1 }}>
              {saved ? <><Check size={14} /> 저장됐습니다</> : saving ? '저장 중…' : '저장'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
