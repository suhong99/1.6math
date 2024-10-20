import { PHONE_DATA } from '@/shared/const';
import { CardDescription, CardTitle, CardClipWrapper } from './Card';

export default function CardList() {
  return (
    <div className="mb-16 grid text-center gap-5 items-center  justify-items-center md:px-10 md:grid-cols-2 lg:items-start lg:text-left w-full lg:mb-0  lg:max-w-5xl lg:grid-cols-4">
      {PHONE_DATA.map(({ number, title, name }) => {
        return (
          <CardClipWrapper key={number} text={number}>
            <CardTitle title={title} />
            <CardDescription text={number} size="lg" />
            <CardDescription text={name} />
          </CardClipWrapper>
        );
      })}
    </div>
  );
}
