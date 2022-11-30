import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
  signOut,
  browserLocalPersistence,
} from 'firebase/auth';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { uuidv4 } from '@firebase/util';

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
  await auth.setPersistence(browserLocalPersistence);
  let user: UserCredential;
  email !== undefined && password !== undefined
    ? (user = await createUserWithEmailAndPassword(auth, email, password))
    : (user = await signInWithPopup(auth, provider));
  return user;
};

const signIn = async (email?: string, password?: string) => {
  await auth.setPersistence(browserLocalPersistence);
  let user: UserCredential;
  email !== undefined && password !== undefined
    ? (user = await signInWithEmailAndPassword(auth, email, password))
    : (user = await signInWithPopup(auth, provider));
  return user;
};

const logout = async () => {
  await signOut(auth);
};

const uploadImage = async (blob: ArrayBuffer) => {
  try {
    const uuid = uuidv4();
    const fileRef = ref(storage, 'trips/main_image/' + uuid);
    await uploadBytes(fileRef, blob);
    return { imageUuid: uuid, imageUrl: await getDownloadURL(fileRef) };
  } catch (error) {
    console.log('Error saving the image, please try again later');
    console.log(error);
  }
};

export { auth, provider, storage, signIn, signUp, logout, uploadImage };
