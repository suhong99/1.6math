import FeedbackCard from '@/feature/feedback/components/FeedbackCard';
import ReplyFeedback from '@/feature/feedback/components/ReplyFeedback';
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
      <main>
        <h1>데이터를 찾을 수 없습니다.</h1>
        <p>해당 건의 사항이 존재하지 않거나 삭제되었습니다.</p>
      </main>
    );
  }
  const formattedDetail = {
    ...detail,
    date: detail.date.toDate(),
    id: id,
    lastChecked: detail.lastChecked ? detail.lastChecked.toDate() : null,
  };

  return (
    <main className="min-w-[300px]">
      <FeedbackCard {...formattedDetail} />
      <ReplyFeedback id={id} />
    </main>
  );
}
