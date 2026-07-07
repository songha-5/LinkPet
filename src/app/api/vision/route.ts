import vision from '@google-cloud/vision'
import { NextRequest, NextResponse } from 'next/server';

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL
const privateKey = process.env.GOOGLE_PRIVATE_KEY

if (!clientEmail || !privateKey) {
  throw new Error("구글 API 환경 변수가 누락되었습니다. .env를 확인해주세요")
}

// 값이 확실히 있을 때만 클라이언트를 초기화
const visionClient = new vision.ImageAnnotatorClient({
  credentials: {
    client_email: clientEmail,
    // \n을 실제 줄바꿈 문자로 변환
    private_key: privateKey.replace(/\\n/g, '\n'), 
  },
});

export async function POST(request: NextRequest) {
  try {
    // 폼데이터 호출
    const formData = await request.formData()
    // 파일 img 찾기
    const file = formData.get('image')

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { error: "이미지 파일이 전달되지 않았습니다." },
        { status: 400 } // 잘못된요청
      )
    }

    // 구글이 읽을 수 있는 형태로 사진 변환
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // ai 에게 전송 및 결과리스트 받기
    const [result] = await visionClient.labelDetection({ image: { content: buffer }})

    // 라벨만 추출
    const labels = result.labelAnnotations || []

    // 사용하는 단어만 추출 -> 비교를 위해 소문자로 전환
    const extractedTags = labels.map(label => label.description?.toLocaleLowerCase() || "")

    //파일이름이름 - 태그이름이름
    console.log("=============== ai 뱉는 리스트", extractedTags)
    console.log("전달받든 파일이름/타입", file.name, file.type)


    return NextResponse.json({
      message: "파일 추출 성공",
      aiResult: extractedTags
    })
  } catch(error) {
    console.error('데이터 추출 중 에러: ', error)
    return NextResponse.json(
      { error: "서버에서 데이터를 처리하는 중 문제가 발생했습니다." },
      { status: 500 }
    )
  }
}