import { useRouter, useSearchParams } from 'next/navigation';

export const useFilterParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL의 'filter' 쿼리 파라미터를 추출, 기본값은 'all'
  const currentFilter = searchParams.get('filter') || 'all';

  const setFilter = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // 'filter' 파라미터를 변경
    newSearchParams.set('filter', value);

    // 변경된 파라미터로 router.push
    router.push(`?${newSearchParams.toString()}`);
  };

  return {
    currentFilter,
    setFilter,
  };
};
