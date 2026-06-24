import { createClient } from "@/src/utils/supabase/server"
import EditForm from "../_components/EditForm"
interface EditPageProps {
  params: Promise<{id?: string; page?: string}>
}

export default async function EditPage({ params }: EditPageProps) {
  const paramProps = await params
  const paramId = paramProps.id
  const paramPage = paramProps.page

  const supabase = await createClient()
  const { data: postDate } = await supabase.from('posts').select('title, body').eq('user_id', paramId).eq('id', paramPage).single()

  console.log(typeof paramPage, paramPage)
  return (
    <>
      <h1 className="sr-only">게시글 등록</h1>
      <div className="border-5 p-7 bg-bg border-neonPink shadow-[6px_6px_0_var(--color-neonPink)]">
        <h2 className="text-neonPink text-2xl">📝 EDIT_LOG_NODE // 게시글 버퍼 등록</h2>
        
        {/* 수정 폼 */}
        <EditForm id={paramPage} title={postDate?.title} body={postDate?.body} />
      </div>
    </>
  )
}