import Link from 'next/link'

export default function ThanksPage() {
  return (
    <div className="card space-y-6 text-center">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">참여해 주셔서 감사합니다!</h1>
        <p className="text-slate-700">소중한 응답은 암 예방/검진 인식 개선에 큰 도움이 됩니다.</p>
      </div>
      <div>
        <Link href="/" className="btn">처음으로</Link>
      </div>
    </div>
  )
}
