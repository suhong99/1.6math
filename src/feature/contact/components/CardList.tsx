import { CardDescription, CardTitle, CardClipWrapper } from './Card';

const data: { text: string; title: string; name: string }[] = [
  { text: '052-261-5515', title: '학원 번호', name: '상담실' },
  { text: '010-4554-1172', title: '수학 원장', name: '김진천 원장' },
  { text: '010-4101-2955', title: '수학 원장', name: '이근호 원장' },
  { text: '010-9308-3869', title: '과학 원장', name: '신규하 원장' },
];

export default function CardList() {
  return (
    <div className="mb-16 grid text-center gap-5 items-center  justify-items-center md:px-10 md:grid-cols-2 lg:items-start lg:text-left w-full lg:mb-0  lg:max-w-5xl lg:grid-cols-4">
      {data.map(({ text, title, name }) => {
        return (
          <CardClipWrapper key={text} text={text}>
            <CardTitle title={title} />
            <CardDescription text={text} size="lg" />
            <CardDescription text={name} />
          </CardClipWrapper>
        );
      })}
    </div>
  );
}
