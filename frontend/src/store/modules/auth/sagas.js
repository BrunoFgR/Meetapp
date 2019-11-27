import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { signInSucess, signFailure } from './actions';

import api from '~/services/api';
import history from '~/services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSucess(user, token));

    history.push('/dashboard');
  } catch (error) {
    toast.error('Falha na autentificação, verifique seus dados');
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    toast.success('Usuário cadastrado com sucesso!');

    history.push('/');
  } catch (error) {
    toast.error('Falha na autentificação, verifique os seus dados');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
