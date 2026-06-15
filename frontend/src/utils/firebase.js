
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "authexamnotesai-e3866.firebaseapp.com",
  projectId: "authexamnotesai-e3866",
  storageBucket: "authexamnotesai-e3866.firebasestorage.app",
  messagingSenderId: "61008222630",
  appId: "1:61008222630:web:56b9da5bd67c67bc9bd767"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);  // here we initialize the auth object using the initialized app because we need to pass the app to the getAuth function to get the auth object

const provider = new GoogleAuthProvider(); // here we initialize the provider object using the GoogleAuthProvider class from firebase/auth because we need to pass the provider to the signInWithPopup function to get the user data

export { auth, provider };