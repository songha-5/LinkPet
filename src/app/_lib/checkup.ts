import z from "zod"

const checkupNameSchema = z.string().min(1, '한글자 이상 입력해주세요.')
const checkupAgeSchema = z.string().min(1, '반려동물의 나이를 선택해주세요.')
const checkupAiSchema = z.string().optional()
const checkupWeightSchema = z.string().min(1, '반려동물의 체중을 입력해주세요.')
const checkupTypeSchema = z.enum(['cat', 'dog'], {
  error: "고양이와 강아지중 하나를 선택해주세요."
})
const checkupGenderSchema = z.enum(['girl', 'boy'], {
  error: "성별을 선택해주세요."
})
const checkupNeuterSchema = z.enum(['yes', 'no'], {
  error: "중성화 여부를 선택해주세요."
})
const checkupSnackSchema = z.enum(['간식_적당', '간식_평균', '간식_자제'], {
  error: "스넥 횟수를 선택해주세요."
}).optional()
const checkupOutingSchema = z.enum(['외부감염_주의', '외부감염_걱정없음'], {
  error: "산책 여부를 선택해주세요."
}).optional()
const checkupMultiSchema = z.array(z.string())
    .min(1, { message: "1개 이상의 타입을 선택해주세요."})

// 게시글 등록 유효성 검사
export const CheckupSchema = z.object({
  name: checkupNameSchema,
  age: checkupAgeSchema,
  weight: checkupWeightSchema,
  type: checkupTypeSchema,
  gender: checkupGenderSchema,
  neuter: checkupNeuterSchema,
  aiResult: checkupAiSchema,
  snack: checkupSnackSchema,
  outing: checkupOutingSchema,
  skin: checkupMultiSchema,
  mouth: checkupMultiSchema,
  activity: checkupMultiSchema,
  etc: checkupMultiSchema
})

export type CheckupFormData = z.infer<typeof CheckupSchema>
