import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

const signUp = async (email?: string, password?: string) => {
  let user: UserCredential;
  email !== undefined && password !== undefined
    ? (user = await createUserWithEmailAndPassword(auth, email, password))
    : (user = await signInWithPopup(auth, provider));
  return user;
};

const signIn = async (email?: string, password?: string) => {
  let user: UserCredential;
  email !== undefined && password !== undefined
    ? (user = await signInWithEmailAndPassword(auth, email, password))
    : (user = await signInWithPopup(auth, provider));
  return user;
};

export { auth, provider, storage, signIn, signUp };
