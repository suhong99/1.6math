# UI 색상 통일 및 FloatingBtn 리팩토링

## 개요

- **시작일**: 2026-04-13
- **상태**: 완료
- **관련 브랜치**: feature/86

## 목표

### 오시는길 / 문의함 색상 통일

- [x] Contact 페이지 → ContentWrapper + slate/amber 색상 시스템 적용
- [x] Card 컴포넌트 → gray 계열 제거, slate/amber 통일
- [x] Address 컴포넌트 → 색상 결 통일
- [x] Suggest 페이지 → ContentWrapper 구조 + slate/amber 색상
- [x] SuggestForm → gray/blue → slate/amber 색상 교체

### FloatingBtn 스피드 다이얼

- [x] amber FAB 하나로 축소 (평상시 공간 최소화)
- [x] 클릭 시 3개 옵션 위로 펼침 (스피드 다이얼)
- [x] slate-900 + amber-500 색상 시스템 통일
- [x] SVG 이미지 → 인라인 SVG로 교체 (색상 제어)
- [x] 임의값 제거, 반응형 정비

## 진행 상황

### 2026-04-13

- 어제 리디자인 색상 시스템 확인: slate-900/800 다크 + amber-500/400 강조 + bg-white 라이트
- Contact/Suggest 페이지에 ContentWrapper 구조 적용, gray 계열 전부 slate/amber로 교체
- FloatingBtn을 스피드 다이얼 방식으로 전면 교체 (기존 흰 원형 3개 → amber FAB + 펼침 옵션)

## 실행 스크립트

```bash
npm run dev
npm run build
```

## 관련 파일

- `src/app/(users)/contact/page.tsx`
- `src/app/(users)/suggest/page.tsx`
- `src/feature/contact/components/Card.tsx`
- `src/feature/contact/components/CardList.tsx`
- `src/feature/contact/components/Address.tsx`
- `src/feature/suggest/component/SuggestForm.tsx`
- `src/shared/components/FloatingBtn.tsx`
- `src/app/(users)/layout.tsx`
