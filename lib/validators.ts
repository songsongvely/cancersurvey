// lib/validators.ts
import { z } from "zod";

export const CANCER_TYPES = [
  "유방암",
  "자궁경부암",
  "대장암",
  "폐암",
  "위암",
  "간암",
  "갑상선암",
  "전립선암",
  "췌장암",
  "혈액암",
  "기타",
  "해당 사항 없음",
] as const;

export const SCREENING_TYPES = [
  "유방촬영/유방초음파",
  "자궁경부세포검사",
  "분변잠혈검사/대장내시경",
  "저선량CT(폐암)",
  "위내시경/위장조영",
  "간암(초음파/혈액검사)",
  "기타",
] as const;

export const SYMPTOMS = [
  "원인 모를 체중감소",
  "지속적 피로",
  "만성 통증",
  "지속 기침/쉰목소리",
  "혈변/혈뇨",
  "덩어리(혹) 만져짐",
  "삼키기 어려움",
  "피부/점 변화",
  "해당 없음",
] as const;

export const SLEEP_DURATION_OPTIONS = [
  "LE_3_HOURS",
  "H3_TO_4_5",
  "H4_5_TO_6",
  "H6_TO_7",
  "GE_7_HOURS",
] as const;

export const WEEKLY_ALCOHOL_DAYS_OPTIONS = [
  "NONE",
  "ONE",
  "TWO",
  "THREE",
  "FOUR_PLUS",
] as const;

export const WEEKLY_EXERCISE_DAYS_OPTIONS = [
  "NONE",
  "ONE_TWO",
  "THREE",
  "FOUR",
  "FIVE_PLUS",
] as const;

export const SUNSCREEN_USAGE_OPTIONS = [
  "NEVER",
  "SOMETIMES",
  "MOSTLY",
  "ALWAYS",
] as const;

export const EATS_CHARRED_FOOD_OPTIONS = ["YES", "NO"] as const;

// -------- 공통 필드 (consent 제외) --------
const baseFields = {
  sex: z.enum(["MALE", "FEMALE", "OTHER"], {
    required_error: "성별을 선택해 주세요.",
  }),
  ageGroup: z.enum(
    ["A18_29", "A30_39", "A40_49", "A50_59", "A60_69", "A70_PLUS"],
    { required_error: "연령대를 선택해 주세요." }
  ),
  region: z.enum(
    [
      "SEOUL",
      "GYEONGGI_INCHEON",
      "BUSAN_ULSAN_GYEONGNAM",
      "DAEGU_GYEONGBUK",
      "GWANGJU_JEOLLA_JEJU",
      "DAEJEON_SEJONG_CHUNGCHEONG",
      "GANGWON",
      "OVERSEAS",
    ],
    { required_error: "지역을 선택해 주세요." }
  ),

  personalHistory: z.array(z.enum(CANCER_TYPES)).optional().default([]),
  familyHistory: z.boolean().default(false),

  smokingStatus: z.enum(["NEVER", "FORMER", "CURRENT"], {
    required_error: "흡연 상태를 선택해 주세요.",
  }),
  alcoholFrequency: z.enum(
    ["NONE", "MONTHLY_1_OR_LESS", "MONTHLY_2_4", "WEEKLY_2_3", "WEEKLY_4_PLUS"],
    { required_error: "음주 빈도를 선택해 주세요." }
  ),
  physicalActivity: z.enum(["LOW", "MEDIUM", "HIGH"], {
    required_error: "신체활동 수준을 선택해 주세요.",
  }),
  sleepDuration: z.enum(SLEEP_DURATION_OPTIONS, {
    required_error: "평균 수면 시간을 선택해 주세요.",
  }),
  weeklyAlcoholDays: z.enum(WEEKLY_ALCOHOL_DAYS_OPTIONS, {
    required_error: "주간 음주 빈도를 선택해 주세요.",
  }),
  weeklyExerciseDays: z.enum(WEEKLY_EXERCISE_DAYS_OPTIONS, {
    required_error: "주간 운동 일수를 선택해 주세요.",
  }),
  sunscreenUsage: z.enum(SUNSCREEN_USAGE_OPTIONS, {
    required_error: "선크림 사용 빈도를 선택해 주세요.",
  }),
  eatsCharredFood: z.enum(EATS_CHARRED_FOOD_OPTIONS, {
    required_error: "탄 음식 섭취 여부를 선택해 주세요.",
  }),

  heightCm: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => {
      if (v === "" || v === undefined || v === null) return undefined;
      const n = typeof v === "string" ? Number(v) : v;
      return Number.isFinite(n) ? Math.round(n) : undefined;
    }),
  weightKg: z
    .union([z.string(), z.number()])
    .optional()
    .transform((v) => {
      if (v === "" || v === undefined || v === null) return undefined;
      const n = typeof v === "string" ? Number(v) : v;
      return Number.isFinite(n) ? Math.round(n) : undefined;
    }),

  screeningRecent: z.boolean().default(false),
  screeningTypes: z.array(z.enum(SCREENING_TYPES)).optional().default([]),

  symptoms: z.array(z.enum(SYMPTOMS)).optional().default([]),

  knowledgeLevel: z.enum(["LOW", "MEDIUM", "HIGH"], {
    required_error: "암 지식 수준을 선택해 주세요.",
  }),
  riskPerception: z.union([z.number(), z.string()]).transform((v) => {
    const n = typeof v === "string" ? Number(v) : v;
    return Math.min(5, Math.max(1, Math.round(n)));
  }),

  heardFrom: z.enum(["SNS", "FRIEND", "HEALTHCARE", "OTHER"]).optional(),
  consentFollowup: z.boolean().optional().default(false),
  email: z.preprocess(
    (val) => {
      if (typeof val !== "string") return undefined;
      const trimmed = val.trim();
      return trimmed === "" ? undefined : trimmed;
    },
    z.union([z.undefined(), z.string().email("올바른 이메일을 입력해 주세요.")])
  ),
  comments: z
    .string()
    .max(2000, "자유의견은 2000자 이내로 작성해 주세요.")
    .optional(),
};

// -------- 클라이언트 폼용 스키마 (동의 체크 전 false 허용) --------
export const submissionFormSchema = z
  .object({
    consent: z
      .boolean()
      .refine((v) => v === true, {
        message: "참여 및 개인정보 처리에 동의가 필요합니다.",
      }),
    ...baseFields,
  })
  .refine(
    (data) => {
      if (data.email && !data.consentFollowup) return false;
      return true;
    },
    {
      message: '이메일을 입력하려면 "추가 연락에 동의"에 체크해 주세요.',
      path: ["email"],
    }
  );

// -------- 서버 확정 검증 스키마 (동의는 literal true) --------
export const submissionSchema = z
  .object({
    consent: z.literal(true, {
      errorMap: () => ({
        message: "참여 및 개인정보 처리에 동의가 필요합니다.",
      }),
    }),
    ...baseFields,
  })
  .refine(
    (data) => {
      if (data.email && !data.consentFollowup) return false;
      return true;
    },
    {
      message: '이메일을 입력하려면 "추가 연락에 동의"에 체크해 주세요.',
      path: ["email"],
    }
  );

export type SubmissionFormInput = z.infer<typeof submissionFormSchema>; // 폼에서 사용하는 타입
export type SubmissionInput = z.infer<typeof submissionSchema>; // 서버 확정 타입
