import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/storage';
import { getStorage } from "firebase/storage";


const firebaseApp={
  
    apiKey: "AIzaSyBRCQCfcXozWoQwH1c-s8MwQa_ZhGEsoX0",
    authDomain: "dewdrop-fir.firebaseapp.com",
    projectId: "dewdrop-fir",
    storageBucket: "dewdrop-fir.appspot.com",
    messagingSenderId: "192035888447",
    appId: "1:192035888447:web:1d6b9604a70f768097878a"
  
};

const app =initializeApp(firebaseApp);
const db = getFirestore();
const auth = getAuth(app);
const storage=getStorage();

export { db, auth }





