'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginFormData, LoginSchma } from '../_lib/input';
import BaseInput from "./input/BaseInput";


export default function LoginLayout() {

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
  const onSubmit = (data: LoginFormData) => {
    console.log('유효성 검사 패스! 데이터 보내기', data)
  }
  

  return (
    <main className="relative h-full p-10">
      <div className="transition-all border-neonPink border-7 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-20 px-10 w-[calc(100%-80px)] md:w-xl bg-bg shadow-[10px_10px_0_var(--color-neonPink)] after:w-3 after:h-3 after:bg-neonPink after:block after:absolute after:-top-3 after:-left-3">
        <div className="absolute top-5 left-7 text-neonPink text-3xl">+</div>
        <div className="absolute bottom-5 right-7 text-neonPink text-3xl">+</div>
        
        {/* 타이틀 */}
        <div className="text-center">
          <span className="text-5xl text-neonGreen text-shadow-[4px_4px_0_var(--color-neonGreen-opacity)] mbe-4 block">[ ^•ﻌ•^ ]</span>
          <h1 className="text-4xl text-shadow-[3px_3px_0_var(--color-neonPink)] tracking-wide">PIXEL PETS</h1>
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
              {...register('password')}
              password
            />

            <div className="mbs-10">
              <button type="submit" className="focus-visible:border-neonPink outline-none w-full h-16 text-2xl text-font tracking-[-2px] bg-neonGreen shadow-[4px_4px_0_var(--color-neonGreen-opacity)] border-5 border-neonGreen hover:bg-bg hover:text-white transition-all hover:shadow-[2px_2px_0_var(--color-neonGrren-opacity)] hover:translate-x-0.5 hover:translate-y-0.5  cursor-pointer">로그인하기 (LOGIN)</button>
              <button type="submit" className="mbs-4 focus-visible:border-neonPink outline-none w-full h-16 text-2xl text-font tracking-[-2px] bg-bg-kakao shadow-[4px_4px_0_var(--color-bg-kakao-opacity)] border-5 border-bg-kakao hover:bg-bg hover:text-white transition-all hover:shadow-[2px_2px_0_var(--color-neonGrren-opacity)] hover:translate-x-0.5 hover:translate-y-0.5  cursor-pointer">카카오 로그인 (KAKAO)</button>
            </div>
          </form>

        </fieldset>

        {/* 비밀번호 찾기 / 회원가입 */}
        <div className="mbs-12 border-t-3 border-dashed border-font-caption text-center">
          <a href="" className="relative transition-all after:absolute hover:after:border after:bottom-0 after:left-1/2 before:h-0.5 after:w-0 after:bg-neonPink after:duration-300 after:-translate-x-1/2 hover:after:w-full inline-flex text-font-subText text-lg hover:text-neonPink focus-visible:outline-neonPink mbs-6">비밀번호 찾기</a>
          <a href="" className="relative transition-all after:absolute hover:after:border after:bottom-0 after:left-1/2 before:h-0.5 after:w-0 after:bg-neonPink after:duration-300 after:-translate-x-1/2 hover:after:w-full inline-flex text-font-subText text-lg hover:text-neonPink focus-visible:outline-neonPink ms-4">회원가입 (JOIN)</a>
        </div>
      </div>
    </main>
  )
}