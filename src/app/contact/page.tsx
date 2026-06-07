'use client'

import { useState } from 'react'
import { MessageCircle, Send, CheckCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import PageHero from '@/components/ui/PageHero'

const contactTypes = [
  { id: 'lecture', label: '강의 의뢰', emoji: '🎤', desc: '기관/단체 강의 의뢰' },
  { id: 'program', label: '프로그램 제안', emoji: '💡', desc: '새로운 프로그램 아이디어' },
  { id: 'content', label: '콘텐츠 협업', emoji: '✍️', desc: '콘텐츠 공동 제작 제안' },
  { id: 'space', label: '공간/모임 문의', emoji: '🏠', desc: '공간 대여 및 모임 협력' },
  { id: 'general', label: '1:1 일반 문의', emoji: '💬', desc: '기타 문의 사항' },
]

export default function ContactPage() {
  const [selectedType, setSelectedType] = useState('general')
  const [formData, setFormData] = useState({ name: '', email: '', organization: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.from('inquiries' as never).insert([{
        type: selectedType,
        name: formData.name,
        email: formData.email,
        organization: formData.organization || null,
        message: formData.message,
      }])

      if (!error) {
        setSubmitted(true)
        setFormData({ name: '', email: '', organization: '', message: '' })
      }
    } catch {
      // Supabase 미설정 시에도 UI 흐름 유지
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* 히어로 */}
      <PageHero
        imageUrl="https://images.unsplash.com/photo-1448375240586-882707db888b?w=1920&q=80"
        label="CONTACT"
        titleKo="문의하기"
        subtitle="강의 의뢰, 협업 제안, 모든 문의를 환영합니다."
        objectPosition="center 60%"
        minHeight="46vh"
      />

      {/* 문의 폼 */}
      <section className="py-20 px-6" style={{ backgroundColor: '#faf8f5' }}>
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="text-center py-16">
              <CheckCircle size={48} style={{ color: '#c4dcc8', margin: '0 auto 16px' }} />
              <h2
                className="text-xl font-light mb-4"
                style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
              >
                문의가 접수되었습니다.
              </h2>
              <p className="text-sm" style={{ color: '#8a8580' }}>
                빠른 시일 내에 답변 드리겠습니다.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-8 text-sm"
                style={{ color: '#a8c4e0' }}
              >
                추가 문의하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 문의 유형 */}
              <div>
                <label className="text-sm block mb-4" style={{ color: '#5a5550' }}>문의 유형</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {contactTypes.map((type) => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className="p-4 rounded-lg text-left transition-all"
                      style={{
                        backgroundColor: selectedType === type.id ? '#1a2744' : 'white',
                        border: selectedType === type.id ? '1.5px solid #1a2744' : '1px solid #e0dbd4',
                        color: selectedType === type.id ? 'white' : '#5a5550',
                      }}
                    >
                      <span className="text-xl block mb-1">{type.emoji}</span>
                      <span className="text-xs font-medium">{type.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 입력 필드 */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>이름 *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded outline-none transition-all"
                      style={{ border: '1px solid #e0dbd4', backgroundColor: 'white', color: '#1a2744' }}
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>이메일 *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 text-sm rounded outline-none transition-all"
                      style={{ border: '1px solid #e0dbd4', backgroundColor: 'white', color: '#1a2744' }}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>소속 기관 (선택)</label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 text-sm rounded outline-none transition-all"
                    style={{ border: '1px solid #e0dbd4', backgroundColor: 'white', color: '#1a2744' }}
                    placeholder="회사명 / 학교명 / 기관명"
                  />
                </div>

                <div>
                  <label className="text-xs block mb-2" style={{ color: '#8a8580' }}>문의 내용 *</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 text-sm rounded outline-none resize-none transition-all"
                    style={{ border: '1px solid #e0dbd4', backgroundColor: 'white', color: '#1a2744', lineHeight: '1.8' }}
                    placeholder="문의하실 내용을 자유롭게 적어주세요."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 text-sm rounded transition-all flex items-center justify-center gap-2"
                style={{
                  backgroundColor: loading ? '#8a9ab5' : '#1a2744',
                  color: 'white',
                }}
              >
                {loading ? '전송 중...' : (
                  <>
                    <Send size={14} />
                    문의 보내기
                  </>
                )}
              </button>

              <p className="text-xs text-center" style={{ color: '#c8c4be' }}>
                제출한 정보는 문의 답변 목적으로만 사용됩니다.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* 빠른 답변 안내 */}
      <section className="py-14 px-6" style={{ backgroundColor: '#1a2744' }}>
        <div className="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 text-center md:text-left">
          {[
            { emoji: '⏱️', title: '답변 시간', desc: '평일 기준 1-3일 이내 답변' },
            { emoji: '📧', title: '이메일 문의', desc: 'baekhyangjae@gmail.com' },
            { emoji: '🤝', title: '협업 환영', desc: '교육, 콘텐츠, 공간 협력 적극 검토' },
          ].map((item, i) => (
            <div key={i} className="flex-1">
              <span className="text-2xl block mb-2">{item.emoji}</span>
              <h3 className="text-sm font-medium mb-1" style={{ color: '#c8c4be' }}>{item.title}</h3>
              <p className="text-xs" style={{ color: '#5a6a8a' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
