import { persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'MeetApp',
      storage: AsyncStorage,
      whitelist: ['auth', 'user', 'subscription'],
    },
    reducers
  );

  return persistedReducer;
};
