'use client'

import { useState } from 'react'

export default function ConsentPanel() {
  const [open, setOpen] = useState(false)
  return (
    <section className="card">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">참여 동의 및 개인정보 안내</h2>
        <button className="btn-ghost" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
          {open ? '접기' : '자세히'}
        </button>
      </div>
      <div className="mt-4 space-y-4 text-slate-700 leading-relaxed">
        <p className="font-medium text-slate-800">이 설문은 익명으로 진행되며, 이름·주민번호 등 직접 식별 정보는 수집하지 않습니다.</p>
        {open && (
          <div className="space-y-4">
            <ul className="list-disc pl-5 space-y-2">
              <li><b>목적:</b> 암 예방/검진 인식 및 생활습관 통계 파악</li>
              <li><b>수집 항목:</b> 연령대, 성별, 지역, 생활습관, 암 검진/증상 경험 등 (선택 항목 포함)</li>
              <li><b>보관 기간:</b> 수집일로부터 2년 또는 연구 종료 시점 중 이른 시점까지</li>
              <li><b>보안:</b> 전송 구간 암호화(HTTPS), 최소 권한 접근, 데이터베이스 암호화 저장(서버 설정에 따름)</li>
              <li><b>권리:</b> 언제든지 참여 철회 가능. 삭제/열람 요청: <a href="mailto:songkyumyeon@naver.com">songkyumyeon@naver.com</a></li>
              <li><b>의료 고지:</b> 본 설문은 의료 조언이 아니며, 응급 증상 시 119 또는 인근 응급실에 연락하세요.</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  )
}
