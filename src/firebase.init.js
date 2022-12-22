
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD1_j-XC487VE1o-smijj3V9IRA5-anmRA",
  authDomain: "portfolio-8c270.firebaseapp.com",
  projectId: "portfolio-8c270",
  storageBucket: "portfolio-8c270.appspot.com",
  messagingSenderId: "298458695213",
  appId: "1:298458695213:web:c5d8cbfda6fc37af401aa4"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export default auth;