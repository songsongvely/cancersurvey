import Link from 'next/link'
import ConsentPanel from '@/components/ConsentPanel'

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="card">
        <h1 className="text-2xl font-semibold">암 설문조사</h1>
        <p className="mt-4 text-slate-300">
          본 설문은 암 예방, 진단, 검진, 생활습관과 관련된 인식을 파악하기 위한 <b>익명</b> 조사입니다.
          설문 결과는 통계 분석 및 서비스 개선에만 사용되며, 의료적 진단이나 치료를 제공하지 않습니다.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/survey" className="btn">설문 시작</Link>
          <Link href="/privacy" className="btn-ghost">개인정보 안내</Link>
        </div>
      </section>
      <ConsentPanel />
    </div>
  )
}
