export function addSubscriptionRequest(id) {
  return {
    type: '@subscription/ADD_SUBSCRIPTION_REQUEST',
    payload: {
      id,
    },
  };
}

export function addSubscriptionSucess(data) {
  return {
    type: '@subscription/ADD_SUBSCRIPTION_SUCESS',
    payload: {
      data,
    },
  };
}

export function subscriptionFailure() {
  return {
    type: '@subscription/SUBSCRIPTION_FAILURE',
  };
}

export function removeSubscriptionRequest(id) {
  return {
    type: '@subscription/REMOVE_SUBSCRIPTION_REQUEST',
    payload: {
      id,
    },
  };
}

export function removeSubscriptionSucess(id) {
  return {
    type: '@subscription/REMOVE_SUBSCRIPTION_SUCESS',
    payload: {
      id,
    },
  };
}
