import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage,ref } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDO8HrxAUArbANaIzyIQex74s_U9YCM-h0",
  authDomain: "linkedin-clone-39a57.firebaseapp.com",
  databaseURL: "https://linkedin-clone-39a57.firebaseio.com",
  projectId: "linkedin-clone-39a57",
  storageBucket: "linkedin-clone-39a57.appspot.com",
  messagingSenderId: "491601186011",
  appId: "1:491601186011:web:5075de84d0db609ec1d0fe",
  measurementId: "G-7EC9HKTJHV"
};
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  


//   const firebaseApp = firebase.initializeApp(firebaseConfig);
//   const db = firebaseApp.firestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

//   const storage = firebase.storage();
const storage=getStorage(app)
const storageRef=ref(storage);
  export { app,auth,provider,storage,storageRef};
  export default db
