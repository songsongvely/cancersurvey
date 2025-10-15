import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { submissionSchema } from "@/lib/validators";
import { computeBmiCategory } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const data = submissionSchema.parse(json);

    let bmi: number | undefined = undefined;
    let bmiCategory:
      | "UNDERWEIGHT"
      | "NORMAL"
      | "OVERWEIGHT"
      | "OBESE"
      | undefined = undefined;
    if (data.heightCm && data.weightKg) {
      const m = data.heightCm / 100;
      bmi = Number((data.weightKg / (m * m)).toFixed(1));
      bmiCategory = computeBmiCategory(bmi) as any;
    }

    // 이메일은 추가 연락 동의가 있을 때만 저장
    const email = data.consentFollowup ? data.email : null;

    await prisma.response.create({
      data: {
        consent: data.consent,

        // enum 대신 문자열 저장
        sex: data.sex,
        ageGroup: data.ageGroup,
        region: data.region,

        // 배열 → JSON 문자열
        personalHistory:
          data.personalHistory && data.personalHistory.length
            ? JSON.stringify(data.personalHistory)
            : null,
        familyHistory: data.familyHistory ?? false,

        smokingStatus: data.smokingStatus,
        alcoholFrequency: data.alcoholFrequency,
        physicalActivity: data.physicalActivity,

        heightCm: data.heightCm ?? null,
        weightKg: data.weightKg ?? null,
        bmi: bmi ?? null,
        bmiCategory: bmiCategory ?? null,

        screeningRecent: data.screeningRecent ?? false,
        screeningTypes:
          data.screeningRecent &&
          data.screeningTypes &&
          data.screeningTypes.length
            ? JSON.stringify(data.screeningTypes)
            : null,
        symptoms:
          data.symptoms && data.symptoms.length
            ? JSON.stringify(data.symptoms)
            : null,

        knowledgeLevel: data.knowledgeLevel,
        riskPerception: data.riskPerception,

        heardFrom: data.heardFrom ?? null,
        email: email ?? null,
        consentFollowup: data.consentFollowup ?? false,
        comments: data.comments ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error(err);
    if (err?.issues) {
      return new NextResponse(
        JSON.stringify(err.issues[0]?.message ?? "Validation error"),
        { status: 400 }
      );
    }
    return new NextResponse("Server error", { status: 500 });
  }
}
