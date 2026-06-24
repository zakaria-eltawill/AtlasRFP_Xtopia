import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // We append a domain to the username since Firebase Auth expects an email.
    // For example: Ayoub -> Ayoub@atlas.com
    let rawUsername = usernameInput.value.trim();
    if (!rawUsername.includes('@')) {
        rawUsername += '@atlas.com';
    }

    const password = passwordInput.value;
    
    try {
        await signInWithEmailAndPassword(auth, rawUsername, password);
        // On success, redirect to index
        window.location.href = 'index.html';
    } catch (error) {
        // If user not found, try to register the user seamlessly (for initial setup of the 'Ayoub' account)
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
             try {
                await createUserWithEmailAndPassword(auth, rawUsername, password);
                window.location.href = 'index.html';
             } catch (createError) {
                // If it fails (e.g. auth not enabled), show error
                if (createError.code === 'auth/operation-not-allowed') {
                    showError('Email/Password auth is not enabled in the Firebase Console.');
                } else {
                    showError('Invalid credentials. Please check your username and password.');
                }
             }
        } else if (error.code === 'auth/operation-not-allowed') {
            showError('Email/Password auth is not enabled in the Firebase Console.');
        } else {
            showError('Invalid credentials. Please check your username and password.');
        }
    }
});

function showError(msg) {
    errorMessage.textContent = msg;
    errorMessage.style.display = 'block';
}
