# 울산 남구 옥동 1.6수학학원

## 프로젝트 개요

상표를 한글로 등록해야 해서 학부모님들이 1.6수학과학학원을 검색했을때, 학원 정보를 얻지 못합니다.  
이를 간단한 학원 주소 및 연락처가 담긴 웹페이지 제작을 통해서 SEO에 노출시키는 프로젝트

## 프로젝트 목표

1. 네이버 및 구글 검색엔진에서 1.6 수학과학학원, 일점육수학과학학원, 옥동학원의 키워드로 검색시 노출되도록 하기
2. Tailwind를 활용한 CSS스타일링
3. Next.js 14 App Router를 활용한 프로젝트
4. 스크린 리더로도 읽을 수 있도록 시맨틱 태그 작성
5. 반응형 UI ( 학부모님들이 휴대폰으로도 볼 수 있으므로)
6. 컴퍼넌트를 관심사에 따라 분리 (원티드 강의에서 배운 값, 계산, 액션에 집중하기)
7. screen reader를 사용하여 웹 접근성 개선하기

## 사용 기술 스텍

next.js(app-router), tailwindcss, vercel

## 페이지 소개

현재는 간단한 주소와 연락처가 남긴 페이지만 이루어져 있다.(구체적인 홍보 방안 및 타 프로젝트 , 정보처리기사 종료 시 디벨롭)  
사이드주소 : https://1-6math.vercel.app/
![image](https://github.com/suhong99/1.6math/assets/120103909/34b6b497-3f25-4d11-bd27-f359e4e408f3)  
![image](https://github.com/suhong99/1.6math/assets/120103909/91781004-5479-4ced-b696-f6c3a3368099)

## 작업 내용

![image](https://github.com/suhong99/1.6math/assets/120103909/57698e9f-dee2-4d71-ac21-78b5c44e001b)

### 검색엔진 노출

address 태그, metaData등의 시멘틱 태그 활용과 sitemap.xml, robots.txt, 사이트 소유 설정을 통해 검색엔진 노출  
관련 개발일지 : https://ungumungum.tistory.com/112

### 웹 접근성 향상

nvda 스크린리더를 통해 웹사이트 확인후 웹 접근성 개선

#### 1. aria-hidden 옵션을 통해서 시각적인 기호 screen reader에 읽히지 않도록 설정

```jsx
<span
  className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none"
  aria-hidden="true"
>
  -&gt;
</span>
```

#### 2. sr-only 태그를 활용하여 스크린리더로 읽을 시 버튼에 대한 부여 설명

```jsx
<span className="sr-only">클릭시 번호가 클립보드에 저장됩니다</span>
```

```css
sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### 반응형 UI

tailwind css를 활용하여 반응형 UI  
breakpoint : 768px, 1024px
case : 1024 이상  
![image](https://github.com/suhong99/1.6math/assets/120103909/f5bcdca7-39db-4092-b2d8-3abccd1b3af1)

case : 768 ~ 1024이하  
![image](https://github.com/suhong99/1.6math/assets/120103909/30b6d3a3-5327-45b3-8f7b-71acb2f545ac)

case : 768 이하  
![image](https://github.com/suhong99/1.6math/assets/120103909/9e0ce33e-c562-4759-a0e3-1f993743e58f)
