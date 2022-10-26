// import { db } from "../firebase-config";

  export const initializeApp = jest.fn();
  export const getAuth = jest.fn();
  export const signInWithPopup = jest.fn();
  export const signInWithEmailAndPassword = jest.fn().mockImplementation(() => Promise.resolve());
  export const createUserWithEmailAndPassword = jest.fn();
  export const onAuthStateChanged = jest.fn();
  export const GoogleAuthProvider = jest.fn();
  export const signOut = jest.fn();
  export const getFirestore = jest.fn();
  console.log("oi")