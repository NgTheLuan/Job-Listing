import axios from 'axios';
import { createStore, createHook } from 'react-sweet-state';

const Store = createStore({
  initialState: {
    cvId: '',

    cvName: '',
    cvImage: '',
    position: '',
    bio: '',

    profileId: '',
    educationId: '',
    projectId: '',
    experienceId: '',
    extraId: '',
  },
  actions: {
    saveCvId:
      (id) =>
        ({ setState, getState }) => {
          setState({
            cvId: id,
          });
        },
    updateCvName: (data) => async ({ setState, getState }) => {
      setState({
        cvName: data.cvName,
        cvImage: data.cvImage,
        position: data.position,
        bio: data.bio,
      })
      await axios.patch(`http://localhost:5000/api/cvs/updateCv/${data.cvId}`, getState());
      console.log(getState());
    },
    saveProfileId:
      (id) =>
        ({ setState, getState }) => {
          setState({
            profileId: id,
          });
        },
    saveEducationId:
      (id) =>
        ({ setState, getState }) => {
          setState({
            educationId: id,
          });
        },
    saveProjectId:
      (id) =>
        ({ setState, getState }) => {
          setState({
            projectId: id,
          });
        },
    saveExperienceId:
      (id) =>
        ({ setState, getState }) => {
          setState({
            experienceId: id,
          });
        },
    saveExtraId:
      (id) =>
        ({ setState, getState }) => {
          setState({
            extraId: id,
          });
        },
  }
});

export const useCV = createHook(Store);