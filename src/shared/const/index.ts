export const NAVER_MAP_URL =
  'https://map.naver.com/p/entry/place/2026739720?c=17.25,0,0,0,dh&placePath=/home?from=map&fromPanelNum=1&additionalHeight=76&timestamp=202604111922&locale=ko&svcName=map_pcv5';

export const NAVIGATION_LIST = [
  { label: '학원 소개', url: '/' },
  { label: '오시는 길', url: '/contact' },
  { label: '익명 건의함', url: '/suggest' },
];

export const PHONE_DATA: { number: string; title: string; name: string }[] = [
  { number: '052-261-5515', title: '학원 번호', name: '상담실' },
  { number: '010-4554-1172', title: '수학 원장', name: '김진천 원장' },
  { number: '010-4101-2955', title: '수학 원장', name: '이근호 원장' },
];

export const GRADE_OPTION: { value: string; text: string }[] = [
  { value: '초5', text: '초등학교 5학년' },
  { value: '초6', text: '초등학교 6학년' },
  { value: '중1', text: '중학교 1학년' },
  { value: '중2', text: '중학교 2학년' },
  { value: '중3', text: '중학교 3학년' },
  { value: '고1', text: '고등학교 1학년' },
  { value: '고2', text: '고등학교 2학년' },
  { value: '고3', text: '고등학교 3학년' },
];

export const SURVEY_TYPE: string[] = ['건의 사항', '불편 사항', '기타 의견'];
