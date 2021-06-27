import { createStore, createHook } from 'react-sweet-state';
import axios from 'axios';

const Store = createStore({
  initialState: {
    project: '',
  },

  actions: {
    stepProject:
      (data) =>
      async ({ setState, getState }) => {
        setState({
          project: data.project,
        });
        await axios.patch(`https://joblisting-web.herokuapp.com/api/cvs/updateProject/${data.projectId}`, data);
      },
  },
});

export const useProject = createHook(Store);
