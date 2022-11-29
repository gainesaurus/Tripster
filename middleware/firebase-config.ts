import admin from 'firebase-admin';
import * as firebase from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

let app: firebase.App;
if (firebase.getApps().length === 0) {
  app = firebase.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
} else {
  app = firebase.getApp();
}

const auth = getAuth(app);
export default auth;
