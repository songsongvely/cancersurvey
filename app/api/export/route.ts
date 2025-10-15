import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const key = searchParams.get('key')
  const adminKey = process.env.ADMIN_KEY

  if (!adminKey || key !== adminKey) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const rows = await prisma.response.findMany({ orderBy: { createdAt: 'desc' } })

  const header = [
    'id','createdAt','consent','sex','ageGroup','region',
    'personalHistory','familyHistory','smokingStatus','alcoholFrequency','physicalActivity',
    'heightCm','weightKg','bmi','bmiCategory','screeningRecent','screeningTypes','symptoms',
    'knowledgeLevel','riskPerception','heardFrom','email','consentFollowup','comments'
  ]

  const escape = (v: any) => {
    if (v === null || v === undefined) return ''
    if (Array.isArray(v) || typeof v === 'object') return JSON.stringify(v).replaceAll('"','""')
    return String(v).replaceAll('"','""')
  }

  const lines = [header.join(',')]
  for (const r of rows) {
    const line = [
      r.id, r.createdAt.toISOString(), r.consent, r.sex, r.ageGroup, r.region,
      r.personalHistory, r.familyHistory, r.smokingStatus, r.alcoholFrequency, r.physicalActivity,
      r.heightCm, r.weightKg, r.bmi, r.bmiCategory, r.screeningRecent, r.screeningTypes, r.symptoms,
      r.knowledgeLevel, r.riskPerception, r.heardFrom, r.email, r.consentFollowup, r.comments
    ].map(escape).map(v => `"${v}"`).join(',')
    lines.push(line)
  }

  const csv = lines.join('\n')
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="responses.csv"`
    }
  })
}
