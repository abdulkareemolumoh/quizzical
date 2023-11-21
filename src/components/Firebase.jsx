import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBzfd2pAEHV2ute-mTxsh-zHpGsnu95tKU",
  authDomain: "quizzical-43dd1.firebaseapp.com",
  projectId: "quizzical-43dd1",
  storageBucket: "quizzical-43dd1.appspot.com",
  messagingSenderId: "321881931492",
  appId: "1:321881931492:web:e457ffa39aa5d52c9f76f1",
  measurementId: "G-T8RFS8CP47",
};

//   const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
