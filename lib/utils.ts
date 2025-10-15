export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function computeBmiCategory(bmi: number) {
  if (bmi < 18.5) return 'UNDERWEIGHT'
  if (bmi < 25) return 'NORMAL'
  if (bmi < 30) return 'OVERWEIGHT'
  return 'OBESE'
}
