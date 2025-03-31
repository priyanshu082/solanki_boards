import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDS7unQWlqvuffQ0qkdSqECLXo2hwf-q10",
    authDomain: "ai-chatbot-20e70.firebaseapp.com",
    projectId: "ai-chatbot-20e70",
    storageBucket: "ai-chatbot-20e70.firebasestorage.app",
    messagingSenderId: "375820780350",
    appId: "1:375820780350:web:a0aef25b8e369f0877226f",
    measurementId: "G-GFLC1XEZKX"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  // Function to update visitor count
  export const updateVisitorCount = async () => {
    const docRef = doc(db, "visitors", "counter");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      await updateDoc(docRef, { count: docSnap.data().count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
  };
  
  // Function to get visitor count
  export const getVisitorCount = async () => {
    const docRef = doc(db, "visitors", "counter");
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().count : 0;
  };