import { PHONE_DATA } from '@/shared/const';
import { CardDescription, CardTitle, CardClipWrapper } from './Card';

export default function CardList() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 w-full">
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
