import { database } from './firebase';
import { ref, set, update, onValue, get } from 'firebase/database';

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

export const getUserNameAndAccount = async userId => {
  const userRef = ref(database, `users/${userId}`);
  const snapshot = await get(userRef);
  const userData = snapshot.val();
  const { name, accountInfo } = userData;
  return { name, accountInfo };
};

// 방 코드 생성 함수
const generateRandomString = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters[randomIndex];
  }

  return randomString;
};

// 방 코드로 방을 찾는 함수
export const findRoomByCode = async roomCode => {
  const roomRef = ref(database, `rooms/${roomCode}`);
  const roomSnapshot = await get(roomRef);
  return roomSnapshot.exists() ? roomSnapshot.val() : null;
};

// 방 코드를 생성하고, 방 정보에 사용자 id를 추가하는 함수
export const updateRoomCode = async (user, roomName) => {
  const roomCode = generateRandomString();
  const roomRef = ref(database, `rooms/${roomCode}`);

  // 빈 객체로 초기화된 사용자 정보
  const userInitialData = { titles: [''], prices: [''] };

  // 사용자 ID를 `users` 객체에 추가
  const userRef = ref(database, `rooms/${roomCode}/users/${user.uid}`);
  await set(userRef, userInitialData);

  // 방 정보 추가
  const roomData = {
    name: roomName,
  };
  await update(roomRef, roomData);

  return roomCode;
};

// 기존 방에 사용자 정보를 추가하는 함수
export const addUserToRoom = async (roomCode, user) => {
  const roomRef = ref(database, `rooms/${roomCode}/users/${user.uid}`);
  const snapshot = await get(roomRef);

  if (!snapshot.exists()) {
    const userInfo = { titles: [''], prices: [''] };
    await update(roomRef, userInfo);
  }
};

// 해당 방에 사용자 정보를 실시간으로 불러오는 함수
export const getUsersRoomData = (roomCode, callback) => {
  const usersRef = ref(database, `rooms/${roomCode}/users`);
  onValue(usersRef, snapshot => {
    if (snapshot.exists()) {
      const usersData = snapshot.val();
      callback(usersData);
    }
  });
};

// 사용자가 지불한 내역을 저장하는 함수
export const updateUserPrice = async (roomCode, userId, price, title) => {
  const userRef = ref(database, `rooms/${roomCode}/users/${userId}`);
  // 기존 데이터를 가져온 후, 새로운 데이터를 추가하여 업데이트
  const userSnapshot = await get(userRef);
  const existingData = userSnapshot.val();

  // 새로운 데이터 추가
  const newData = {
    ...existingData,
    titles: [...existingData?.titles, title],
    prices: [...existingData?.prices, price],
  };

  update(userRef, newData);
};
