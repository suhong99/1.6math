import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { COLLECTIONS } from '../const/collection';
import { store } from '../firestore';

export interface FeedBack {
  grade: string;
  category: string;
  title: string;
  content: string;
  date: Timestamp;
  reply: string | null;
  lastChecked: Timestamp | null;
}

export type Suggestion = Pick<
  FeedBack,
  'grade' | 'category' | 'title' | 'content'
>;

export const writeSuggest = async ({
  grade,
  category,
  title,
  content,
}: Suggestion) => {
  try {
    const suggestRef = collection(store, COLLECTIONS.SUGGEST);
    await addDoc(suggestRef, {
      grade,
      category,
      title,
      content,
      date: new Date(),
      reply: null,
      lastChecked: null,
    });

    return { message: '문의에 성공했습니다.' };
  } catch (error) {
    console.error('문의 과정에서 에러가 발생하였습니다.', error);
    return { message: '문의에 실패했습니다.' };
  }
};

export const readSuggest = async () => {
  const feedbackSnapshot = await getDocs(
    collection(store, COLLECTIONS.SUGGEST)
  );
  const feedbackList = feedbackSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as FeedBack),
  }));

  return feedbackList;
};

export const readSuggestDetail = async (
  id: string
): Promise<(FeedBack & { id: string }) | null> => {
  try {
    const docRef = doc(store, COLLECTIONS.SUGGEST, id); // 해당 id의 문서 참조
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return {
        id: docSnapshot.id,
        ...(docSnapshot.data() as FeedBack),
      };
    } else {
      console.error('No document found with the provided ID.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching document:', error);
    throw error;
  }
};
