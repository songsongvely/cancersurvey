import Link from 'next/link'

export default function ThanksPage() {
  return (
    <div className="card text-center">
      <h1 className="text-2xl font-semibold">참여해 주셔서 감사합니다!</h1>
      <p className="mt-3 text-slate-300">소중한 응답은 암 예방/검진 인식 개선에 큰 도움이 됩니다.</p>
      <div className="mt-6">
        <Link href="/" className="btn">처음으로</Link>
      </div>
    </div>
  )
}
