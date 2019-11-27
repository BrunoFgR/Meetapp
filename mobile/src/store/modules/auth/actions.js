export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: {
      email,
      password,
    },
  };
}

export function signInSucess(user, token) {
  return {
    type: '@auth/SIGN_IN_SUCESS',
    payload: {
      user,
      token,
    },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}

export function signUpRequest(name, email, password) {
  return {
    type: '@auth/SIGN_UP_REQUEST',
    payload: {
      name,
      email,
      password,
    },
  };
}

export function signOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}
