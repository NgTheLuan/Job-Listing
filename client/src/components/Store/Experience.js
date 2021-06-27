import { createStore, createHook } from 'react-sweet-state';
import axios from 'axios';

const Store = createStore({
  initialState: {
    expDescription: '',
  },

  actions: {
    stepExperience:
      (data) =>
      async ({ setState, getState }) => {
        setState({
          expDescription: data.expDescription,
        });
        await axios.patch(`https://joblisting-web.herokuapp.com/api/cvs/updateExperience/${data.experienceId}`, data);
      },
  },
});

export const useExperience = createHook(Store);
