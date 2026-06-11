'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormData, LoginSchma } from '../_lib/auth';
import Link from 'next/link';
import FloatLayout from '@/src/app/_components/FloatLayout';
import BaseInput from '@/src/app/_components/input/BaseInput';
import BaseButton from '@/src/app/_components/button/BaseButton';
import { Kakao } from '@/src/actions/auth.kakao';
import { loginAction } from '@/src/actions/auth.login';
import { useRouter } from 'next/navigation';


export default function LoginLayout() {
  const router = useRouter()  

  // 유효성 검사 호출
  // register로 타입별 해당하는 유효성 체크
  // handleSubmit으로 해당 타입의 유효성이 맞는지 확인 (submit 눌렀을 시 해당 유효성 작동)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchma),
    mode: "onChange"
  })

  // 유효성 검사 통과 후 실행
  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await loginAction(data)
      
      if (result.success) {
        console.log('유효성 검사 패스! 데이터 보내기', data)
        router.push("/user")
      } else {
        alert(`error: ${result.error}`)
      }

    } catch(error) {
      // 네트워크 단절 등 예상치 못한 오류 처리
      console.error('통신 오류 발생:', error)
      alert('서버와 통신 중 오버플로우가 발생했습니다.')
    }
  }

  return (
    <main className="relative h-full p-10">
      <FloatLayout color='pink'>
        {/* 타이틀 */}
        <div className="text-center">
          <span className="animate-slowBounce text-5xl text-neonGreen text-shadow-[4px_4px_0_var(--color-neonGreen-opacity)] mbe-4 block">[ ^•ﻌ•^ ]</span>
          <h1 className="text-4xl text-shadow-[3px_3px_0_var(--color-neonPink)] tracking-wide">LINKPET</h1>
        </div>

        {/* 폼 */}
        <fieldset className="mbs-14">
          <legend className="sr-only">로그인 form</legend>

          {/* input */}
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <BaseInput
              title="USER ID"
              placeholder="아이디를 입력하세요"
              errorMsg={errors.email?.message}
              {...register('email')}
            />
            <BaseInput 
              title="PASSWORD"
              placeholder="비밀번호를 입력하세요"
              errorMsg={errors.password?.message}
              className='mt-4'
              {...register('password')}
              password
            />

            <div className="mbs-10">
              <BaseButton type='submit' content="로그인하기 (LOGIN)"/>
              <BaseButton onClick={Kakao} type='button' content="카카오 로그인 / 회원가입 (KAKAO)" color='yellow' className='mt-4' />
            </div>
          </form>

        </fieldset>

        {/* 비밀번호 찾기 / 회원가입 */}
        <div className="mbs-12 border-t-3 border-dashed border-font-caption text-center">
          <Link href="/auth/password" className="relative transition-all after:absolute hover:after:border after:bottom-0 after:left-1/2 before:h-0.5 after:w-0 after:bg-neonPink after:duration-300 after:-translate-x-1/2 hover:after:w-full inline-flex text-font-subText text-lg hover:text-neonPink focus-visible:outline-neonPink mbs-6">비밀번호 찾기</Link>
          <Link href="/auth/join" className="relative transition-all after:absolute hover:after:border after:bottom-0 after:left-1/2 before:h-0.5 after:w-0 after:bg-neonPink after:duration-300 after:-translate-x-1/2 hover:after:w-full inline-flex text-font-subText text-lg hover:text-neonPink focus-visible:outline-neonPink ms-4">회원가입 (JOIN)</Link>
        </div>
      </FloatLayout>
    </main>
  )
}