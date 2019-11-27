import { takeLatest, all, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';

import api from '~/services/api';

import { updateProfileSucess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = { name, email, ...(rest.oldPassword ? rest : {}) };

    const response = yield call(api.put, 'users', profile);

    toast.success('Usuário atualizado com sucesso!');

    yield put(updateProfileSucess(response.data));

    history.push('/dashboard');
  } catch (err) {
    toast.error('Erro na requisição, verifique os seus dados!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
