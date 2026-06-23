# 🏬 LinkPet
**💎보호자와 수의사를 잇는 AI 건강진단 플랫폼**

반려동물의 건강을 케어해주는 웹사이트입니다. 반려동물의 피부나 대변상태 등 이미지를 통해 AI로 어떤 문제가 있는지 검사할 수 있으며, 추가 질의응답을 통해 더욱 세세히 건강상태를 확인할 수 있습니다. 

해당 검사결과를 바탕으로 수의사에게 QnA를 올릴 수 있어, 더욱 전문적인 답변을 들을 수 있습니다.


## 📌 프로젝트 소개

- **프로젝트명**: LinkPet
- **개발 기간**: 2026.06.05 ~
- **소개**:
  반려동물의 건강 데이터를 AI로 상태를 확인하고, 저장하여 소중한 반려동물의 건강을 지키는것을 도와주는 웹사이트입니다. 
  
  LinkPet은 보호자가 입력한 데이터를 바탕으로 직관적인 건강 알림과, AI를 통한 질의응답으로 반려동물의 상태를 쉽게 파악할 수 있도록 돕습니다. 

  일반 보호자와 전문 수의사의 계정 권한을 분리하여, 1:1 건강 상담 및 맞춤형 피드백 환경을 만듦니다.

## ✨ 주요 기능 (Key Features)

* **AI를 통한 건강진단**

  AI를 통해 반려동물의 상태가 어떤지 체크할 수 있습니다.

* **전문 수의사 맞춤 진단 (1:1 Q&A)**

  문진결과 데이터를 가지고 수의사에게 맞춤 질문을 할 수 있습니다.

* **건강 상태 시각화**

  건강 검진 상태에 따라 위험/경고/양호상태를 표기하며, 시각적으로 알 수 있습니다.

* **사용자 권한별 맞춤 인터페이스**

  관리자가 진입했을 시, QnA의 리스트글들을 모아 보거나 답변을 달 수 있습니다. 

  일반 유저가 진입했을 경우 반려동물의 상태 및 수의사의 답변을 확인할 수 있습니다.

## 🎶 문서

유저 플로우: https://www.figma.com/board/FiQWs8TcBvwxBJQ4iaXhdt/%EC%A0%9C%EB%AA%A9-%EC%97%86%EC%9D%8C?node-id=0-1&t=vL4hEnOSWO8XReLK-1

기능정의서/API문서: https://app.notion.com/p/LinkPet-2f3953634c9d838bbe240133142c6e2f?source=copy_link

DB: https://dbdiagram.io/d/linkpet-DB-6a1e80902eeb2f46cd3c8718


## 🎯 트러블슈팅

### Case 1 문제상황 타이틀

Issue: 예시 텍스트

상황: 예시 텍스트

Cause (원인): 예시 텍스트

Resolution (해결):

- 방법 1: 예시 방법 1

- 방법 2: 예시 방법 2

해결과정 설명

Takeaway: 배운점 예시

## Tech Stack

예시 텍스트
<!-- react-hook-form, zod, kakao login, zustantd (공통 모달 상태관리), lucid, Tiptap(에디터), sanitize -->
<!-- | 구분                         | 도입 기술                      | 도입 목적 및 기대효과                                  |
| ---------------------------- | ------------------------------ | ------------------------------------------------------ |
| **코어기술**                 | Next.js 16, TypeScript, tailwind css  | 빠른 렌더링, SEO 최적화 및 안정적인 타입 관리, 네이밍컨벤션 적용 및 다크모드 대응         |
| **상태관리** | zustand, tanstack query, Next-themes  | 전역 상태 관리를 위한 라이브러리, 마이페이지 데이터 상태 관리, Next-themes를 통한 Hydration 문제 해결 |
| **UI & 라이브러리**       | swiper, react-quill, react-daum-postcode, lucide-react   | swiper로 개발 효율 및 유지보수성, WYSIWYG에디터/XSS보안, API키 발급 및 서버구축 불필요, 유연한 커스터마이징  |
| **유효성 검사 & 보안**          | zod, sanitize    |  유효성 검사를 스키마 하나로 통합, XSS 보안방어 및 데이터 소독         |
| **백엔드 & 배포**          | supabase, vercel    |  서버 구축 최소화 및 개발 효율 증대, 무설정 배포 및 next.js 완벽 호환         |
| **개발 환경**          |  bun, eslint&prettier    |  자체 런타임 환경을 통해 더 빠른 패키지 설치와 실행, 코드 품질 및 컨벤션 통일         | -->


