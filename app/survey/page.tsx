import SurveyForm from './survey-form'

export const dynamic = 'force-dynamic'

export default function SurveyPage() {
  return (
    <div className="card">
      <h1 className="text-2xl font-semibold">설문 참여</h1>
      <p className="mt-2 text-slate-300">아래 항목에 응답해 주세요. (<b>익명</b> 수집)</p>
      <div className="mt-6">
        <SurveyForm />
      </div>
    </div>
  )
}
