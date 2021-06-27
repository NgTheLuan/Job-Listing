import { createStore, createHook } from 'react-sweet-state';
import axios from 'axios';

const Store = createStore({
  initialState: {
    education: '',
  },

  actions: {
    stepEducation:
      (data) =>
      async ({ setState, getState }) => {
        setState({
          education: data.education,
        });
        await axios.patch(`https://joblisting-web.herokuapp.com/api/cvs/updateEducation/${data.educationId}`, data);
      },
  },
});

export const useEducation = createHook(Store);
