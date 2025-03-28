import {
  collection, addDoc, doc, getDocs, query, orderBy, deleteDoc, updateDoc,
} from './exports.js';
import { db } from './firebase-config.js';
import { current } from './auth.js';

export function creatingPost(text, author, book) {
  return addDoc(collection(db, 'post'), {
    displayName: current().displayName,
    photoURL: current().photoURL,
    post: `❝${text}❞`,
    author: `— ${author}`,
    book,
    date: new Date(),
    userId: current().uid,
    likes: [],
    read: [],
    toRead: [],
  });
}

export async function gettingPost() {
  const queryResult = query(collection(db, 'post'), orderBy('date', 'desc'));
  const gotDoc = await getDocs(queryResult);
  return gotDoc;
}

export async function deletingPost(postId) {
  await deleteDoc(doc(db, 'post', postId));
}

export async function editingPost(postId, post) {
  await updateDoc(doc(db, 'post', postId), post);
}
