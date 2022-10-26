// importamos la funcion que vamos a testear
import { initWithGoogle, createNewUser, loginEmailPassword } from '../src/firebase-services/auth.js';
import { signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '../src/firebase-services/exports.js';

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
    console.log (loginEmailPassword)
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  });
});

