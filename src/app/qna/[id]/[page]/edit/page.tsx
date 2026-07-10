import { createClient } from "@/src/utils/supabase/server"
import EditForm from "../_components/EditForm"
import { getUser } from "@/src/app/_lib/getUser";
interface EditPageProps {
  params: Promise<{id?: string; page?: string}>
}

export default async function EditPage({ params }: EditPageProps) {
  const paramProps = await params
  const paramId = paramProps.id
  const paramPage = paramProps.page

  const user = await getUser()
  const supabase = await createClient()
  const { data: postDate } = await supabase.from('posts').select('title, body').eq('user_id', paramId).eq('id', paramPage).single()
  const { data: petData } = await supabase.from('pet').select('name, age, weight, type').eq('user_id', user.id)
  
  console.log('pet', JSON.stringify(petData, null, 2))

  return (
    <>
      <h1 className="sr-only">게시글 등록</h1>
      <div className="border-5 p-7 bg-bg border-neonPink shadow-[6px_6px_0_var(--color-neonPink)]">
        <h2 className="text-neonPink text-2xl">📝 EDIT_LOG_NODE // 게시글 버퍼 등록</h2>
        
        {/* 수정 폼 */}
        <EditForm id={paramPage} title={postDate?.title} body={postDate?.body} petName={petData?.[0].name} petAge={petData?.[0].age} petWeight={petData?.[0].weight} petType={petData?.[0].type} />
      </div>
    </>
  )
}