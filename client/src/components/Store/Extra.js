import { createStore, createHook } from 'react-sweet-state';
import axios from 'axios';

const Store = createStore({
  initialState: {
    addInfor: '',
  },

  actions: {
    stepExtra:
      (data) =>
      async ({ setState, getState }) => {
        setState({
          addInfor: data.addInfor,
        });
        await axios.patch(`https://joblisting-web.herokuapp.com/api/cvs/updateExtra/${data.extraId}`, data);
      },
  },
});

export const useExtra = createHook(Store);
