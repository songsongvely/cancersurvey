export default function PrivacyPage() {
  const email = process.env.CONTACT_EMAIL || 'contact@example.com'
  return (
    <div className="card space-y-4">
      <h1 className="text-2xl font-semibold">개인정보 처리 안내</h1>
      <p className="text-slate-300">
        본 설문은 익명으로 진행됩니다. 이름·전화번호 등 직접 식별 가능한 정보는 요구하지 않습니다.
        선택적으로 이메일을 입력할 수 있으며, 이 경우 <b>추가 연락에 동의</b>한 응답에 한해 연구 정보 안내 목적으로만 사용합니다.
      </p>
      <ul className="list-disc pl-5 space-y-1 text-slate-300">
        <li>수집 항목: 연령대, 성별, 지역, 생활습관, 검진/증상 경험, 인식 수준 등</li>
        <li>보관 기간: 수집일로부터 2년 또는 연구 종료 시점 중 이른 시점까지</li>
        <li>안전성: 전송 암호화(HTTPS), 접근 통제, 최소 수집 원칙</li>
        <li>권리: 열람/삭제/이의 제기 — <a href={`mailto:${email}`}>{email}</a>로 요청</li>
        <li>의료 고지: 본 설문은 의료 조언이 아니며, 건강 문제는 전문의와 상담하세요.</li>
      </ul>
      <p className="text-xs text-slate-400">실제 운영 정책에 맞게 본 문구를 조정하세요.</p>
    </div>
  )
}
