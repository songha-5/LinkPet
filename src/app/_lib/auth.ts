import { z } from 'zod'

const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,}$/

// 스키마
const emailSchma = z.email('유효한 이메일이 아닙니다.')
const passwordSchma = z
  .string('유효한 비밀번호가 아닙니다.')
  .regex(PASSWORD_REGEX, "영어, 숫자 포함 6자리 이상이여야 합니다.")
  .min(6, { message: '비밀번호는 6자 이상이여야 합니다.'})
const confirmPasswordSchma = z.string()
const nameSchema = z.string().min(2, '닉네임은 2자 이상이여야 합니다.')
  
// 로그인 유효성 검사
export const LoginSchma = z.object({
  email: emailSchma,
  password: passwordSchma
})

// 회원가입 유효성 검사
export const SignupSchma = z.object({
  email: emailSchma,
  password: passwordSchma,
  confirmPassword: confirmPasswordSchma,
  name: nameSchema
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: '비밀번호가 일치하지 않습니다.',
})

// 비밀번호 찾기 유효성 검사
export const PasswordSchma = z.object({
  email: emailSchma
})

// 비밀번호 메일 전송
export const PasswordEmailSchma = z.object({
  email: emailSchma
})

// 비밀번호 변경 유효성 검사
export const PasswordChangeSchma = z.object({
  password: passwordSchma,
  confirmPassword: confirmPasswordSchma
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: '비밀번호가 일치하지 않습니다.',
})

export type LoginFormData = z.infer<typeof LoginSchma>
export type SignupFormData = z.infer<typeof SignupSchma>
export type PasswordFormData = z.infer<typeof PasswordSchma>
export type PasswordEmailFormData = z.infer<typeof PasswordEmailSchma>
export type PasswordChangeFormData = z.infer<typeof PasswordChangeSchma>