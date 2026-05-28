# 🏬 LinkPet
**💎보호자와 수의사를 잇는 스마트 반려동물 헬스케어 플랫폼**

LinkPet은 반려동물의 건강 상태를 체계적으로 기록하고, 전문 수의사와의 소통을 통해 맞춤형 건강 관리 솔루션을 제공하는 웹 서비스입니다.
동물건강 관리 웹, 반려동물의 건강 점수도 알 수 있으며, 수의사의 피드백을 같이 들을 수 있습니다

## 👀 기획 배경 및 참고 (Disclaimer)
본 프로젝트는 실제 서비스 중인 반려동물 헬스케어 플랫폼 '라이펫(Lifet)'의 핵심 비즈니스 로직(문진 알고리즘, 결과 분석 등)을 벤치마킹하여 학습 및 포트폴리오 목적으로 개발되었습니다.

기능적 구조를 참고하는 것에 그치지 않고, 기존 서비스의 UI/UX를 사용자 친화적으로 개편 하였으며, 상태 관리와 데이터 시각화, 그리고 사용자 권한 분리를 직접 설계하고 구현하는 데 집중했습니다.


## 📌 프로젝트 소개

- **프로젝트명**: LinkPet
- **개발 기간**: 2026.05.16 ~ 2026.07.16
- **소개**:
  반려동물의 건강 데이터를 꾸준하게 기록하고 저장하여 소중한 반려동물의 건강을 지키는것을 도와주는 웹사이트입니다. 
  
  LinkPet은 보호자가 입력한 데이터를 바탕으로 직관적인 건강 점수와 시각화된 차트를 제공하여 반려동물의 상태를 쉽게 파악할 수 있도록 돕습니다. 

  일반 보호자와 전문 수의사의 계정 권한을 분리하여, 1:1 건강 상담 및 맞춤형 피드백 환경을 만듦니다.

## ✨ 주요 기능 (Key Features)

* **전문 수의사 맞춤 진단 (1:1 Q&A)**

  보호자가 건강 관련 질문을 남기면, 인증된 수의사 계정으로부터 전문적인 진단과 피드백 코멘트를 받을 수 있습니다.

* **건강 점수 및 시각화**

  입력된 데이터를 분석하여 종합 건강 점수를 알려줍니다. 도넛 차트, 비교 막대그래프 등 직관적인 UI를 통해 건강 상태를 파악할 수 있습니다.

* **급여 솔루션**

  반려동물의 현재 체중(kg)과 체형(BCS) 데이터를 기반으로, 하루 권장 사료 섭취량 및 필요 수분량을 클라이언트 단에서 계산하여 안내합니다.

* **병원 내원 이력 추적**

  언제 병원에 방문했는지, 어떤 진료를 받았는지 꼼꼼하게 기록하고 주기적으로 체크할 수 있는 히스토리 관리 기능을 제공합니다.

* **사용자 권한별 맞춤 인터페이스**
  일반 유저 계정과 수의사 전용 계정의 화면 및 데이터 접근 권한을 분리하여, 각 사용자의 목적에 맞는 사용성을 제공합니다.

## 🛠 Tech Stack

<!-- | 구분                         | 도입 기술                      | 도입 목적 및 기대효과                                  |
| ---------------------------- | ------------------------------ | ------------------------------------------------------ |
| **코어기술**                 | Next.js 16, TypeScript, tailwind css  | 빠른 렌더링, SEO 최적화 및 안정적인 타입 관리, 네이밍컨벤션 적용 및 다크모드 대응         |
| **상태관리** | zustand, tanstack query, Next-themes  | 전역 상태 관리를 위한 라이브러리, 마이페이지 데이터 상태 관리, Next-themes를 통한 Hydration 문제 해결 |
| **UI & 라이브러리**       | swiper, react-quill, react-daum-postcode, lucide-react   | swiper로 개발 효율 및 유지보수성, WYSIWYG에디터/XSS보안, API키 발급 및 서버구축 불필요, 유연한 커스터마이징  |
| **유효성 검사 & 보안**          | zod, sanitize    |  유효성 검사를 스키마 하나로 통합, XSS 보안방어 및 데이터 소독         |
| **백엔드 & 배포**          | supabase, vercel    |  서버 구축 최소화 및 개발 효율 증대, 무설정 배포 및 next.js 완벽 호환         |
| **개발 환경**          |  bun, eslint&prettier    |  자체 런타임 환경을 통해 더 빠른 패키지 설치와 실행, 코드 품질 및 컨벤션 통일         | -->

---

## 👥 Team Members

| 이름   | GitHub                                    |
| ------ | ----------------------------------------- |
| 송하늬 | [songha-5](https://github.com/songha-5)   |

---

# 🗂️ 폴더 구조

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
```

# 사용 방법

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
<!-- 🎈 https://final-project-team2.vercel.app/ -->