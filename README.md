# 웹사이트 링크
**vercel을 활용하여 만든 사이트로 ``데이터를 해외건너에서 받기 때문``에 느립니다**

https://link-pet-nu.vercel.app/

# 🏬 LinkPet
**💎보호자와 수의사를 잇는 AI 건강진단 플랫폼**

반려동물의 건강을 케어해주는 웹사이트입니다. 반려동물의 피부 등 이미지를 통해 AI로 어떤 문제가 있는지 검사할 수 있으며, 추가 질의응답을 통해 더욱 세세히 건강상태를 확인할 수 있습니다. 

해당 검사결과를 바탕으로 수의사에게 QnA를 올릴 수 있어, 전문적인 답변을 들을 수 있습니다.


## 📌 프로젝트 소개

- **프로젝트명**: LinkPet
- **개발 기간**: 2026.06.05 ~ 2026.07.14
- **소개**:
  반려동물의 건강 데이터를 AI로 상태를 확인하고, 저장하여 소중한 반려동물의 건강을 지키는것을 도와주는 웹사이트입니다. 
  
  LinkPet은 보호자가 입력한 데이터를 바탕으로 직관적인 건강 알림과, AI의 이미지 바탕으로 질의응답을 하여 반려동물의 상태를 쉽게 파악할 수 있도록 돕습니다. 

  일반 보호자와 전문 수의사의 계정 권한을 분리하여, 1:1 건강 상담 및 맞춤형 피드백 환경을 만듦니다.

## ✨ 주요 기능 (Key Features)

* **AI를 통한 건강진단**

  Google Vision API를 통해 반려동물의 이미지 키워드를 정리해, 반려동물의 상태가 어떤지 체크할 수 있습니다.

* **전문 수의사 맞춤 진단 (1:1 Q&A)**

  문진결과 데이터를 가지고 수의사에게 맞춤 질문을 할 수 있습니다.

* **건강 상태 시각화**

  건강 검진 상태에 따라 위험/경고/양호상태를 표기하며, 시각적으로 알 수 있습니다.

* **사용자 권한별 맞춤 인터페이스**

  관리자가 진입했을 시, QnA의 리스트글들을 모아 볼 수 있으며 해당 질문글에 답변을 달 수 있습니다. 

  일반 유저가 진입했을 경우 반려동물의 상태 및 수의사의 답변을 확인할 수 있습니다.

## 🎶 문서

유저 플로우: https://www.figma.com/board/FiQWs8TcBvwxBJQ4iaXhdt/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=0-1&t=vL4hEnOSWO8XReLK-1

기능정의서/API문서: https://app.notion.com/p/LinkPet-2f3953634c9d838bbe240133142c6e2f?source=copy_link

DB: https://dbdiagram.io/d/linkpet-DB-6a1e80902eeb2f46cd3c8718


## 🎯 트러블슈팅

### Case 1 문제상황 타이틀

### 트러블 슈팅 자세히보기 - https://velog.io/@songha-5/LinkPet-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85

---
Issue: 메일로 받은 링크에서 비밀번호 페이지로 연결이 안되는 문제

상황: 비밀번호 변경을 요청하면 해당 메일계정으로 비밀번호 변경 링크가 전달됩니다. 하지만 해당 링크를 눌렀을때 비밀번호 변경 페이지가 아닌 홈페이지로 연결되는 문제가 생겼습니다.

Cause (원인): Supabase의 인증 흐름과 미들웨어 설정의 충돌로 일어난 문제였습니다.

- **미들웨어 접근 제어 충돌**: 미들웨어로 로그인한 유저는 '비밀번호 변경'페이지로 접근이 불가능하게 했습니다. 하지만 supabase에서는 비밀번호 변경 메일로 웹사이트에 접근 시 임시 로그인상태를 부여합니다. 그래서 해당 링크로 가지 못하고 메인으로 이동되었습니다.

- **code를 cookie로 변경 필요**: callback을 거쳐 링크로 이동하지 않아 에러가 일어났습니다. callback을 거쳐 code가 cookie로 변환이 안되어 로그인이 된 상태인지 알아보지 못해서 메인화면으로 리다이렉트 시켰습니다.

Resolution (해결):

- **미들웨어 접근 제어 충돌**: 미들웨어의 경로제한을 수정하였습니다. 기존에 '로그인된 유저가 접근하면 안되는 경로'에 비밀번호 변경 페이지를 삭제하였습니다.

- **code를 cookie로 변경 필요**: 경로에 ``callback``을 넣어 code에서 cookie로 변경할 수 있도록 하였습니다.

Takeaway (배운점):

 supabase에서는 비밀번호 변경 로직이 임시로그인권을 발급해줍니다. 이렇게, 어떤식으로 비밀번호 변경이 작동하는지 알아야 그에 맞게 코드를 적용하여 의도대로 기능을 추가할 수 있다는 점을 배웠습니다.

 그리고 next.js는 보안을 위해 code와 callback을 활용하여, 유저의 로그인여부를 구분하여 작동한다는 점을 알게되었습니다.

 ---
Issue: 미들웨어 내 getUser() 블로킹

상황: window에서 mac으로 개발 환경을 바꾸었습니다. 바꾸고 난 뒤 작업 직후에는 문제가 없었지만 시간이 지나면 화면이 불러와지지 않으며, 무한 로딩이 일어나는 문제가 생겼습니다.

Cause (원인): 미들웨어에 사용된 ``getUser``때문에 발생한 문제였습니다. 페이지 전환시 매번 ``getUser``로 데이터를 불러 로그인여부를 검증하였기 때문이였습니다.

