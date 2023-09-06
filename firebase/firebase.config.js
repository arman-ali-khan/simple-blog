// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhxjc0wacWprd3R2TYRp1_pIrmthHvc4M",
  authDomain: "simplw-blog.firebaseapp.com",
  projectId: "simplw-blog",
  storageBucket: "simplw-blog.appspot.com",
  messagingSenderId: "394022391579",
  appId: "1:394022391579:web:4254a964c011daad710dbe",
  measurementId: "G-WLRN2J4SEM"
};

// Initialize Firebase
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;