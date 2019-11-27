import { all, call, put, takeLatest, delay } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { signInSucess, signFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    yield delay(1000);

    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSucess(user, token));

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert(
      'Falha no autentificação',
      'Houve um erro no login, verifique seus dados'
    );
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

    yield delay(1000);

    Alert.alert('Sucesso!', 'Usuário cadastrado com sucesso!');

    // history.push('/');
  } catch (error) {
    Alert.alert(
      'Erro de cadastro',
      'Houve um erro no cadastro, verifique os seus dados'
    );
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

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
