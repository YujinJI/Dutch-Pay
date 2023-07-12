import { createContext, useState, useEffect } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { authService } from '../service/firebase';

const AuthContext = createContext({
  user: {},
  isLoggedIn: false,
  signInWithEmail: () => {},
  logInWithEmail: () => {},
  logInWithGoogle: () => {},
  logOut: () => {},
});

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const signInWithEmail = (email, password) => {
    createUserWithEmailAndPassword(authService, email, password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        if (!user.displayName) {
          const displayName = prompt('이름을 입력하세요');
          user.displayName = displayName;
        }
        console.log('logInWithEmail', user);
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
        if (!user.displayName) {
          const displayName = prompt('이름을 입력하세요');
          user.displayName = displayName;
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const logInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authService, provider).then(userCredential => {
      console.log('logInWithGoogle', userCredential.user);
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
  };

  useEffect(() => {
    const stateChange = onAuthStateChanged(authService, currentUser => {
      console.log('현재 유저', currentUser);
      setUser(currentUser);
    });

    return () => {
      stateChange();
    };
  }, []);

  return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

export default AuthContext;
