import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAm5x7cUAogdiKm3QTLwLEH60QiRpkHv5Y",
  authDomain: "clubcap-53fda.firebaseapp.com",
  projectId: "clubcap-53fda",
  storageBucket: "clubcap-53fda.appspot.com",
  messagingSenderId: "405788429147",
  appId: "1:405788429147:web:88d490b3c4c979e8e0e87e",
  measurementId: "G-PTKQMHN5SN"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);