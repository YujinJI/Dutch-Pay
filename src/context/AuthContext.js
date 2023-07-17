import { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { authService } from '../service/firebase';
import { getUserInfo, saveUserInfo, updateUserAccount } from '../service/database';

const AuthContext = createContext({
  user: {},
  isLoggedIn: false,
  signInWithEmail: () => {},
  logInWithEmail: () => {},
  logInWithGoogle: () => {},
  logOut: () => {},
  userInfo: {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userInfo, setUserInfo] = useState([]);

  const signInWithEmail = (email, password) => {
    createUserWithEmailAndPassword(authService, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        if (!user.displayName) {
          user.displayName = prompt('이름을 입력하세요');
        }
        console.log('logInWithEmail', user);
        const userInfo = {
          name: user.displayName,
          profile: user.photoURL,
        };
        saveUserInfo(user.uid, userInfo);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const logInWithEmail = (email, password) => {
    signInWithEmailAndPassword(authService, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        console.log('logInWithEmail', user);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const logInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider).then(userCredential => {
      console.log('logInWithGoogle', userCredential.user);
      const user = userCredential.user;
      const userInfo = {
        name: user.displayName,
        profile: user.photoURL,
      };
      saveUserInfo(user.uid, userInfo);
    });
  };

  const logOut = () => {
    signOut(authService).then();
  };

  const authContext = {
    user,
    isLoggedIn: !!user?.accessToken,
    signInWithEmail,
    logInWithEmail,
    logInWithGoogle,
    logOut,
    userInfo,
  };

  useEffect(() => {
    const stateChange = onAuthStateChanged(authService, async currentUser => {
      console.log('현재 유저', currentUser);
      setUser(currentUser);
      if (currentUser) {
        const account = await getUserInfo(currentUser.uid);
        setUserInfo(account);
      }
    });

    return () => {
      stateChange();
    };
  }, []);

  console.log('userInfo => ', userInfo);

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthContext;
