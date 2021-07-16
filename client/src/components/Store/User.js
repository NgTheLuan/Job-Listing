import { createStore, createHook } from 'react-sweet-state';

const Store = createStore({
  initialState: {
    userId: '',
  },
  actions: {
    saveUserId:
      (id) =>
        ({ setState, getState }) => {
          setState({
            userId: id,
          });
        },
  }
});

export const useCV = createHook(Store);
