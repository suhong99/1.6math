import { doc, getDoc } from 'firebase/firestore';
import { store } from '../firestore';
import { COLLECTIONS } from '../const/collection';

//TODO:
export const checkUser = async ({ email }: { email: string }) => {
  try {
    const userRef = doc(store, COLLECTIONS.USERS, email);
    console.log(email);
    const userSnap = await getDoc(userRef);

    // console.log(userSnap, '스냅확인');
    // if (userSnap.exists()) {
    //   return true;
    // }
    return false;
  } catch (error) {
    console.error('유저 확인에서 에러가 발생하였습니다.', error);
    return false;
  }
};
