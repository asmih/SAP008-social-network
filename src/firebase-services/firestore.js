import { collection, addDoc, doc, setDoc, getDocs, query, orderBy, Timestamp, deleteDoc, updateDoc } from "./exports.js";
import { db, auth } from "./firebase-config.js";
import { current } from "./auth.js";


export function creatingPost(text, author, book) {
  return addDoc(collection(db, 'post'), {
    displayName: current().displayName,
    photoURL: current().photoURL,
    post: '❝'+text+'❞',
    author: '— ' + author,
    book: book,
    date: new Date().toLocaleString('pt-br'),
    userId: current().uid,
    likes: [],
    read: [],
    toRead: [],
  }); 
     
};

export async function gettingPost() {
  const queryResult = query(collection(db, 'post'), orderBy('date', 'desc'))
 const gotDoc = await getDocs(queryResult)
 return gotDoc
}

export async function deletingPost(userId) {
  await deleteDoc(doc(db, 'post', userId));
}

