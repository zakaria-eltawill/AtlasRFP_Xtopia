import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const firebaseConfig = {
  projectId: "todo25-app",
  appId: "1:40022198350:web:1cc94d0c7a71ecac13db1f",
  storageBucket: "todo25-app.firebasestorage.app",
  apiKey: "AIzaSyB9p2VlbL35Q0TjjKvLc6qHt8IFqO7rfVU",
  authDomain: "todo25-app.firebaseapp.com",
  messagingSenderId: "40022198350",
  measurementId: "G-57JGSSNK95"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
