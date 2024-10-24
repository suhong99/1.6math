import { doc, setDoc } from 'firebase/firestore';
import { COLLECTIONS } from '../const/collection';
import { store } from '../firestore';

export const writeSuggest = async ({
  grade,
  category,
  title,
  content,
}: {
  grade: string;
  category: string;
  title: string;
  content: string;
}) => {
  try {
    const userRef = doc(store, COLLECTIONS.SUGGEST, title);
    await setDoc(userRef, {
      grade,
      category,
      title,
      content,
      date: new Date(),
    });

    return { message: '문의에 성공했습니다.' };
  } catch (error) {
    console.error('문의 과정에서 에러가 발생하였습니다.', error);
    return { message: '문의에 실패했습니다.' };
  }
};
