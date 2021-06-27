import React, { useCallback, useState } from 'react';
import './App.css';
import { DataProvider } from './GlobalState';

import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
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
  const [isEmployer, setIsEmployer] = useState(false);
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
  }, []);

  let routes;

  if (isAdmin && isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/manage-category" component={ManageCategory} exact />
        <Route path="/create-job" component={AddJob} exact />
        <Route path="/edit-job/:id" component={AddJob} exact />
        <Route path="/jobs" component={Jobs} exact />
        <Route path="/detail/:id" component={DetailPage} exact />
        <Route path="/jobs/detail/:id" component={DetailPage} exact />
        <Redirect to="/" />
      </Switch>
    );
  } else if (isLoggedIn && isEmployer === true) {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact />
        <Redirect to="/" />
      </Switch>
    );
  } else if (isLoggedIn && isAdmin === false && isEmployer === false) {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/jobs" component={Jobs} exact />
        <Route path="/createcv" component={CvRouter} exact />
        <Route path="/createcv-profile" component={CvRouter} exact />
        <Route path="/createcv-education" component={CvRouter} exact />
        <Route path="/createcv-project" component={CvRouter} exact />
        <Route path="/createcv-experience" component={CvRouter} exact />
        <Route path="/createcv-extras" component={CvRouter} exact />
        <Route path="/createcv-review" component={CvRouter} exact />
        <Route path="/managecv" component={CvList} exact />
        <Route path="/cvs/updatecv/:cvId" component={CvUpdate} exact />
        <Route path="/cvs/details/:cvId" component={CvsDetails} exact />
        <Route path="/detail/:id" component={DetailPage} exact />
        <Route path="/jobs/detail/:id" component={DetailPage} exact />
        <Route path="/favorite" component={FavoritesJob} exact />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/jobs" component={Jobs} exact />
        <Route path="/detail/:id" component={DetailPage} exact />
        <Route path="/jobs/detail/:id" component={DetailPage} exact />
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
        <Route component={Error} />
        <Redirect to="/" />
      </Switch>
    );
  }

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
            <main>{routes}</main>
          </AuthContext.Provider>
        </Auxx>
      </BrowserRouter>
    </DataProvider>
  );
};

export default App;
