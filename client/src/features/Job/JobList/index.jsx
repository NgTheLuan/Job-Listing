import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { AuthContext } from '../../../components/Context/AuthContext';
import axios from 'axios';

function JobList({ job, deleteJob }) {
  const auth = useContext(AuthContext);
  // const state = useContext(GlobalState);
  const [favorite, setFavorite] = useState([]);

  const addFavoriteJob = async (favoritejob) => {
    const check = favorite.every((item) => {
      return item._id !== favoritejob._id;
    });
    if (check) {
      setFavorite([...favorite, { ...favoritejob }]);
      await axios.patch(`/api/users/addfavoritejob/${auth.userId}`, {
        favorite: [...favorite, { ...favoritejob }],
      });
    } else {
      alert('This job you have added to favorites');
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/${auth.userId}`);

        setFavorite(res.data.user.favorite);
        // console.log(favorite);
        // setUsers(res.data);
      } catch (err) {
        // alert(err.response.data.msg);
      }
    };
    getUser();
  }, [auth.userId]);

  if (auth.isAdmin === true && auth.isLoggedIn === true) {
    return (
      <>
        <article>
          <div className="brows-job-list mng-company">
            <div className="col-md-2 col-sm-2 small-padding">
              <div className="brows-job-company-img">
                <Link to={`jobs/detail/${job._id}`}>
                  <img src={job.imgCom} className="img-responsive" alt="" />
                </Link>
              </div>
            </div>
            <div className="col-md-4 col-sm-5">
              <div className="brows-job-position">
                <h3 className="job-position"> {job.position} </h3>
                <p>
                  <span className="brows-job-sallery">
                    <i className="fa fa-money"></i>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(job.salary.from)}
                    &nbsp; - &nbsp;
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(job.salary.to)}
                  </span>
                  <span className="job-type cl-success bg-trans-success">{job.workingTime}</span>
                </p>
                <p>
                  <span style={{ width: '75%', backgroundColor: '#FF7F24', color: '#F0FFFF' }}>
                    Start: {job.startDay.split('T')[0]}
                  </span>
                </p>
              </div>
            </div>
            <div className="col-md-5 col-sm-3">
              <div className="brows-job-location">
                <p>
                  <i className="fa fa-map-marker"></i>
                  {job.location.street}
                </p>
                <p>
                  district {job.location.district}, {job.location.city}
                </p>
              </div>
            </div>
            <div className="col-md-1 col-sm-2">
              <div className="mng-company-action" style={{ marginTop: '50%' }}>
                <Link className="btn_edit" to={`edit-job/${job._id}`}>
                  <i className="fa fa-edit"></i>
                </Link>
                &nbsp;
                <Link
                  className="btn_del"
                  onClick={() => {
                    if (window.confirm('Are you sure to delete this job?')) deleteJob(job._id);
                  }}
                >
                  <i className="fa fa-trash-o"></i>
                </Link>
              </div>
            </div>
          </div>
          <span className="tg-themetag tg-featuretag">{job.nameCom}</span>
        </article>
      </>
    );
  }
  if (auth.isLoggedIn === true) {
    return (
      <>
        <article>
          <div className="brows-job-list mng-company">
            <div className="col-md-2 col-sm-2 small-padding">
              <div className="brows-job-company-img">
                <Link to={`jobs/detail/${job._id}`}>
                  <img src={job.imgCom} className="img-responsive" alt="" />
                </Link>
              </div>
            </div>
            <div className="col-md-4 col-sm-5">
              <div className="brows-job-position">
                <h3 className="job-position"> {job.position} </h3>
                <p>
                  <span className="brows-job-sallery">
                    <i className="fa fa-money"></i>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(job.salary.from)}
                    &nbsp; - &nbsp;
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(job.salary.to)}
                  </span>
                  <span className="job-type cl-success bg-trans-success">{job.workingTime}</span>
                </p>
                <p>
                  <span style={{ width: '75%', backgroundColor: '#FF7F24', color: '#F0FFFF' }}>
                    Start: {job.startDay.split('T')[0]}
                  </span>
                </p>
              </div>
            </div>
            <div className="col-md-5 col-sm-3">
              <div className="brows-job-location">
                <p>
                  <i className="fa fa-map-marker"></i>
                  {job.location.street}
                </p>
                <p>
                  district {job.location.district}, {job.location.city}
                </p>
              </div>
            </div>
            <div className="col-md-1 col-sm-2">
              <div className="brows-job-link" style={{ paddingTop: '5%' }}>
                {/* <Link className="btn_view" to={`jobs/detail/${job._id}`}>
                  <i className="fas fa-eye" style={{ color: '#3366CC' }}></i>
                </Link> */}
                <Link to="#" className="btn_view" title="" onClick={() => addFavoriteJob(job)}>
                  <i className="fas fa-heart" style={{ color: '#E33539' }}></i>
                </Link>
              </div>
            </div>
          </div>
          <span className="tg-themetag tg-featuretag">{job.nameCom}</span>
        </article>
      </>
    );
  } else
    return (
      <>
        <article>
          <div className="brows-job-list mng-company">
            <div className="col-md-2 col-sm-2 small-padding">
              <div className="brows-job-company-img">
                <Link to={`jobs/detail/${job._id}`}>
                  <img src={job.imgCom} className="img-responsive" alt="" />
                </Link>
              </div>
            </div>
            <div className="col-md-4 col-sm-5">
              <div className="brows-job-position">
                <h3 className="job-position">{job.position}</h3>
                <p>
                  <span className="brows-job-sallery">
                    <i className="fa fa-money"></i>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(job.salary.from)}
                    &nbsp; - &nbsp;
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(job.salary.to)}
                  </span>
                  <span className="job-type cl-success bg-trans-success">{job.workingTime}</span>
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-3">
              <div className="brows-job-location">
                <p>
                  <i className="fa fa-map-marker"></i>
                  {job.location.street}
                </p>
                <p>
                  {job.location.district}, {job.location.city}
                </p>
              </div>
            </div>
            <div className="col-md-2 col-sm-2">
              <div className="brows-job-link">
                {/* <Link className="btn_view" to={`jobs/detail/${job._id}`}>
                  <i className="fas fa-eye" style={{ color: '#3366CC' }}></i>
                </Link> */}
              </div>
              <span style={{ float: 'right', width: '75%', backgroundColor: '#FF7F24', color: '#F0FFFF' }}>
                Start: {job.startDay.split('T')[0]}
              </span>
            </div>
          </div>

          <span className="tg-themetag tg-featuretag">{job.nameCom}</span>
        </article>
      </>
    );
}

export default JobList;
