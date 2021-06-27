import React, { createContext } from 'react';
import JobAPI from './api/JobAPI';
import CategoriesAPI from './api/CategoriesAPI';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const state = {
    jobAPI: JobAPI(),
    categoriesAPI: CategoriesAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