- **IPv6와 IPv4의 주소 불일치**: Internet Protocol이라는 뜻으로 인터넷 연결을 말합니다. 맥은 윈도우와 다르게 IPv6(::1, 최신버전, 무한한 주소와 보안을 가지고있다)주소로 먼저 접근하고, 안되면 IPv4(127.0.0.1)로 접근합니다. 하지만 IPv6에서 주소를 불러왔기 때문에 주소 불일치로, 연결 시간 초과가 발생하여 무한로딩에 걸렸습니다.

- **상황에 맞지않은 데이터 호출**: ``getUser``는 서버에서 데이터를 불러오는 방식으로, 무겁습니다. 그래서 middlewear에서 호출하여 로그인여부를 확인하는데, 불필요한 리소스를 사용하고, 페이지 전환시 로딩이 더 걸렸습니다.

Resolution (해결):

- **IPv6와 IPv4의 주소 불일치 / 상황에 맞는 데이터 호출**: ``getUser``에서 ``getSession``으로 변경하였습니다. ``getSession``은 cookie에 데이터를 한번 저장하여 cookie에서 데이터를 불러오는것이기 때문에 ``getUser``보다 가볍고 빠릅니다. 그래서 무한로딩문제를 개선하고, 효율적인 페이지간 이동을 할 수 있습니다.

Takeaway (배운점):

supabase에서는 비밀번호 변경 로직이 임시로그인권을 발급해줍니다. 이렇게, 어떤식으로 비밀번호 변경이 작동하는지 알아야 그에 맞게 코드를 적용하여 의도대로 기능을 추가할 수 있다는 점을 배웠습니다.

그리고 next.js는 보안을 위해 code와 callback을 활용하여, 유저의 로그인여부를 구분하여 작동한다는 점을 알게되었습니다.
 

## Tech Stack

| 구분 | 도입 기술 | 도입 목적 및 기대효과 |
| :--- | :--- | :--- |
| **코어 & 스타일링** | Tailwind CSS | 빠른 UI 개발 및 일관된 디자인 시스템 |
| **상태 관리** | Zustand | 보일러플레이트(코드 재사용)가 적은 경량 상태 관리를 도입하여 공통 모달 관리 |
| **폼 & 유효성 검사** | React-Hook-Form, Zod | 비제어 컴포넌트로 렌더링을 최적화하고 스키마 기반의 강력한 통합 유효성 검증 적용 |
| **에디터 & 보안** | Tiptap, Sanitize | 커스텀이 자유로운 에디터를 구축하고 XSS 방어를 통한 안전한 데이터 처리 |
| **외부 API & UI** | Kakao Login, Cloud Vision API, Lucide | 소셜 인증, 이미지 분석 자동화, 경량 벡터 아이콘을 적용하여 사용자 경험 및 편의성 향상 |
| **백엔드 & 배포** | Supabase, Vercel | 서버리스 기반 데이터/인증 관리 및 자동화된 CI/CD 파이프라인으로 빠른 배포 환경 구축 |
| **개발 환경** | Bun, ESLint & Prettier | 초고속 런타임 환경 조성 및 엄격한 코드 컨벤션 적용으로 개발 생산성 및 품질 극대화 |


# 🗂️ 폴더 구조

```root
├── .github
│   ├── ISSUE_TEMPLATE
│   └── PULL_REQUEST_TEMPLATE.md
├── .next
├── node_modules
├── public
├── src
│   ├── actions
│   ├── app
│   │   ├── _components
│   │   │   ├── button
│   │   │   ├── checkbox
│   │   │   ├── editor
│   │   │   ├── error
│   │   │   ├── footer
│   │   │   ├── header
│   │   │   ├── input
│   │   │   ├── modal
│   │   │   ├── radio
│   │   │   ├── select
│   │   │   ├── skeleton
│   │   │   ├── FloatLayout.tsx
│   │   │   ├── QnACard.tsx
│   │   │   ├── StateNoti.tsx
│   │   │   └── Tag.tsx
│   │   ├── _lib
│   │   ├── api
│   │   │   ├── auth
│   │   │   ├── checkup
│   │   │   └── vision
│   │   ├── auth
│   │   │   ├── _components
│   │   │   ├── join
│   │   │   │   ├── result
│   │   │   └── password
│   │   │       ├── _components
│   │   │       ├── change
│   │   │       └──  result
│   │   ├── checkup
│   │   │   ├── _components
│   │   │   └── type
│   │   ├── qna / [id] / [page]
│   │   │   ├── _components
│   │   │   └── edit
│   │   ├── user
│   │   │   └── _components
│   │   ├── error.tsx
│   │   ├── favicon.ico
│   │   ├── global.d.ts
│   │   ├── globals.css
│   │   ├── icon.ico
│   │   └── not-found.tsx
│   ├── fonts
│   ├── hooks
│   ├── store
│   ├── utils
│   │   └── supabase
│   └── middleware.ts
└── .env
```

# 👀 실행 방법

```jsx
# 🚀 사용 방법
```
```jsx
# 1. 프로젝트 실행
```

```jsx
# 2. 저장소 클론
git clone https://github.com/songha-5/LinkPet.git
```

```jsx 
# 3. env 설정
NEXT_PUBLIC_SUPABASE_URL="https://[여기는본인의고유알파벳].supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="공개키"
SUPABASE_SERVICE_ROLE_KEY="서버 전용 관리자 키"
```

```jsx 
# 5. 패키지 설치
bun install
```

```jsx
# 6. 개발 서버 실행
bun dev
```

👉 실행 후 브라우저에서 [http://localhost:3000](http://localhost:3000/) 접속
