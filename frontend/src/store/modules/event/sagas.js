import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { utcToZonedTime } from 'date-fns-tz';
import { setMinutes, format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import api from '~/services/api';
import history from '~/services/history';

import {
  addMeetupSucess,
  updateMeetupSucess,
  meetupFailure,
} from '~/store/modules/event/actions';

export function* addMeetup({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.get, 'organizing');

    const checkData = response.data.find(m => m.id === id);

    const { date, description, location, file_id, title, image } = checkData;

    const dateFormatted = format(parseISO(date), "yyyy-MM-dd'T'HH:mm:ss", {
      locale: pt,
    });

    const data = {
      id,
      date: dateFormatted,
      description,
      location,
      file_id,
      title,
      image,
    };

    yield put(addMeetupSucess(data));
  } catch (error) {
    yield put(meetupFailure());
  }
}

export function* deleteMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `meetups/${id}`);

    toast.success('O evento foi cancelado com sucesso!');

    history.push('/dashboard');
  } catch (error) {
    toast.error('O usuário não pode excluir eventos antigos');

    history.push('/dashboard');
  }
}

export function* updateMeetup({ payload }) {
  try {
    const { date } = payload.data;
    const { id } = payload;

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const checkDate = setMinutes(date, 0);

    const dateFormatted = utcToZonedTime(checkDate, timezone);

    const meetup = { ...payload.data, date: dateFormatted };

    const response = yield call(api.put, `meetups/${id}`, meetup);

    yield put(updateMeetupSucess(response.data));

    toast.success('O evento foi alterado com sucesso!');

    history.push('/dashboard');
  } catch (error) {
    yield put(meetupFailure());
  }
}

export function* newMeetup({ payload }) {
  try {
    yield call(api.post, 'meetups', payload.data);

    toast.success('Evento criado com sucesso!');
    history.push('/dashboard');
  } catch (error) {
    toast.error('Erro na requisição, verifique os seus dados');
    yield put(meetupFailure());
  }
}

export default all([
  takeLatest('@event/ADD_MEETUP_REQUEST', addMeetup),
  takeLatest('@event/DELETE_MEETUP', deleteMeetup),
  takeLatest('@event/UPDATE_MEETUP_REQUEST', updateMeetup),
  takeLatest('@event/NEW_MEETUP', newMeetup),
]);
