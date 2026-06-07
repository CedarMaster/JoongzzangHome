'use client'

interface PageHeroProps {
  imageUrl: string
  label: string
  titleKo: string
  titleZh?: string
  subtitle?: string
  objectPosition?: string
  minHeight?: string
  /** 히어로 바로 아래 섹션의 배경색 — 페이드가 이 색으로 녹아들도록 맞춰줍니다 */
  bottomColor?: string
}

export default function PageHero({
  imageUrl,
  label,
  titleKo,
  titleZh,
  subtitle,
  objectPosition = 'center 40%',
  minHeight = '52vh',
  bottomColor = '#faf8f5',
}: PageHeroProps) {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ minHeight }}
    >
      {/* 배경 이미지 */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition }}
      />

      {/* 메인 오버레이 — 상단→중간은 사진 색감 유지, 하단은 bottomColor로 완전히 녹아들도록 */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(8,18,36,0.58) 0%,
            rgba(10,24,44,0.42) 42%,
            rgba(8,18,36,0.80) 72%,
            ${bottomColor} 100%
          )`,
        }}
      />

      {/* 하단 블렌딩 페이드 — 충분한 높이로 경계선을 완전히 없앰 */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '220px',
          background: `linear-gradient(
            to bottom,
            transparent 0%,
            ${bottomColor}cc 55%,
            ${bottomColor} 100%
          )`,
        }}
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 text-center px-6 py-20">
        <p
          className="text-xs tracking-[0.45em] mb-6"
          style={{
            color: 'rgba(200, 190, 175, 0.7)',
            fontFamily: '"Noto Sans KR", sans-serif',
          }}
        >
          {label}
        </p>

        {titleZh && (
          <p
            className="font-thin mb-3"
            style={{
              color: '#f4ede0',
              fontFamily: '"Noto Serif KR", Georgia, serif',
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              letterSpacing: '0.3em',
              textShadow: '0 2px 20px rgba(0,0,0,0.4)',
            }}
          >
            {titleZh}
          </p>
        )}

        <h1
          className="font-light"
          style={{
            color: '#f4ede0',
            fontFamily: '"Noto Serif KR", Georgia, serif',
            fontSize: titleZh ? 'clamp(1.1rem, 2.5vw, 1.5rem)' : 'clamp(1.6rem, 5vw, 2.8rem)',
            letterSpacing: titleZh ? '0.15em' : '0.1em',
            textShadow: '0 1px 16px rgba(0,0,0,0.3)',
          }}
        >
          {titleKo}
        </h1>

        {subtitle && (
          <>
            <div className="flex items-center justify-center gap-4 mt-5 mb-4">
              <div className="w-8 h-px" style={{ backgroundColor: 'rgba(212,196,164,0.35)' }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'rgba(212,196,164,0.45)' }} />
              <div className="w-8 h-px" style={{ backgroundColor: 'rgba(212,196,164,0.35)' }} />
            </div>
            <p
              className="font-light"
              style={{
                color: 'rgba(200, 190, 175, 0.75)',
                fontFamily: '"Noto Sans KR", sans-serif',
                fontSize: '0.82rem',
                letterSpacing: '0.05em',
              }}
            >
              {subtitle}
            </p>
          </>
        )}
      </div>
    </section>
  )
}
