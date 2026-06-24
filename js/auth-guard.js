import { auth } from './firebase-config.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Check if the user is logged in. If not, redirect to login page.
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // User is signed out
    window.location.replace('login.html');
  } else {
    // User is signed in, optionally show the page body which we can hide by default to prevent flickering
    document.body.style.display = 'block';
  }
});
