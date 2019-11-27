import produce from 'immer';

const INITIAL_STATE = {
  meetup: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@event/ADD_MEETUP_SUCESS': {
        draft.meetup = action.payload.meetup;
        break;
      }
      case '@event/REFRESH_MEETUP': {
        draft.meetup = null;
        break;
      }
      case '@event/DELETE_MEETUP': {
        draft.meetup = null;
        break;
      }
      case '@event/UPDATE_MEETUP_SUCESS': {
        draft.meetup = action.payload.meetup;
        break;
      }
      default:
    }
  });
}
