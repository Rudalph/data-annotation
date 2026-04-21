// import { initializeApp, getApps, getApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyANLDrSYrAQHMJsvvKzgYMEORZpHO7ef5o",
//   authDomain: "data-annotation-33fee.firebaseapp.com",
//   projectId: "data-annotation-33fee",
//   storageBucket: "data-annotation-33fee.firebasestorage.app",
//   messagingSenderId: "346189583606",
//   appId: "1:346189583606:web:208cf18ac2b387612948d7",
//   measurementId: "G-KW7S9RRLW4"
// };

// const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

// const db = getFirestore(app);
// const storage = getStorage(app);

// export { app, db, storage };

import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANLDrSYrAQHMJsvvKzgYMEORZpHO7ef5o",
  authDomain: "data-annotation-33fee.firebaseapp.com",
  projectId: "data-annotation-33fee",
  storageBucket: "data-annotation-33fee.firebasestorage.app",
  messagingSenderId: "346189583606",
  appId: "1:346189583606:web:208cf18ac2b387612948d7",
  measurementId: "G-KW7S9RRLW4"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };