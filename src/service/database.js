import { database } from './firebase';
import { ref, set, update, onValue } from 'firebase/database';

export const saveUserInfo = (userId, userInfo) => {
  const userRef = ref(database, `users/${userId}`);
  update(userRef, userInfo);
};

export const updateUserAccount = (userId, accountInfo) => {
  const userRef = ref(database, `users/${userId}/accountInfo`);
  update(userRef, accountInfo);
};

export const getUserInfo = userId => {
  return new Promise((resolve, reject) => {
    const userRef = ref(database, `users/${userId}/`);
    onValue(userRef, snapshot => {
      if (snapshot.exists()) {
        const userInfo = snapshot.val();
        resolve(userInfo);
      } else {
        reject(new Error('User info not found'));
      }
    });
  });
};
