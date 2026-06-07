import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f1a33', color: '#8a8580' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* 브랜드 */}
          <div className="md:col-span-2">
            <div className="mb-4">
              <span
                className="text-2xl font-semibold"
                style={{ color: 'white', fontFamily: 'Noto Serif KR, Georgia, serif', letterSpacing: '0.2em' }}
              >
                柏香齋
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#8a8580' }}>
              "천천히, 그러나 방향은 정확하게."<br />
              각자의 때와 방식으로 성장하는 사람들을 위한<br />
              조용한 배움의 공간입니다.
            </p>
            <p className="text-xs" style={{ color: '#5a5550' }}>
              운영자: 조중현 교수
            </p>
          </div>

          {/* 메뉴 */}
          <div>
            <h4 className="text-sm mb-4 tracking-wider" style={{ color: '#c8c4be' }}>메뉴</h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/brand', label: '백향재' },
                { href: '/listen', label: '듣다' },
                { href: '/read', label: '읽다' },
                { href: '/learn', label: '배우다' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#8a8580' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm mb-4 tracking-wider" style={{ color: '#c8c4be' }}>공간</h4>
            <ul className="flex flex-col gap-2">
              {[
                { href: '/explore', label: '알아가다' },
                { href: '/community', label: '함께하다' },
                { href: '/contact', label: '문의하기' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm transition-colors hover:text-white"
                    style={{ color: '#8a8580' }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <p className="text-xs" style={{ color: '#3a3530' }}>
            © 2025 백향재 · Baekhyangjae. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/contact" className="text-xs transition-colors hover:text-white" style={{ color: '#5a5550' }}>
              문의하기
            </Link>
            <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: '#5a5550' }}>
              이용약관
            </a>
            <a href="#" className="text-xs transition-colors hover:text-white" style={{ color: '#5a5550' }}>
              개인정보처리방침
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
