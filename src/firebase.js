import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyBQHEA2PhVh8Mzqev5pDQ0EvKkbDYaATUI",
    authDomain: "mygoal-1628a.firebaseapp.com",
    databaseURL: "https://mygoal-1628a-default-rtdb.firebaseio.com",
    projectId: "mygoal-1628a",
    storageBucket: "mygoal-1628a.appspot.com",
    messagingSenderId: "938466374718",
    appId: "1:938466374718:web:21916fb661f4739b080d6f",
    measurementId: "G-WMZPZF8XK8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth();
