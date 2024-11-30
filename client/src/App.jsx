import React, { useCallback, useState } from 'react';
import './App.css';
import { DataProvider } from './GlobalState';

import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { AuthContext } from './components/Context/AuthContext';
import Auxx from './components/Context/Auxx';

import Home from './pages/Home';
import Error from './pages/Error';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './features/Job';
import DetailPage from './features/Job/JobDetails';
import ManageCategory from './pages/ManageCategory';
import AddJob from './pages/Job/AddJob';
import CvRouter from './pages/CV/CvRouter';
import FavoritesJob from './pages/Job/FavoritesJob';
import CvsDetails from './pages/CV/CvsDetails';
import CvUpdate from './pages/CV/CvUpdate';
import CvList from './pages/CV/CVList';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [setIsEmployer] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    setIsLoggedIn(true);
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId(null);
  }, []);

  const author = useCallback((role) => {
    if (role === 'admin') {
      setIsAdmin(true);
    } else if (role === 'employer') {
      setIsEmployer(true);
    } else {
      setIsAdmin(false);
      setIsEmployer(false);
    }
  }, [setIsEmployer]);

  return (
    <DataProvider>
      <BrowserRouter>
        <Auxx>
          <AuthContext.Provider
            value={{
              authorization: author,
              isLoggedIn: isLoggedIn,
              isAdmin: isAdmin,
              userId: userId,
              login: login,
              logout: logout,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/detail/:id" element={<DetailPage />} />
              <Route path="/jobs/detail/:id" element={<DetailPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/manage-category" element={<ManageCategory />} />
              <Route path="/create-job" element={<AddJob />} />
              <Route path="/edit-job/:id" element={<AddJob />} />
              <Route path="/createcv" element={<CvRouter />} />
              <Route path="/createcv-profile" element={<CvRouter />} />
              <Route path="/createcv-education" element={<CvRouter />} />
              <Route path="/createcv-project" element={<CvRouter />} />
              <Route path="/createcv-experience" element={<CvRouter />} />
              <Route path="/createcv-extras" element={<CvRouter />} />
              <Route path="/createcv-review" element={<CvRouter />} />
              <Route path="/managecv" element={<CvList />} />
              <Route path="/cvs/updatecv/:cvId" element={<CvUpdate />} />
              <Route path="/cvs/details/:cvId" element={<CvsDetails />} />
              <Route path="/favorite" element={<FavoritesJob />} />
              <Route path="*" element={<Error />} />
            </Routes>
          </AuthContext.Provider>
        </Auxx>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;