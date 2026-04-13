# 울산 남구 옥동 1.6수학과학전문학원

## 프로젝트 개요

한글 상표 등록 문제로 "1.6수학과학학원"을 검색해도 학원 정보가 노출되지 않는 문제를 해결하기 위한 SEO 최적화 학원 소개 웹앱.

사이트 주소: https://1-6math.vercel.app/

## 프로젝트 목표

1. 네이버·구글 검색엔진에서 `1.6수학과학학원`, `일점육수학과학학원`, `옥동학원` 키워드로 노출
2. 모바일 퍼스트 반응형 UI (breakpoint: 768px, 1024px)
3. 시맨틱 태그 및 웹 접근성 고려 (스크린리더, `aria-*`, `sr-only`)
4. 학부모·학생이 익명으로 건의사항을 남길 수 있는 건의함 기능
5. 관리자 전용 페이지 (Google OAuth, Firestore 인증 기반)

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 14 (App Router) |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| 인증 | NextAuth v5 (Google OAuth) |
| 데이터베이스 | Firebase Firestore |
| 배포 | Vercel |

## 페이지 구성

| 경로 | 설명 |
|------|------|
| `/` | 메인 (Hero · 통계 · 학원소개 · 학습시스템) |
| `/contact` | 오시는 길 (지도, 연락처) |
| `/suggest` | 익명 건의함 |
| `/admin` | 관리자 로그인 |
| `/feedback` | 건의사항 목록 및 답변 (관리자 전용) |

## 주요 작업

### 검색엔진 노출 (SEO)

`address` 태그, `metadata`, `sitemap.xml`, `robots.txt`, 사이트 소유 설정을 통해 검색엔진 노출 최적화.

### 웹 접근성

NVDA 스크린리더로 직접 확인 후 개선.

- `aria-hidden`으로 장식용 기호를 스크린리더에서 제외
- `sr-only`로 버튼에 숨김 설명 추가
- 시맨틱 태그 (`header`, `main`, `section`, `address` 등) 활용

### 반응형 UI

Tailwind CSS breakpoint 기준 모바일 퍼스트 레이아웃 구성 (768px / 1024px).

### 건의함 + 관리자 페이지

- Google OAuth 로그인 후 Firestore의 허가된 계정만 관리자 접근 가능
- 건의사항 제출 → Firestore 저장 → 관리자 페이지에서 열람·답변
