# 암 설문조사 웹사이트 (Next.js + Prisma + Tailwind)

한국어 기반의 익명 암 설문조사 웹앱 템플릿입니다. 기본 수집 항목, 동의/개인정보 안내, 관리자 대시보드/CSV 내보내기를 포함합니다.

## 빠른 시작

1) **환경 변수** 준비
```bash
cp .env.example .env
# .env 파일에서 ADMIN_KEY, CONTACT_EMAIL 등을 수정하세요.
```

2) **의존성 설치 & DB 준비**
```bash
npm install
# 또는 pnpm i / yarn
npx prisma db push
# (선택) 최초 마이그레이션 파일을 만들려면
# npm run prisma:migrate
```

3) **개발 서버 실행**
```bash
npm run dev
# http://localhost:3000
# 관리자 대시보드: http://localhost:3000/admin?key=YOUR_ADMIN_KEY
```

4) **배포**
- SQLite는 단일 파일 DB입니다. 서버/호스팅 환경(예: Vercel, Render, Fly, 자체 서버)에 맞게 DATABASE_URL을 조정하세요.
- 트래픽이 많으면 PostgreSQL 같은 외부 DB 사용을 권장합니다.

## 기능

- App Router(Next.js 14) 기반
- Prisma + SQLite (간편 시작)
- Tailwind 기반 다크 테마 폼
- Zod + React Hook Form 검증
- 개인(선택)·가족력·검진·증상·생활습관·인식 항목
- BMI 계산(선택 입력)
- 동의 체크 및 개인정보 안내
- 관리자 대시보드(요약 막대) & CSV 내보내기

## 보안/개인정보 체크리스트 (운영 전)

- [ ] **HTTPS** 강제 (프록시/호스팅 설정)
- [ ] **ADMIN_KEY** 충분히 길고 복잡하게 설정
- [ ] 서버/DB **백업/암호화** 정책 적용
- [ ] **접근 로그** 및 **오용 방지** (봇 차단, rate limit 등)
- [ ] **개인정보 최소 수집** 유지, 이메일 수집은 **동의 기반**
- [ ] **보관 기간** 및 **삭제 절차** 문서화
- [ ] 개인정보 처리방침/약관 문구를 실제 정책에 맞게 갱신

## 폴더 구조

```
app/
  api/
    export/route.ts      # CSV 다운로드 (관리자 키 검사)
    submit/route.ts      # 설문 제출 처리
  admin/page.tsx         # 관리자 대시보드
  privacy/page.tsx       # 개인정보 안내
  survey/
    page.tsx             # 설문 페이지(서버)
    survey-form.tsx      # 설문 폼(클라이언트)
  layout.tsx
  page.tsx
components/
  ConsentPanel.tsx
lib/
  db.ts
  utils.ts
  validators.ts
prisma/
  schema.prisma
```

## 라이선스

MIT. 상업/비상업 목적 모두 자유롭게 수정·활용하세요.
# cancersurvey
