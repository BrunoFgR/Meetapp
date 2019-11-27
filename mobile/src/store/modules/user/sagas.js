import { takeLatest, all, call, put, delay } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { updateProfileSucess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = { name, email, ...(rest.oldPassword ? rest : {}) };

    const response = yield call(api.put, 'users', profile);

    yield delay(1000);

    Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');

    yield put(updateProfileSucess(response.data));

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização do perfil, verifique os seus dados!'
    );
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