# 🗂️ 폴더 구조

예시 텍스트
<!-- ```jsx
src/
├── actions/                # 서버 액션 (인증, 장바구니, 결제 등)
│   ├── auth.actions.ts
│   ├── cartAction.ts
│   ├── loginAction.ts
│   ├── signupAction.ts
│   └── ...
├── api/                    # API 페칭 함수 (카테고리, 상품 리스트 등)
│   ├── categoriesList.ts
│   ├── getProductAll.ts
│   └── products.ts
├── app/                    # Next.js App Router (페이지 및 레이아웃)
│   ├── (auth)/             # 인증 관련 그룹 (로그인, 회원가입, 아이디 찾기 등)
│   │   ├── find-id/
│   │   ├── login/
│   │   ├── reset-password/
│   │   └── signup/
│   ├── (board)/            # 게시판 관련 그룹 (공지사항, QnA)
│   │   ├── inquire/        # 문의하기
│   │   └── notice/         # 공지사항
│   ├── (shop)/             # 쇼핑 관련 그룹
│   │   ├── cart/           # 장바구니
│   │   ├── checkout/       # 
│   │   └── payment/        # 결제
│   ├── auth-guard/         # 로그인 가드 (접근 권한이 필요할 시 작동)
│   ├── components/         # 재사용 가능한 코드 모음
│   │   ├── board/          # 게시판 컴포넌트
│   │   ├── main/           # 메인 화면 컴포넌트
│   │   └── provider/       # 다크모드/라이트모드 컴포넌트
│   ├── lib/                # Type 모음
│   ├── mypage/             # 마이페이지 (사용자/판매자)
│   │   ├── actions/        # 마이페이지 전용 서버 액션
│   │   ├── api/            # 데이터 패칭
│   │   ├── components/     # 마이페이지 공용 UI 컴포넌트
│   │   ├── consumer/       # 마이페이지 고객용 UI (쿠폰, 주문내역조회, 프로필, 찜하기)
│   │   ├── context/        # 마이페이지 컨텍스트 (사용자 타입에 따른 분기)
│   │   ├── providers/      # 마이페이지 프로바이더
│   │   ├── seller/         # 마이페이지 셀러용 UI (상점 관리, 배송)
│   │   └── types/          # 마이페이지 타입 (zod, type)
│   ├── search/             # 상품 검색 페이
│   ├── favicon.ico         # 파비콘
│   ├── globals.css         # 글로벌 스타일
│   ├── layout.tsx          # 루트 레이아웃
│   ├── not-found.tsx       # not-found 페이지
│   └── page.tsx            # 메인 페이지
├── components/             # 공용 및 도메인별 UI 컴포넌트
│   ├── board/              # 게시판 전용 컴포넌트 (페이지네이션, 카드 등)
│   ├── main/               # 메인 페이지 전용 컴포넌트 및 스켈레톤
│   ├── provider/           # ThemeProvider 등 설정
│   └── (Shared UI)/        # 공용 컴포넌트 (Button, Input, Modal, Toast 등)
├── data/                   # 더미 데이터 (JSON 파일)
├── fonts/                  # 폰트
├── hooks/                  # 훅
├── store/                  # 상태 저장소 (상품 정보를 전체 공유)
├── types/                  # Type 모음
├── utils/                  # 유틸리티 함수
│   └── supabase/           # supabase
├── utils/                  # 유틸리티 함수
├── global.d.ts/            # swiper.css
├── proxy.ts/               # 프록시
└── types/                  # 전역 타입 정의 파일 -->
<!-- ``` -->

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

---

# 배포 링크
