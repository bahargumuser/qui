
import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCOrKYslhBhHISDIzKMbvRBVyfc6YPJyU8",
  authDomain: "library2-c0855.firebaseapp.com",
  projectId: "library2-c0855",
  storageBucket: "library2-c0855.appspot.com",
  messagingSenderId: "1087922158401",
  appId: "1:1087922158401:web:3fd14f4f7732918cec7fc0"
};

const app = initializeApp(firebaseConfig);

export default getFirestore();

export const db = getFirestore(app);

const books = collection(db, "books");

getDocs(books).then((snapshot) => {
  console.log(snapshot.docs);
});
