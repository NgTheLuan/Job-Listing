import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import LoadMore from '../LoadMore';

function JobHot() {
  const state = useContext(GlobalState);
  const [jobhot] = state.jobAPI.jobhot;
  // console.log(jobhot);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="main-heading">
              <p>Most View Jobs</p>

              <h2>
                Hot & Featured <span>Jobs</span>
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {jobhot.map((job) => {
            return (
              <div key={job._id}>
                <div className="col-md-4 col-sm-4">
                  <div className="popular-jobs-container">
                    <div className="popular-jobs-box">
                      <span className="popular-jobs-status bg-success">Hot</span>
                      <h4 className="flc-rate" style={{ fontWeight: 'bold' }}>
                        ${job.salary.to}
                      </h4>

                      <div className="popular-jobs-box">
                        <div className="popular-jobs-box-detail">
                          <Link className="btn_view1" to={`jobs/detail/${job._id}`}>
                            <img alt="img" src={job.imgCom} style={{ width: '40%' }} />
                          </Link>

                          <h4 style={{ fontWeight: 'bold', color: '#00CC00' }}>{job.nameCom}</h4>
                          <span className="jobhot-position" style={{ textTransform: 'capitalize' }}>
                            {job.position}
                          </span>
                        </div>
                      </div>
                      <div className="popular-jobs-box-extra">
                        <ul>
                          <li>{job.workingTime}</li>
                          <li>{job.siteCom}</li>
                          <li>{job.category}</li>
                          <li className="more-skill bg-primary">+3</li>
                        </ul>

                        <p>
                          <i className="fa fa-map-marker"></i>&nbsp;
                          {job.location.street}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <LoadMore />
      </div>
      <div className="clearfix"></div>
      <br />
      <br />
    </>
  );
}

export default JobHot;
