import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const subMenus = [
  { id: 'about', title: '백향재란' },
  { id: 'philosophy', title: '우리의 철학' },
  { id: 'principles', title: '공간의 원칙' },
  { id: 'host', title: '운영자 소개' },
  { id: 'history', title: '걸어온 길' },
]

export default function BrandPage() {
  return (
    <div>
      {/* 헤더 */}
      <section className="py-32 px-6 text-center" style={{ backgroundColor: '#1a2744' }}>
        <p className="text-xs tracking-[0.4em] mb-8" style={{ color: '#5a6a8a' }}>ABOUT</p>
        <h1
          className="text-5xl md:text-6xl font-thin mb-5"
          style={{ color: 'white', fontFamily: 'Noto Serif KR, Georgia, serif', letterSpacing: '0.25em' }}
        >
          柏香齋
        </h1>
        <p className="text-sm tracking-[0.3em] mb-8" style={{ color: '#a8c4e0' }}>백향재</p>
        <p
          className="text-base font-light"
          style={{ color: '#8a9ab5', fontFamily: 'Noto Serif KR, Georgia, serif' }}
        >
          천천히, 그러나 방향은 정확하게.
        </p>
      </section>

      {/* 하위 메뉴 */}
      <nav className="sticky top-16 z-40 py-4 px-6" style={{ backgroundColor: '#faf8f5', borderBottom: '1px solid #e0dbd4' }}>
        <div className="max-w-4xl mx-auto flex gap-8 overflow-x-auto">
          {subMenus.map((m) => (
            <a
              key={m.id}
              href={`#${m.id}`}
              className="text-sm whitespace-nowrap pb-1 transition-colors"
              style={{ color: '#8a8580' }}
            >
              {m.title}
            </a>
          ))}
        </div>
      </nav>

      {/* 백향재란 */}
      <section id="about" className="py-28 px-6" style={{ backgroundColor: '#faf8f5' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] mb-8" style={{ color: '#8a8580' }}>ABOUT</p>
          <h2
            className="text-2xl font-light mb-10"
            style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            백향재란
          </h2>
          <div className="space-y-7 leading-[2.2] text-base" style={{ color: '#5a5550' }}>
            <p>
              백향재(柏香齋) — 측백나무(柏)처럼 <em style={{ fontStyle: 'normal', color: '#1a2744' }}>흔들리지 않는 가치</em> 위에,
              삶에 오래 남는 <em style={{ fontStyle: 'normal', color: '#1a2744' }}>향기(香)</em>를 품은
              배우고 성찰하는 <em style={{ fontStyle: 'normal', color: '#1a2744' }}>공간(齋)</em>입니다.
            </p>
            <p>
              진로를 고민하는 청년, 자녀와의 관계를 회복하고 싶은 부모,
              더 좋은 교육자가 되고 싶은 선생님, 그리고 삶의 방향을 다시 묻고 싶은 어른.
              백향재는 그 모든 여정 옆에서 조용히 함께합니다.
            </p>
            <p>
              빠른 성공보다 <em style={{ fontStyle: 'normal', color: '#1a2744' }}>깊은 성장</em>을 지향합니다.
              각자의 때가 있고, 각자의 방식이 있습니다.
              이 공간은 그 사실을 믿는 사람들을 위해 만들어졌습니다.
            </p>
          </div>
        </div>
      </section>

      {/* 우리의 철학 */}
      <section id="philosophy" className="py-28 px-6" style={{ backgroundColor: '#1a2744' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] mb-8" style={{ color: '#5a6a8a' }}>PHILOSOPHY</p>
          <h2
            className="text-2xl font-light mb-12"
            style={{ color: 'white', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            우리의 철학
          </h2>
          <div className="space-y-10">
            {[
              {
                num: '01',
                title: '천천히, 그러나 방향은 정확하게',
                body: '서두름은 종종 방향을 잃게 합니다. 백향재는 각자의 속도를 존중하되, 가야 할 방향만큼은 함께 고민합니다. 빠른 결과가 아닌 올바른 과정을 믿습니다.',
              },
              {
                num: '02',
                title: '이론은 숨기고, 경험은 살린다',
                body: '좋은 배움은 어렵게 느껴지지 않습니다. 깊은 이론적 토대 위에 서되, 배우는 사람이 자연스럽게 자신을 탐색하고 성장할 수 있는 경험을 설계합니다.',
              },
              {
                num: '03',
                title: '각자의 때를 믿는다',
                body: '모든 사람은 성장의 때가 다릅니다. 비교나 재촉 없이, 지금 이 순간 자신에게 맞는 속도로 걸어갈 수 있도록 조용히 곁에 있겠습니다.',
              },
            ].map((item) => (
              <div key={item.num} className="flex gap-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '2.5rem' }}>
                <span className="text-xs font-mono flex-shrink-0 mt-1" style={{ color: '#3a4a6a' }}>{item.num}</span>
                <div>
                  <h3 className="text-base font-medium mb-3" style={{ color: '#a8c4e0' }}>{item.title}</h3>
                  <p className="text-sm leading-loose" style={{ color: '#7a8a9a' }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 공간의 원칙 */}
      <section id="principles" className="py-28 px-6" style={{ backgroundColor: '#faf8f5' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] mb-8" style={{ color: '#8a8580' }}>PRINCIPLES</p>
          <h2
            className="text-2xl font-light mb-10"
            style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            공간의 원칙
          </h2>
          <p className="text-sm leading-loose mb-10" style={{ color: '#8a8580' }}>
            백향재가 어떤 공간이 되고자 하는지를 담은 약속입니다.
          </p>
          <ul className="space-y-5">
            {[
              { title: '성장 속도는 각자가 정한다', body: '빠르고 느림에 우열이 없습니다. 이 공간은 각자의 페이스를 있는 그대로 존중합니다.' },
              { title: '비교보다 자신의 기준을', body: '남과 비교하는 대신, 어제의 나와 오늘의 나를 바라봅니다.' },
              { title: '진정성 있는 콘텐츠', body: '상업적 목적보다 배움의 가치를 앞세웁니다. 우리가 전하는 내용은 직접 경험하고 검증한 것들입니다.' },
              { title: '배운 것이 삶에 살아나야 한다', body: '강의실 안의 배움으로 끝나지 않고, 일상의 관계와 선택 속에서 살아나는 것이 진짜 배움입니다.' },
              { title: '함께 걸어가는 여정', body: '혼자가 아닙니다. 같은 방향을 바라보는 사람들과 함께 걸어갑니다.' },
            ].map((p, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="flex-shrink-0 w-1 h-1 rounded-full mt-3" style={{ backgroundColor: '#a8c4e0' }} />
                <div>
                  <p className="text-sm font-medium mb-1" style={{ color: '#1a2744' }}>{p.title}</p>
                  <p className="text-sm leading-relaxed" style={{ color: '#8a8580' }}>{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 운영자 소개 */}
      <section id="host" className="py-28 px-6" style={{ backgroundColor: '#f0ede8' }}>
        <div className="max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.3em] mb-8" style={{ color: '#8a8580' }}>HOST</p>
          <h2
            className="text-2xl font-light mb-14"
            style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            운영자 소개
          </h2>
          <div className="flex flex-col md:flex-row gap-14 items-start">
            {/* 프로필 이미지 */}
            <div className="flex-shrink-0 flex flex-col gap-4 items-center">
              <div className="w-44 h-44 rounded-full overflow-hidden" style={{ border: '3px solid #e0dbd4' }}>
                <Image
                  src="/images/jz-casual.jpg"
                  alt="조중현"
                  width={176}
                  height={176}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex gap-2">
                <div className="w-14 h-14 rounded-lg overflow-hidden" style={{ border: '1px solid #e0dbd4' }}>
                  <Image
                    src="/images/jz-formal.jpg"
                    alt="조중현 프로필"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="w-14 h-14 rounded-lg overflow-hidden" style={{ border: '1px solid #e0dbd4' }}>
                  <Image
                    src="/images/jz-profile.jpg"
                    alt="조중현"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              </div>
            </div>
            <div className="flex-1">
              <h3
                className="text-xl font-medium mb-1"
                style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
              >
                조중현
              </h3>
              <p className="text-sm mb-8" style={{ color: '#8a8580', letterSpacing: '0.05em' }}>
                교육학 박사 · 4MAT 전문 강사 · 진로·상담 교육 전문가
              </p>

              <div className="space-y-5 text-sm leading-loose mb-10" style={{ color: '#5a5550' }}>
                <p>
                  교육학과 진로 상담, 뇌기반 학습을 바탕으로 학생·부모·교사·교수자와 함께 성장의 길을 걸어왔습니다.
                  강의실 안팎에서 만난 수많은 사람들의 이야기가 백향재의 씨앗이 되었습니다.
                </p>
                <p>
                  오랜 시간 4MAT 러닝 시스템을 연구하고 적용해왔습니다.
                  왜(Why) 배우는지를 먼저 묻고, 무엇을(What) 어떻게(How) 배울지 설계하며, 그것이 삶에 어떻게(If) 연결되는지를 탐색하는 과정이 백향재 모든 프로그램의 뼈대입니다.
                </p>
                <p>
                  지금도 여전히 배우는 중입니다.
                  그 과정을 이 공간에서 솔직하게 나눕니다.
                </p>
              </div>

              {/* 전문 분야 */}
              <div className="mb-8">
                <p className="text-xs tracking-widest mb-4" style={{ color: '#c8c4be' }}>EXPERTISE</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    '4MAT 러닝 시스템',
                    '진로 탐색 교육',
                    '부모교육',
                    '뇌기반 상담',
                    '강사·교수자 역량',
                    '자기이해 워크북',
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 rounded-full"
                      style={{ backgroundColor: 'rgba(168, 196, 224, 0.18)', color: '#2d3f6b' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 저서 */}
              <div>
                <p className="text-xs tracking-widest mb-4" style={{ color: '#c8c4be' }}>BOOKS</p>
                <div className="flex items-center gap-4 p-4 rounded-lg" style={{ backgroundColor: 'white', border: '1px solid #e0dbd4' }}>
                  <div
                    className="w-12 h-16 rounded flex items-center justify-center flex-shrink-0 text-xl"
                    style={{ backgroundColor: '#c4dcc830' }}
                  >
                    📗
                  </div>
                  <div>
                    <p className="text-sm font-medium" style={{ color: '#1a2744' }}>나를 물들이는 시간</p>
                    <p className="text-xs mt-0.5" style={{ color: '#8a8580' }}>색과 모양으로 나를 이해하고 회복하는 자기탐색 컬러링북</p>
                    <Link href="/explore" className="text-xs mt-2 inline-block" style={{ color: '#a8c4e0' }}>
                      서재에서 보기 →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 걸어온 길 */}
      <section id="history" className="py-28 px-6" style={{ backgroundColor: '#faf8f5' }}>
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-[0.3em] mb-8" style={{ color: '#8a8580' }}>HISTORY</p>
          <h2
            className="text-2xl font-light mb-14"
            style={{ color: '#1a2744', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            걸어온 길
          </h2>
          <div>
            {[
              {
                year: '2025',
                event: '백향재 공식 오픈',
                desc: '온라인 배움의 공간으로 문을 열다. 듣다·읽다·배우다·알아가다·함께하다로 이어지는 공간을 구성.',
              },
              {
                year: '2026',
                event: '『나를 물들이는 시간』 출간',
                desc: '색과 모양으로 나를 이해하고 회복하는 자기탐색 컬러링북. 이론은 숨기고 경험은 살린 자기탐색 워크북.',
              },
              {
                year: '진행 중',
                event: '4MAT 기반 진단 시스템 개발',
                desc: '부모교육·진로코칭·뇌기반 상담 세 테마의 스토리텔링형 진단 검사. Phase 2로 오픈 예정.',
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-8 mb-0">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                    style={{ backgroundColor: '#a8c4e0' }}
                  />
                  {i < 2 && <div className="w-px flex-1" style={{ backgroundColor: '#e0dbd4', minHeight: '60px' }} />}
                </div>
                <div className="pb-10">
                  <span className="text-xs font-mono" style={{ color: '#a8c4e0' }}>{item.year}</span>
                  <h3 className="text-sm font-medium mt-1 mb-2" style={{ color: '#1a2744' }}>{item.event}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#8a8580' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 하단 CTA */}
      <section className="py-20 px-6" style={{ backgroundColor: '#1a2744' }}>
        <div className="max-w-xl mx-auto text-center">
          <p
            className="text-base font-light mb-3"
            style={{ color: '#c8c4be', fontFamily: 'Noto Serif KR, Georgia, serif' }}
          >
            "각자의 때와 방식으로 성장하는 사람들의 공간"
          </p>
          <p className="text-sm mb-10" style={{ color: '#5a6a8a' }}>백향재의 여러 공간을 탐험해보세요.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/learn"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded text-sm"
              style={{ backgroundColor: 'white', color: '#1a2744' }}
            >
              프로그램 보기 <ArrowRight size={14} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded text-sm"
              style={{ border: '1.5px solid rgba(168,196,224,0.4)', color: '#a8c4e0' }}
            >
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
