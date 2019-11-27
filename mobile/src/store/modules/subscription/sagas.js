import { call, all, put, takeLatest, delay } from 'redux-saga/effects';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Alert } from 'react-native';

import api from '~/services/api';
import {
  addSubscriptionSucess,
  subscriptionFailure,
  removeSubscriptionSucess,
} from './actions';

export function* addSubscription({ payload }) {
  try {
    const { id } = payload;

    const response = yield call(api.post, `meetups/${id}/subscriptions`);

    const {
      title,
      location,
      date,
      description,
      image,
      user,
    } = response.data.meetup;

    const dateFormated = format(parseISO(date), "dd 'de' MMMM', às' HH'h'", {
      locale: pt,
    });

    yield delay(1000);

    const data = {
      id,
      title,
      location,
      date: dateFormated,
      description,
      image,
      user,
    };

    Alert.alert('Sucesso!', 'Inscrição criada com sucesso!');

    yield put(addSubscriptionSucess(data));
  } catch (error) {
    if (error.response) {
      switch (error.response.data.error) {
        case "Can't subscribe to two meetups at the same time": {
          Alert.alert(
            'Erro na inscrição',
            'O usuário não pode se inscrever em dois meetups no mesmo horário'
          );
          yield put(subscriptionFailure());
          break;
        }
        case "Can't subscribe to you own meetups": {
          Alert.alert(
            'Erro na inscrição',
            'O usuário não pode se inscrever em um meetup em que é dono'
          );
          yield put(subscriptionFailure());
          break;
        }
        case "Can't subscribe to past meetups": {
          Alert.alert(
            'Erro na inscrição',
            'O usuário não pode se inscrever em meetups passadas'
          );
          yield put(subscriptionFailure());
          break;
        }
        default:
      }
    }
  }
}

export function* removeSubscription({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `subscriptions/${id}`);

    yield delay(1000);

    Alert.alert('Sucesso!', 'Inscrição cancelada com sucesso!');

    yield put(removeSubscriptionSucess(id));
  } catch (error) {
    if (error.response) {
      switch (error.response.data.error) {
        case 'Meetup not found': {
          Alert.alert('Erro no cancelamento', 'O meetup não foi encontrado!');
          break;
        }
        case 'User cannot delete past meetups': {
          Alert.alert(
            'Erro no cancelamento',
            'O usuário não pode cancelar inscrições que ja aconteceram'
          );
          break;
        }
        default:
      }
      yield put(subscriptionFailure());
    }
  }
}

export function* loadMeetup({ payload }) {
  try {
    if (!payload) return;

    const response = yield call(api.get, 'subscriptions');

    const data = response.data.map(m => ({
      id: m.meetup.id,
      title: m.meetup.title,
      location: m.meetup.location,
      date: format(parseISO(m.meetup.date), "dd 'de' MMMM', às' HH'h'", {
        locale: pt,
      }),
      description: m.meetup.description,
      image: m.meetup.image,
      user: m.meetup.user,
    }));

    yield put(addSubscriptionSucess(data));
  } catch (error) {
    yield put(subscriptionFailure());
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_SUCESS', loadMeetup),
  takeLatest('@subscription/ADD_SUBSCRIPTION_REQUEST', addSubscription),
  takeLatest('@subscription/REMOVE_SUBSCRIPTION_REQUEST', removeSubscription),
]);
