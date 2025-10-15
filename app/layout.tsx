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
      <body>
        <header className="border-b border-white/10">
          <div className="container-narrow py-4 flex items-center justify-between">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              암 설문조사
            </Link>
            <nav className="space-x-4">
              <Link className="btn-ghost" href="/survey">설문 시작</Link>
              <Link className="btn-ghost" href="/privacy">개인정보 안내</Link>
            </nav>
          </div>
        </header>
        <main className="container-narrow py-10">{children}</main>
        <footer className="container-narrow py-10 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} Cancer Survey. 이 웹사이트는 연구 및 서비스 개선 목적의 익명 설문을 위해 제작되었습니다.</p>
        </footer>
      </body>
    </html>
  )
}
