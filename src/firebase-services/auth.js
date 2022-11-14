import {
  signOut, signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
} from './exports.js';
import { auth } from './firebase-config.js';

export const handleStateChanged = (user) => {
  if (user) window.location.hash = '#feed';
};
onAuthStateChanged(auth, handleStateChanged);

export function current() {
  return auth.currentUser;
}

export const initWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export function userLogOut() {
  return signOut(auth);
}

export function createNewUser(name, email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function loginEmailPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(() => true)
    .catch(() => false);
}
