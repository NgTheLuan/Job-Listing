import { createStore, createHook } from 'react-sweet-state';
import axios from 'axios';

const Store = createStore({
  initialState: {
    firstname: '',
    lastname: '',
    dob: '',
    phone: '',
    email: '',
    address: '',
  },

  actions: {
    stepProfile: (data) => async ({ setState, getState }) => {
      setState({
        firstname: data.firstname,
        lastname: data.lastname,
        dob: data.dob,
        phone: data.phone,
        email: data.email,
        address: data.address,
      })
      await axios.patch(`http://localhost:5000/api/cvs/updateProfile/${data.profileId}`, getState());
    },
  },
});

export const useProfile = createHook(Store);