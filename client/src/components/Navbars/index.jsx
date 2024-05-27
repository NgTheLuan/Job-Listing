import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
import { useCV } from '../Store/CV';
// import { GlobalState } from '../../GlobalState';

const Navbars = () => {
  const [actions] = useCV();
  const auth = useContext(AuthContext);

  // const state1 = useContext(GlobalState);
  // const [favorite] = state1.userAPI.favorite;

  const createCV = async () => {
    const cv = await axios.post(`http://localhost:5000/api/cvs/createCV/${auth.userId}`); //create empty CV
    actions.saveCvId(cv.data.cv._id);
  };

  return (
    <>
      <nav className="navbar navbar-default navbar-fixed navbar-light white bootsnav">
        <div className="container">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
            <i className="fa fa-bars"></i>
          </button>
          <div className="navbar-header">
            <NavLink className="navbar-brand" to="/">
              <img src={'../../assets/img/Job-Listing.png'} className="logo logo-scrolled" alt="" />
            </NavLink>
          </div>

          <div className="collapse navbar-collapse" id="navbar-menu">
            <ul className="nav navbar-nav navbar-left" data-in="fadeInDown" data-out="fadeOutUp">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <NavLink to="/jobs">Find Job</NavLink>
              </li>

              {auth.isLoggedIn && !auth.isAdmin && !auth.isEmployer && (
                <li className="btn-group" onClick={createCV}>
                  <NavLink to="/createcv">Create CV</NavLink>
                </li>
              )}

              {auth.isLoggedIn && !auth.isAdmin && !auth.isEmployer && (
                <>
                  <li className="btn-group">
                    <NavLink to="/managecv">Manage CV</NavLink>
                  </li>
                  <li className="btn-group">
                    <NavLink to="/favorite">Favorite</NavLink>
                  </li>
                </>
              )}

              {auth.isLoggedIn && auth.isAdmin && (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <li>
                    <NavLink className="dropdown-item" to="/manage-category" style={{ color: '#000000' }}>
                      Category
                    </NavLink>
                  </li>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href='#1'
                    >
                      Job
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                      <NavLink className="dropdown-item" to="/create-job" style={{ color: '#000000' }}>
                        Create Job
                      </NavLink>
                      <NavLink className="dropdown-item" to="/jobs" style={{ color: '#000000' }}>
                        Manage Job
                      </NavLink>
                    </div>
                  </li>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href='#1'
                    >
                      User
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                      <NavLink className="dropdown-item" to="/subjectB" style={{ color: '#000000' }}>
                        Manage User
                      </NavLink>
                    </div>
                  </li>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href='#1'
                    >
                      CV
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                      <NavLink className="dropdown-item" to="/create-cv" style={{ color: '#000000' }}>
                        Create CV
                      </NavLink>
                      <NavLink className="dropdown-item" to="/subjectB" style={{ color: '#000000' }}>
                        Manage CV
                      </NavLink>
                    </div>
                  </li>
                </>
              )}
            </ul>

            <ul className="nav navbar-nav navbar-right" data-in="fadeInDown" data-out="fadeOutUp">
              {auth.isLoggedIn && (
                <li>
                  <a className="signin" href='#1' onClick={auth.logout} style={{ cursor: 'pointer' }}>
                    <i className="fa fa-sign-in" aria-hidden="true"></i>Log out
                  </a>
                </li>
              )}
              {!auth.isLoggedIn && (
                <li>
                  <NavLink to="/login" className="signin">
                    Log In Now
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="clearfix"></div>
    </>
  );
};

export default Navbars;
