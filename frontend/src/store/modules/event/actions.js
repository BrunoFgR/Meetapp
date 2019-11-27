export function addMeetupRequest(id) {
  return {
    type: '@event/ADD_MEETUP_REQUEST',
    payload: {
      id,
    },
  };
}

export function addMeetupSucess(meetup) {
  return {
    type: '@event/ADD_MEETUP_SUCESS',
    payload: {
      meetup,
    },
  };
}

export function newMeetup(data) {
  return {
    type: '@event/NEW_MEETUP',
    payload: {
      data,
    },
  };
}

export function deleteMeetup(id) {
  return {
    type: '@event/DELETE_MEETUP',
    payload: {
      id,
    },
  };
}

export function updateMeetupRequest(data, id) {
  return {
    type: '@event/UPDATE_MEETUP_REQUEST',
    payload: { data, id },
  };
}

export function updateMeetupSucess(meetup) {
  return {
    type: '@event/UPDATE_MEETUP_SUCESS',
    payload: { meetup },
  };
}

export function refreshMeetup() {
  return {
    type: '@event/REFRESH_MEETUP',
  };
}

export function meetupFailure() {
  return {
    type: '@event/MEETUP_FAILURE',
  };
}
