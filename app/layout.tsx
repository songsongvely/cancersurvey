import './globals.css'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '암 설문조사 | Cancer Survey',
  description: '익명 암 설문조사 웹사이트',
  metadataBase: new URL('http://localhost:3000')
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white/80 backdrop-blur shadow-sm">
            <div className="container-narrow flex flex-wrap items-center justify-between gap-3 py-4 sm:h-16 sm:flex-nowrap sm:py-0">
              <Link href="/" className="group flex flex-col leading-tight">
                <span className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-600 transition-colors group-hover:text-blue-600 sm:text-xs sm:tracking-[0.45em]">
                  단국대학교 의과대학
                </span>
                <span className="whitespace-nowrap text-base font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 sm:text-lg">
                  지역 사회 의학 3조
                </span>
              </Link>
              <nav className="flex w-full flex-wrap items-center gap-2 justify-start sm:w-auto sm:flex-nowrap sm:justify-end">
                <Link className="btn-ghost whitespace-nowrap" href="/survey">설문 시작</Link>
                <Link className="btn-ghost whitespace-nowrap" href="/privacy">개인정보 안내</Link>
              </nav>
            </div>
          </header>
          <main className="container-narrow flex-1 py-12">{children}</main>
          <footer className="border-t border-slate-200 bg-white/80">
            <div className="container-narrow py-10 text-sm text-slate-500">
              <p>© {new Date().getFullYear()} Cancer Survey. 이 웹사이트는 연구 및 서비스 개선 목적의 익명 설문을 위해 제작되었습니다.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
