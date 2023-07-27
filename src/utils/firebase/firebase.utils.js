import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';

import { getDoc, setDoc, doc, getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAtF__LJEAs5q7U6KJxypM8z_0WMRHzHhg',
  authDomain: 'crwn-clothing-db-184fa.firebaseapp.com',
  projectId: 'crwn-clothing-db-184fa',
  storageBucket: 'crwn-clothing-db-184fa.appspot.com',
  messagingSenderId: '51495862383',
  appId: '1:51495862383:web:f936d26af1316317e94d9a',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  promt: 'select_account',
});
export const auth = getAuth();
export const signInWithGooglePopup = () => {
  return signInWithPopup(auth, provider);
};

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (e) {
      console.log('Error Creating User', e.message);
    }
  }
  return userDocRef;
};
