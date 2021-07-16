import { createStore, createHook } from 'react-sweet-state';
import axios from 'axios';

const Store = createStore({
  initialState: {
    project: '',
  },

  actions: {
    stepProject: (data) => async ({ setState, getState }) => {
      setState({
        project: data.project,
      })
      await axios.patch(`http://localhost:5000/api/cvs/updateProject/${data.projectId}`, data);
    },
  },
});

export const useProject = createHook(Store);