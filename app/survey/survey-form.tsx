"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  submissionFormSchema,
  CANCER_TYPES,
  SCREENING_TYPES,
  SYMPTOMS,
  type SubmissionFormInput,
} from "@/lib/validators";

export default function SurveyForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SubmissionFormInput>({
    resolver: zodResolver(submissionFormSchema),
    defaultValues: {
      consent: false, // 입력 단계에서는 false OK (제출 시 true여야 통과)
      screeningRecent: false,
      personalHistory: [],
      screeningTypes: [],
      symptoms: [],
      riskPerception: 3,
      consentFollowup: false,
    },
  });

  const screeningRecent = watch("screeningRecent");
  const consentFollowup = watch("consentFollowup");
  const height = watch("heightCm");
  const weight = watch("weightKg");

  const bmi = useMemo(() => {
    const h = Number(height);
    const w = Number(weight);
    if (!h || !w) return null;
    const m = h / 100;
    const val = w / (m * m);
    return Math.round(val * 10) / 10;
  }, [height, weight]);

  const onSubmit = async (data: SubmissionFormInput) => {
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const msg = await res.text();
      alert("제출 실패: " + msg);
      return;
    }
    router.push("/thanks");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="label">성별 *</label>
          <select
            className="input"
            aria-invalid={!!errors.sex}
            {...register("sex")}
          >
            <option value="" hidden>
              선택
            </option>
            <option value="MALE">남성</option>
            <option value="FEMALE">여성</option>
            <option value="OTHER">기타/응답 거부</option>
          </select>
          {errors.sex && <p className="error">{errors.sex.message}</p>}
        </div>

        <div>
          <label className="label">연령대 *</label>
          <select
            className="input"
            aria-invalid={!!errors.ageGroup}
            {...register("ageGroup")}
          >
            <option value="" hidden>
              선택
            </option>
            <option value="A18_29">18-29세</option>
            <option value="A30_39">30-39세</option>
            <option value="A40_49">40-49세</option>
            <option value="A50_59">50-59세</option>
            <option value="A60_69">60-69세</option>
            <option value="A70_PLUS">70세 이상</option>
          </select>
          {errors.ageGroup && (
            <p className="error">{errors.ageGroup.message}</p>
          )}
        </div>

        <div>
          <label className="label">거주 지역 *</label>
          <select
            className="input"
            aria-invalid={!!errors.region}
            {...register("region")}
          >
            <option value="" hidden>
              선택
            </option>
            <option value="SEOUL">서울</option>
            <option value="GYEONGGI_INCHEON">경기/인천</option>
            <option value="BUSAN_ULSAN_GYEONGNAM">부산/울산/경남</option>
            <option value="DAEGU_GYEONGBUK">대구/경북</option>
            <option value="GWANGJU_JEOLLA_JEJU">광주/전라/제주</option>
            <option value="DAEJEON_SEJONG_CHUNGCHEONG">대전/세종/충청</option>
            <option value="GANGWON">강원</option>
            <option value="OVERSEAS">해외</option>
          </select>
          {errors.region && <p className="error">{errors.region.message}</p>}
        </div>

        <div>
          <label className="label">흡연 상태 *</label>
          <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label className="choice-tile">
              <input
                type="radio"
                value="NEVER"
                {...register("smokingStatus")}
              />
              비흡연
            </label>
            <label className="choice-tile">
              <input
                type="radio"
                value="FORMER"
                {...register("smokingStatus")}
              />
              과거 흡연
            </label>
            <label className="choice-tile">
              <input
                type="radio"
                value="CURRENT"
                {...register("smokingStatus")}
              />
              현재 흡연
            </label>
          </div>
          {errors.smokingStatus && (
            <p className="error">{errors.smokingStatus.message}</p>
          )}
        </div>

        <div>
          <label className="label">음주 빈도 *</label>
          <select className="input" {...register("alcoholFrequency")}>
            <option value="" hidden>
              선택
            </option>
            <option value="NONE">없음</option>
            <option value="MONTHLY_1_OR_LESS">월 1회 이하</option>
            <option value="MONTHLY_2_4">월 2-4회</option>
            <option value="WEEKLY_2_3">주 2-3회</option>
            <option value="WEEKLY_4_PLUS">주 4회 이상</option>
          </select>
          {errors.alcoholFrequency && (
            <p className="error">{errors.alcoholFrequency.message}</p>
          )}
        </div>

        <div>
          <label className="label">신체활동 수준 *</label>
          <select className="input" {...register("physicalActivity")}>
            <option value="" hidden>
              선택
            </option>
            <option value="LOW">적음</option>
            <option value="MEDIUM">보통</option>
            <option value="HIGH">많음</option>
          </select>
          {errors.physicalActivity && (
            <p className="error">{errors.physicalActivity.message}</p>
          )}
        </div>

        <div>
          <label className="label">키 (cm)</label>
          <input
            className="input"
            type="number"
            min={100}
            max={250}
            placeholder="예: 170"
            {...register("heightCm")}
          />
        </div>

        <div>
          <label className="label">몸무게 (kg)</label>
          <input
            className="input"
            type="number"
            min={30}
            max={250}
            placeholder="예: 65"
            {...register("weightKg")}
          />
          {bmi && (
            <p className="helper">
              예상 BMI: <b>{bmi}</b>
            </p>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <label className="label">개인 암 진단 이력 (해당 모두 선택)</label>
          <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-3">
            {CANCER_TYPES.map((t) => (
              <label key={t} className="choice-tile">
                <input
                  type="checkbox"
                  value={t}
                  {...register("personalHistory")}
                />
                {t}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="label">가족력</label>
          <div className="mt-2">
            <label className="choice-tile">
              <input type="checkbox" {...register("familyHistory")} />
              직계 가족 중 암 진단자 있음
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <label className="label">최근 2년 내 국가/개인 암 검진 여부</label>
          <label className="choice-tile mt-2">
            <input type="checkbox" {...register("screeningRecent")} />예 (해당
            시 아래에서 검진 종류 선택)
          </label>
        </div>
        {screeningRecent && (
          <div>
            <label className="label">검진 종류 (해당 모두 선택)</label>
            <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
              {SCREENING_TYPES.map((t) => (
                <label key={t} className="choice-tile">
                  <input
                    type="checkbox"
                    value={t}
                    {...register("screeningTypes")}
                  />
                  {t}
                </label>
              ))}
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div>
          <label className="label">최근 한달 내 증상 (해당 모두 선택)</label>
          <div className="mt-2 grid grid-cols-1 gap-3 md:grid-cols-2">
            {SYMPTOMS.map((t) => (
              <label key={t} className="choice-tile">
                <input type="checkbox" value={t} {...register("symptoms")} />
                {t}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">암 관련 지식 수준 *</label>
            <select className="input" {...register("knowledgeLevel")}>
              <option value="" hidden>
                선택
              </option>
              <option value="LOW">낮음</option>
              <option value="MEDIUM">보통</option>
              <option value="HIGH">높음</option>
            </select>
            {errors.knowledgeLevel && (
              <p className="error">{errors.knowledgeLevel.message}</p>
            )}
          </div>
          <div>
            <label className="label">본인 암 발생 위험 체감 (1~5)</label>
            <input
              className="w-full accent-blue-600"
              type="range"
              min={1}
              max={5}
              step={1}
              {...register("riskPerception")}
            />
            <div className="flex justify-between text-xs text-slate-500">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="label">설문 경로</label>
            <select className="input" {...register("heardFrom")}>
              <option value="" hidden>
                선택(선택항목)
              </option>
              <option value="SNS">SNS</option>
              <option value="FRIEND">지인 추천</option>
              <option value="HEALTHCARE">병원/보건소</option>
              <option value="OTHER">기타</option>
            </select>
          </div>

          <div>
            <label className="label">이메일 (선택)</label>
            <input
              className="input"
              type="email"
              placeholder="결과 안내를 원하시면 입력"
              disabled={!consentFollowup}
              {...register("email")}
            />
            {errors.email && <p className="error">{errors.email.message}</p>}
            <label className="choice-tile mt-3">
              <input type="checkbox" {...register("consentFollowup")} />
              추가 연락(결과 안내 등)에 동의합니다.
            </label>
          </div>
        </div>

        <div>
          <label className="label">자유 의견 (선택)</label>
          <textarea
            className="input h-28"
            placeholder="전하고 싶은 말씀을 자유롭게 남겨 주세요."
            {...register("comments")}
          />
          {errors.comments && (
            <p className="error">{errors.comments.message}</p>
          )}
        </div>
      </section>

      <section className="space-y-3">
        <label className="choice-tile items-start">
          <input type="checkbox" {...register("consent")} />
          <span>
            <b>참여 및 개인정보 처리에 동의</b>합니다. 본 설문은 익명으로
            진행되며, 의료적 조언을 제공하지 않습니다. 개인정보 안내를{" "}
            <a href="/privacy">여기</a>에서 확인했습니다.
          </span>
        </label>
        {errors.consent && <p className="error">{errors.consent.message}</p>}
        <div className="flex items-center gap-3">
          <button className="btn" type="submit" disabled={isSubmitting}>
            제출
          </button>
          <span className="text-xs text-slate-500">
            제출을 누르면 위 내용에 동의한 것으로 간주됩니다.
          </span>
        </div>
      </section>
    </form>
  );
}
