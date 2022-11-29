import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAZtxh4OcQe3eZ9L0ZdEBSPgnBXaiX8DVo',
  authDomain: 'phone-shop-84650.firebaseapp.com',
  projectId: 'phone-shop-84650',
  storageBucket: 'phone-shop-84650.appspot.com',
  messagingSenderId: '131463443423',
  appId: '1:131463443423:web:0390e09755faf800d38a6a',
  measurementId: 'G-P03PGDLXX6',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };
