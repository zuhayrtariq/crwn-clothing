import { createContext, useState, useEffect } from 'react';
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from '../utils/firebase/firebase.utils';

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    console.log('Use Effect in User Context Ran');
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    console.log('This is unsubscribe', unsubscribe);
    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children} </UserContext.Provider>;
};
