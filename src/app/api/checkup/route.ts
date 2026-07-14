import { createClient } from "@/src/utils/supabase/server"
import { getUser } from "../../_lib/getUser"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const supabase = await createClient()

    const user = await getUser()

    const { data: petData, error: petError } = await supabase.from('pet').insert({
      name: body.name,
      user_id: user.id,
      type: body.type,
      age: body.age,
      gender: body.gender,
      weight: body.weight,
      neuter: body.neuter,
    })
    .select('id')
    .single()

    if(petError) throw new Error (`펫 정보를 저장/불러오기에 실패하였습니다. ${petError.message}`)

    const { error: petStatusError } = await supabase.from('pet_status').insert({
      pet_id: petData.id,
      symptoms: {
        "skin": body.skin,
        "mouth": body.mouth,
        "snack": body.snack,
        "outing": body.outing,
        "activity": body.activity,
        "etc": body.etc
      },
      ai_analysis: {
        "aiResult": body.aiResult ? { result: body.aiResult } : null,
      },
      point: body.point
    })

    if(petStatusError) throw new Error(`Status 저장 실패: ${petStatusError.message}`)
    
    return NextResponse.json({ success: true, petId: petData.id })

  } catch(error: unknown) {
    if(error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ error: "알 수 없는 서버 에러가 발생했습니다."}, { status: 500 })
  }
}