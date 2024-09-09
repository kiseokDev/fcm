// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAS8X7E5Un6yXFSodA2uAoCbTH8FBtKAUg",
  authDomain: "fcm-test-32da4.firebaseapp.com",
  projectId: "fcm-test-32da4",
  storageBucket: "fcm-test-32da4.appspot.com",
  messagingSenderId: "197120868708",
  appId: "1:197120868708:web:e8eedc7a1e6c0e835afa71",
  measurementId: "G-3FKX2495V4",
};
export const vapidKey =
  "BHTEfJmhEJ8CFX9d3mWp6VyE8-BzuFXc3PRvHcPZ9qGeYPhAARaLQH1bbeYKcdNkeOVw25H9K9Ya4UslSe83d18";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
