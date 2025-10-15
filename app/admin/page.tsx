import { prisma } from "@/lib/db";
import Link from "next/link";

export const dynamic = "force-dynamic";

function Bar({
  label,
  count,
  total,
}: {
  label: string;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-700 font-medium">{label}</span>
        <span className="text-slate-500">
          {count}명 ({pct}%)
        </span>
      </div>
      <div className="progress-wrap mt-1">
        <div className="progress-bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function safeParseArray(jsonStr: string | null): string[] {
  if (!jsonStr) return [];
  try {
    const v = JSON.parse(jsonStr);
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { key?: string };
}) {
  const key = searchParams?.key;
  const adminKey = process.env.ADMIN_KEY;
  const authorized = adminKey && key === adminKey;

  if (!authorized) {
    return (
      <div className="card space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">관리자</h1>
        <p className="text-rose-500">
          접근 권한이 없습니다. URL에 <code>?key=...</code>를 포함해 주세요.
        </p>
      </div>
    );
  }

  const responses = await prisma.response.findMany({
    orderBy: { createdAt: "desc" },
  });
  const total = responses.length;

  const countBy = (key: keyof (typeof responses)[number]) => (val: string) =>
    responses.filter((r: any) => r[key] === val).length;

  const countIncludes =
    (key: keyof (typeof responses)[number]) => (val: string) =>
      responses.reduce(
        (acc, r: any) =>
          acc + (safeParseArray(r[key] as any).includes(val) ? 1 : 0),
        0
      );

  const sexVals = [
    { v: "MALE", label: "남성" },
    { v: "FEMALE", label: "여성" },
    { v: "OTHER", label: "기타" },
  ];
  const ageVals = [
    { v: "A18_29", label: "18-29" },
    { v: "A30_39", label: "30-39" },
    { v: "A40_49", label: "40-49" },
    { v: "A50_59", label: "50-59" },
    { v: "A60_69", label: "60-69" },
    { v: "A70_PLUS", label: "70+" },
  ];
  const smokingVals = [
    { v: "NEVER", label: "비흡연" },
    { v: "FORMER", label: "과거 흡연" },
    { v: "CURRENT", label: "현재 흡연" },
  ];
  const bmiVals = [
    { v: "UNDERWEIGHT", label: "저체중" },
    { v: "NORMAL", label: "정상" },
    { v: "OVERWEIGHT", label: "과체중" },
    { v: "OBESE", label: "비만" },
  ];
  const symptomVals = [
    "원인 모를 체중감소",
    "지속적 피로",
    "만성 통증",
    "지속 기침/쉰목소리",
    "혈변/혈뇨",
    "덩어리(혹) 만져짐",
    "삼키기 어려움",
    "피부/점 변화",
    "해당 없음",
  ];

  return (
    <div className="space-y-8">
      <div className="card space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">관리자 대시보드</h1>
          <Link className="btn" href={`/api/export?key=${key}`}>
            CSV 다운로드
          </Link>
        </div>
        <p className="text-slate-600">
          총 응답 수: <b>{total}명</b>
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">성별</h2>
          {sexVals.map(({ v, label }) => (
            <Bar
              key={v}
              label={label}
              count={countBy("sex")(v)}
              total={total}
            />
          ))}
        </div>

        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">연령대</h2>
          {ageVals.map(({ v, label }) => (
            <Bar
              key={v}
              label={label}
              count={countBy("ageGroup")(v)}
              total={total}
            />
          ))}
        </div>

        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">흡연 상태</h2>
          {smokingVals.map(({ v, label }) => (
            <Bar
              key={v}
              label={label}
              count={countBy("smokingStatus")(v)}
              total={total}
            />
          ))}
        </div>

        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">BMI 분류</h2>
          {bmiVals.map(({ v, label }) => (
            <Bar
              key={v}
              label={label}
              count={responses.filter((r) => r.bmiCategory === v).length}
              total={total}
            />
          ))}
        </div>

        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">암 검진 여부 (최근 2년)</h2>
          <Bar
            label="예"
            count={responses.filter((r) => r.screeningRecent).length}
            total={total}
          />
          <Bar
            label="아니오"
            count={responses.filter((r) => !r.screeningRecent).length}
            total={total}
          />
        </div>

        <div className="card space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">증상 (중복 포함)</h2>
          {symptomVals.map((s) => {
            const cnt = responses.reduce(
              (acc, r: any) =>
                acc + (safeParseArray(r.symptoms).includes(s) ? 1 : 0),
              0
            );
            return <Bar key={s} label={s} count={cnt} total={total} />;
          })}
        </div>
      </div>
    </div>
  );
}
