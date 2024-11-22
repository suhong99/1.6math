import FeedbackCard from '@/feature/feedback/components/FeedbackCard';
import { readSuggestDetail } from '@/firestore/helper/suggest';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const detail = await readSuggestDetail(id);

  if (!detail) {
    return (
      <div>
        <h1>데이터를 찾을 수 없습니다.</h1>
        <p>해당 건의 사항이 존재하지 않거나 삭제되었습니다.</p>
      </div>
    );
  }
  const formattedDetail = {
    ...detail,
    date: detail.date.toDate(),
    lastChecked: detail.lastChecked ? detail.lastChecked.toDate() : null,
  };

  return (
    <div>
      <FeedbackCard {...formattedDetail} />
    </div>
  );
}
