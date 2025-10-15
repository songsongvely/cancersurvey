import SurveyForm from './survey-form'

export const dynamic = 'force-dynamic'

export default function SurveyPage() {
  return (
    <div className="card space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">설문 참여</h1>
        <p className="text-slate-600 leading-relaxed">아래 항목에 응답해 주세요. (<b>익명</b> 수집)</p>
      </div>
      <div>
        <SurveyForm />
      </div>
    </div>
  )
}
