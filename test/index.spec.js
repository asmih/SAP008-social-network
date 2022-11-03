// importamos la funcion que vamos a testear
import { initWithGoogle, createNewUser, loginEmailPassword } from '../src/firebase-services/auth.js';
import { creatingPost, gettingPost, deletingPost, editingPost } from '../src/firebase-services/firestore.js';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, getDocs, updateDoc, deleteDoc } from '../src/firebase-services/exports.js';

jest.mock('../src/firebase-services/exports.js');

describe('initWithGoogle', () => {
  it('a função deve possibilitar login com o Google', () => {
    initWithGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('createNewUser', () => {
  it('a função deve possibilitar criar um novo usuario com email e senha', () => {
    createNewUser();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe('loginEmailPassword', () => {
  it('a função deve possibilitar fazer login com email e senha', () => {
    loginEmailPassword();
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe('deletingPost', () => {
  it('a função deve possibilitar deletar um post', () => {
    deletingPost();
    expect(deleteDoc).toHaveBeenCalledTimes(1);
  });
});

describe('editingPost', () => {
  it('a função deve possibilitar fazer atualização no post', () => {
    editingPost();
    expect(updateDoc).toHaveBeenCalledTimes(1);
  });
});
