/**
 * @jest-environment jsdom
 */
// importamos la funcion que vamos a testear
import {
  initWithGoogle, createNewUser, loginEmailPassword, userLogOut, handleStateChanged,
} from '../src/firebase-services/auth.js';
import {
  creatingPost, deletingPost, editingPost, gettingPost,
} from '../src/firebase-services/firestore.js';
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateDoc,
  deleteDoc,
  addDoc,
  signOut, getDocs,
} from '../src/firebase-services/exports.js';

jest.mock('../src/firebase-services/exports.js');

describe('initWithGoogle', () => {
  it('a função deve possibilitar login com o Google', () => {
    initWithGoogle();
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
  });
});

describe('createNewUser', () => {
  it('a função deve possibilitar criar um novo usuario com email e senha', async () => {
    createUserWithEmailAndPassword.mockResolvedValue({});
    await createNewUser();
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe('loginEmailPassword', () => {
  it('a função deve possibilitar fazer login com email e senha', () => {
    loginEmailPassword();
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

describe('handleStateChanged', () => {
  it('se o usuario não é nulo a função deve ir para a pagina do feed', () => {
    const user = { currentUser: {} };
    handleStateChanged(user);
    expect(window.location.hash).toBe('#feed');
  });
  it('se o usuario é nulo a função deve permanecer na mesma pagina', () => {
    const user = null;
    window.location.hash = '#homePage';
    handleStateChanged(user);
    expect(window.location.hash).toBe('#homePage');
  });
});

describe('userLogOut', () => {
  it('a função deve possibilitar fazer logout', () => {
    userLogOut();
    expect(signOut).toHaveBeenCalledTimes(1);
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

describe('creatingPost', () => {
  it('a função deve possibilitar criar um post', () => {
    creatingPost();
    expect(addDoc).toHaveBeenCalledTimes(1);
  });
});

describe('gettingPost', () => {
  it('a função deve possibilitar pegar um post', () => {
    gettingPost();
    expect(getDocs).toHaveBeenCalledTimes(1);
  });
});
