import z from "zod"

const questTitleSchema = z.string().min(2, '질문 제목은 2자 이상이여야 합니다.')
const questContentSchema = z.string().min(18, '질문은 10자 이상이여야 합니다.')

// 게시글 등록 유효성 검사
export const QnACreateSchema = z.object({
  title: questTitleSchema,
  content: questContentSchema
})
// 게시글 내용 유효성 검사
export const TextareaSchema = z.object({
  content: questContentSchema
})

export type QnACreateFormData = z.infer<typeof QnACreateSchema>
export type TextareaFormData = z.infer<typeof TextareaSchema>
