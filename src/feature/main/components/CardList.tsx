import {
  CardDescription,
  CardTitle,
  CardClipWrapper,
  CardLinkWrapper,
} from './Card';

export default function CardList() {
  return (
    <div className="mb-16 grid text-center lg:text-left lg:w-full lg:mb-0  lg:max-w-5xl md:grid-cols-2 lg:grid-cols-4  m-3">
      <CardLinkWrapper link="https://map.naver.com/p/entry/place/1426094200?c=15.00,0,0,0,dh">
        <CardTitle title="오시는 길" />
        <address className="m-0 max-w-[30ch] text-sm opacity-50">
          울산 남구 문수로335번길 6 <br /> 길상 빌딩 5층
        </address>
        <CardDescription text="클릭 시 네이버지도로 이동" size="xs" />
      </CardLinkWrapper>

      <CardClipWrapper text={'052-261-5515'}>
        <CardTitle title="연락처" />
        <CardDescription text="052-261-5515" size="lg" />
      </CardClipWrapper>

      <CardClipWrapper text={'010-4554-1172'}>
        <CardTitle title="수학 원장" />
        <CardDescription text="010-4554-1172" size="lg" />
        <CardDescription text="김진천 원장" />
      </CardClipWrapper>
      <CardClipWrapper text={'010-9308-3869'}>
        <CardTitle title="과학 원장" />
        <CardDescription text="010-9308-3869" size="lg" />
        <CardDescription text="신규하 원장" />
      </CardClipWrapper>
    </div>
  );
}
