import produce from 'immer';

const INITIAL_DATA = {
  meetup: [],
  loading: false,
};

export default function subscription(state = INITIAL_DATA, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@subscription/ADD_SUBSCRIPTION_SUCESS': {
        if (Array.isArray(action.payload.data)) {
          action.payload.data.map(m => draft.meetup.push(m));
        } else {
          draft.meetup.push(action.payload.data);
          draft.loading = false;
        }

        break;
      }
      case '@subscription/REMOVE_SUBSCRIPTION_SUCESS': {
        const meetupIndex = draft.meetup.findIndex(
          m => m.id === action.payload.id
        );

        draft.meetup.splice(meetupIndex, 1);
        break;
      }
      case '@subscription/ADD_SUBSCRIPTION_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@subscription/SUBSCRIPTION_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.meetup = [];
        break;
      }
      default:
    }
  });
}
