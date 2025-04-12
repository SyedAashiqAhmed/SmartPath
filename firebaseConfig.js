import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyC3XU3hnTjU1waKY1A2OuYruEj7I9BIEW8",
  authDomain: "smart-path-navigator-43b4e.firebaseapp.com",
  databaseURL: "https://smart-path-navigator-43b4e-default-rtdb.firebaseio.com",
  projectId: "smart-path-navigator-43b4e",
  storageBucket: "smart-path-navigator-43b4e.appspot.com",
  messagingSenderId: "499049995866",
  appId: "1:499049995866:web:b7e88403d81cb07b9ec263"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
