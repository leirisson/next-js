
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId:  process.env.PROJECT_ID,
    storageBucket: "tasks-plus-df293.firebasestorage.app",
    messagingSenderId:  process.env.APP_IDMESSAGING_SENDER_ID,
    appId:  process.env.APP_ID
};


const firebaseApp = initializeApp(firebaseConfig);

export const firebaseDB = getFirestore(firebaseApp)