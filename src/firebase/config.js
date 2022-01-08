import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDntT_FPeXQYgZSqveORH2WgF8ZdcvXvtE",
  authDomain: "myswitchgames.firebaseapp.com",
  projectId: "myswitchgames",
  storageBucket: "myswitchgames.appspot.com",
  messagingSenderId: "508102093668",
  appId: "1:508102093668:web:f1e80b8852cff41dfda871",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
