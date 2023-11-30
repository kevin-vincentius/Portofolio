// This is for firebase config
// apikey etc

import { getFirestore  } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

// const firebaseConfig = {
//   apiKey: "AIzaSyCtFidFE_UCDtfMiPZjFFtfGRPCRXe9dXg",
//   authDomain: "projek-kelompok-9b9ce.firebaseapp.com",
//   projectId: "projek-kelompok-9b9ce",
//   storageBucket: "projek-kelompok-9b9ce.appspot.com",
//   messagingSenderId: "909067324582",
//   appId: "1:909067324582:web:e5c2b0e0b4784c34b07867"
// };

const firebaseConfig = {
  apiKey: "AIzaSyAJ_Oglm_-AT9zf7onDdAQ5f4tI_FvfSe8",
  authDomain: "test-firebase-e5228.firebaseapp.com",
  databaseURL: "https://test-firebase-e5228-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "test-firebase-e5228",
  storageBucket: "test-firebase-e5228.appspot.com",
  messagingSenderId: "784211678736",
  appId: "1:784211678736:web:998d7ea8b4c67d318f9c95",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };