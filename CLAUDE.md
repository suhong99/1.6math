# CLAUDE.md

울산 남구 옥동 1.6수학학원 - SEO 최적화 학원 소개 웹앱

## 프로젝트 개요

학원 이름이 한글 상표 등록 문제로 검색 노출이 안 되는 문제를 해결하기 위한 웹페이지.  
"1.6수학과학학원", "일점육수학과학학원", "옥동학원" 키워드로 네이버/구글 검색 노출 목표.

사이트 주소: https://1-6math.vercel.app/

## 기술 스택

- Next.js 14.2.3 (App Router) + React 18 + TypeScript
- Tailwind CSS + Firebase (Firestore, Auth) + NextAuth v5
- 배포: Vercel

## 명령어

```bash
npm run dev      # 개발 서버
npm run build    # 프로덕션 빌드
npm run lint     # ESLint
```

## 소스 구조

```
src/
├── app/
│   ├── (admin)/          # 관리자 라우트 그룹 (admin, feedback)
│   ├── (users)/          # 사용자 라우트 그룹 (메인, contact, suggest)
│   └── api/auth/         # NextAuth 라우트
├── feature/              # 기능별 모듈
│   ├── admin/            # 관리자 로그인/로그아웃
│   ├── contact/          # 주소/연락처 카드
│   ├── feedback/         # 피드백 목록 및 답변 (관리자)
│   ├── introduce/        # 학원 소개 섹션
│   └── suggest/          # 건의사항 폼
├── firestore/            # Firestore 연동 (auth, suggest 헬퍼)
└── shared/               # 공통 컴포넌트 (Header, NavLinks 등)
```

## 개발 규칙

- `any` 금지, 명시적 반환 타입 선언
- Server Component 기본, 필요시만 `'use client'`
- 컴포넌트: PascalCase, 함수/변수: camelCase
- Tailwind 클래스 사용 (인라인 스타일 금지)
- 시맨틱 태그 사용, 웹 접근성 고려 (`aria-*`, `sr-only`)
- 반응형 breakpoint: 768px, 1024px

## Git 워크플로우

- **브랜치 전략**: `main` ← `feature/<이슈번호>-설명`
  - `main`: 배포용 (직접 커밋 금지)
  - `feature/<이슈번호>-설명`: main에서 분기, 작업 완료 후 **main으로 PR**
- 한글 커밋 메시지

## 작업 로그

작업 시작 전 반드시 `docs/work-logs/`에 로그 파일 생성 후 진행.

| 작업 로그                              | 설명                          |
| -------------------------------------- | ----------------------------- |
| `docs/work-logs/README.md`             | 작업 로그 템플릿 및 작성 규칙 |
| `docs/work-logs/YYYY-MM-DD-작업명.md` | 개별 작업 로그                |

## Claude 작업 규칙

### 작업 시작 전

1. `docs/work-logs/YYYY-MM-DD-작업명.md` 파일 생성
2. 목표, 관련 파일, 예상 단계 작성
3. 진행하면서 상태 업데이트

### 작업 로그 생성 시점

**명확한 작업 요청:**

> "OOO 기능 추가해줘" → 즉시 작업 로그 생성

**질문/디버깅으로 시작하는 경우:**

> "왜 안 돼?", "이거 뭐가 문제야?" → 원인 분석 → 해결책 제안

이 경우 다음 시점에서 작업 로그 생성:

- 사용자가 해결책을 선택/확정할 때
- 코드 수정을 시작하기 직전

### 작업 중단 시

- "중단 시 이어서 할 작업" 섹션에 다음 단계 기록
- 상태를 "중단"으로 변경

### 작업 재개 시

- 작업 로그 파일 읽고 이어서 진행
- 새 날짜 섹션 추가하여 진행 상황 기록
