'use client'

import { TiptapInput } from "@/src/app/_components/input/TiptabInput"
import SimpleModal from "@/src/app/_components/modal/SimpleModal"
import { QnACreateAdminFormData, QnACreateAdminSchema } from "@/src/app/_lib/qna"
import { useModalStore } from "@/src/store/useModalStore"
import { createClient } from "@/src/utils/supabase/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useParams, useRouter } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import PostDetail from "@/src/utils/PostDetail"
import ErrorBoundaryWaper from "@/src/app/_components/error/ErrorBoundaryWapper"
import SkeletonAnswerWating from "@/src/app/_components/skeleton/SkeletonAnswerWating"
import SkeletonAnswerTitle from "@/src/app/_components/skeleton/SkeletonAnswerTitle"
import SkeletonAnswerContent from "@/src/app/_components/skeleton/SkeletonAnswerContent"
import SkeletonAnswerButton from "@/src/app/_components/skeleton/SkeletonAnswerButton"

interface AdminAnswerUserProps {
  id?: string
}
interface AdminAnswerPostProps {
  admin_id?: string
  is_answered?: boolean
  user_id?: string
  admin_body?: string | null
  admin_user?: {
    username?: string
  }
}
interface AdminAnswerProps {
  role: string
  username: string
}

export default function AdminAnswer({ role, username }: AdminAnswerProps) {
  const router = useRouter()
  const params = useParams()
  const paramsId = params.id
  const paramPage = params.page
  const openModal = useModalStore((state) => state.openModal)
  const [userData, setUserData] = useState<AdminAnswerUserProps | null>(null)
  const [postData, setPostData] = useState<AdminAnswerPostProps | null>(null)
  const [edit, setEdit] = useState(false)

  const currentTime = new Date().toISOString()

  useEffect(() => {
    let isCancelled = false

    const fatchData = async () => {
      const supabase = createClient()
      try {
        const { data: { user } } = await supabase.auth.
        getUser()
        if (!user) return

        const { data: postData } = await supabase.from('posts').select('admin_body, is_answered, admin_user:users!posts_admin_id_fkey(username)').eq('user_id', paramsId).eq('id', paramPage).single()

        if(isCancelled) return
        
        setUserData(user)
        setPostData(postData as AdminAnswerPostProps)
    
      } catch (error) {
        console.log("데이터를 불러오지 못했습니다.", error)
        throw new Error("데이터를 불러오지 못했습니다.")  
      }
    }
    fatchData()

    return () => {
      isCancelled = true
    }
  }, [paramsId, paramPage])

  const {
    handleSubmit,
    control,
  } = useForm({
    resolver: zodResolver(QnACreateAdminSchema),
    mode: "onChange",
    defaultValues: {
      content: ''
    }
  })

  const handleEdit = () => setEdit((state) => !state)

  const onSubmit = async (data: QnACreateAdminFormData) => {
    try {
      if (!userData) {
        console.log("세션이 만료됬습니다.")
        throw new Error("로그인이 필요합니다.")
      }

      // 글 등록 권한 체크
      if (role === 'USER') {
        console.log('답변 등록 권한이 없습니다.')
        router.push('/')
        return
      }

      // 데이터 업데이트
      const supabase = createClient()
      const { error: answerError } = await supabase
        .from('posts')
        .update({
          admin_id: userData.id,
          admin_body: data.content,
          is_answered: true,
          admin_created_at: currentTime
        })
        .eq('user_id', paramsId)
        .eq('id', paramPage)
      
      // 답변 등록 실패시
      if (answerError) {
        console.log("답변 등록을 실패했습니다.", answerError)
        openModal(
          <SimpleModal
            title="등록에 실패했습니다!"
            content="답변 등록에 실패했습니다."
            color="pink"
            buttonText="확인"
          />
        )
        router.push('/')
      }

      setPostData((prev) => {
        if (!prev) return prev

        return {
          ...prev,
          admin_body: data.content,
          is_answered: true,
          admin_id: userData.id,
          admin_created_at: currentTime,
          admin_user: { username: username }
        }
      })
      
      setEdit(false)
    } catch (error) {
      console.log("예기치 못한 오류가 발생했습니다.", error)
      throw new Error("예기치 못한 오류가 발생했습니다.")
    }
  }

  if (!postData) {
    return (
      <div className="mbs-4 border-3 border-dashed border-gray-default p-20 text-center">
        <p className="text-lg text-gray-default">로딩중입니다...</p>
      </div>
    )
  }

  return (
    <>
      {role === "USER" && postData.is_answered === false ? (
        <section className="flex flex-col items-center border-5 bg-bg border-dashed border-neonYellow shadow-[6px_6px_0_var(--color-neonYellow-opacity)] p-8.5">
          <strong className="animate-blink text-neonYellow text-2xl text-center" aria-label="전문가의 답변을 기다리는 중입니다.">[ ⏳ . . . ]<br />AWAITING_VET_RESPONSE</strong>
          <p className="text-center mbs-4 text-gray-default">전문 수의사 네트워크 노드에 패킷 분배 완료.<br />답변 연산을 동기화 중입니다.<br />실시간 매칭 상태: <span className="text-neonPink">[BUFFERING...]</span></p>
        </section>
      ) : (
        <section className={`flex flex-col border-5 bg-bg p-8.5 ${edit ? 'border-neonYellow shadow-[6px_6px_0_var(--color-neonYellow-opacity)]' : 'border-neonGreen shadow-[6px_6px_0_var(--color-neonGreen-opacity)]'} `}>
          <Suspense fallback={<SkeletonAnswerTitle />}>
            <strong className={`block text-2xl ${edit ? 'text-neonYellow' : 'text-neonGreen'}`}>⚙️ RESPONSE_PATCH_EDITOR // 답변 데이터</strong>

            <div className="items-center flex border-b-2 pbe-5 border-gray-default border-dashed pbs-4 mbe-6">
              <div className={`border-3 pbs-2 pbe-1 px-1 text-3xl text-center w-14 ${edit ? 'border-neonYellow' : 'border-neonGreen'}`}>🩺</div>
              <div className="ms-4">
                <strong className={`block text-lg ${edit ? 'text-neonYellow' : 'text-neonGreen'}`}>DR. 픽셀캣 ({username})</strong>
                <p className="text-[14px] text-font-subText">LINKPET 전문 의료 네트워크 위원 // 메디컬 코드 #402</p>
              </div>
            </div>
          </Suspense>

          {/* 등록 안내 문구 */}
          {postData?.is_answered === false ? (
            <>
              <Suspense fallback={<SkeletonAnswerWating />}>
                <strong className="mbs-8 animate-blink text-neonYellow text-2xl text-center" aria-label="전문가의 답변을 기다리는 중입니다.">[ ⏳ . . . ]<br />AWAITING_VET_RESPONSE</strong>
                <p className="mbe-6 text-center mbs-4 text-gray-default">전문 수의사 네트워크 노드에 패킷 분배 완료.<br />답변 연산을 동기화 중입니다.<br />실시간 매칭 상태: <span className="text-neonPink">[BUFFERING...]</span></p>
              </Suspense>
            </>
          ) : (
            <></>
          )}

          {/* 에디터 */}
          {edit === true ? (
            <Suspense fallback={<SkeletonAnswerContent />}>
              <div className="mbs-4 border-3 px-5 py-5 shadow-[4px_4px_0_var(--color-font-white-shadow)]">
                <TiptapInput control={control} name="content" />
              </div>
            </Suspense>
          ) : (
            <ErrorBoundaryWaper>
              <Suspense fallback={<SkeletonAnswerContent />}>
                <PostDetail data={postData.admin_body || ''} />
              </Suspense>
            </ErrorBoundaryWaper>
          )}

          {role === 'ADMIN' && (
            <div className="flex gap-3 self-end mbs-4">
              {edit === true ? (
                <Suspense fallback={<SkeletonAnswerButton />}>
                  <button onClick={handleEdit} type="button" className="border-3 border-neonPink text-neonPink py-1 px-6 cursor-pointer hover:bg-neonPink hover:text-bg transition-all inline-block">수정 취소 (CANCEL)</button>
                  <button onClick={handleSubmit(onSubmit)} type="button" className="border-3 border-font-white text-font-white py-1 px-6 cursor-pointer hover:bg-font-white hover:text-bg transition-all inline-block">수정 완료 (PATCH_APPLY)</button>
                </Suspense>
              ) : (
                <Suspense fallback={<SkeletonAnswerButton />}>
                  <button onClick={handleEdit} type="button" className="border-3 border-font-white text-font-white py-1 px-6 cursor-pointer hover:bg-font-white hover:text-bg transition-all inline-block">등록 하기 (CREATE_APPLY)</button>
                </Suspense>
              )}
            </div>
          )}
        </section>
      )}
    </>
  )
}