'use client'

import SimpleModal from "@/src/app/_components/modal/SimpleModal"
import { useModalStore } from "@/src/store/useModalStore"
import { createClient } from "@/src/utils/supabase/client"
import { useRouter } from "next/navigation"

interface DeleteRowProps {
  id: string
  page: string
}

export default function DeleteRow({ id, page }: DeleteRowProps) {
  const router = useRouter()
  const openModal = useModalStore((state) => state.openModal)
  const supabase = createClient()

  const handleDelete = () => {
    try {
      openModal(
        <SimpleModal
          title="정말 삭제할까요?"
          content="정말 삭제하시겠습니까?"
          color="pink"
          buttonText="확인"
          onClick={async () => {
            const { error } = await supabase.from('posts').delete().eq('user_id', id).eq('id', page).single()
            if (error) {
              console.log("삭제실패", error)
              openModal(
                <SimpleModal
                  title="실패했습니다!"
                  content="글 삭제에 실패했습니다!"
                  color="pink"
                  buttonText="확인"
                />
              )
              return
            }
            router.push('/user')
          }}
        />
      )
    } catch (error) {
      openModal(
        <SimpleModal
          title="실패했습니다!"
          content="글 삭제에 실패했습니다!"
          color="pink"
          buttonText="확인"
        />
      )
      console.log("삭제에 실패했습니다.", error)
      return 
    }
  }

  return <button onClick={handleDelete} type="button" className="border-3 border-neonPink text-neonPink py-1 px-6 cursor-pointer hover:bg-neonPink hover:text-bg transition-all inline-block">삭제</button>
}