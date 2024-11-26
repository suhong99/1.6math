import { doc, getDoc } from 'firebase/firestore';
import { store } from '../firestore';
import { COLLECTIONS } from '../const/collection';

export const checkUser = async ({
  email,
}: {
  email: string | null | undefined;
}) => {
  if (!email) return false;

  try {
    const userRef = doc(store, COLLECTIONS.USERS, email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('유저 확인에서 에러가 발생하였습니다.', error);
    return false;
  }
};
