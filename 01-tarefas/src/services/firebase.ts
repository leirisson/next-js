
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDyY3l3TrD1vQ_t1-UCi1ckdUyEZ7Y8Mt0",
    authDomain: "tasks-plus-df293.firebaseapp.com",
    projectId: "tasks-plus-df293",
    storageBucket: "tasks-plus-df293.firebasestorage.app",
    messagingSenderId: "228321198494",
    appId: "1:228321198494:web:8cfdc9157fd7409f94968f"
};


const firebaseApp = initializeApp(firebaseConfig);

export const firebaseDB = getFirestore(firebaseApp)