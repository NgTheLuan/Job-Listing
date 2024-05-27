import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import HtmlReactParse from 'html-react-parser';
import { GlobalState } from '../../../GlobalState';

// import Loading from '../../Loading';

import Navbars from '../../../components/Navbars';
import Footer from '../../../components/Footers';

function DetailPage() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [jobs] = state.jobAPI.jobs;
  const [jobhot] = state.jobAPI.jobhot;
  const [detailJob, setDetailJob] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params) {
      jobs.forEach((job) => {
        if (job._id === params.id) setDetailJob(job);
      });

      jobhot.forEach((job) => {
        if (job._id === params.id) setDetailJob(job);
      });
    }
  }, [jobs, jobhot, params]);
  if (detailJob.length === 0) return null;

  return (
    <div>
      <Navbars />
      <br /> <br />
      <section
        className="inner-header-title"
        style={{
          backgroundImage: `URL(${detailJob.thumbnail})`,
        }}
      >
        <div className="container">
          <h1> </h1>
        </div>
      </section>
      <section className="detail-desc">
        <div className="container white-shadow" style={{ backgroundColor: '#ECECEC' }}>
          <div className="row">
            <div className="detail-pic">
              <img
                src={detailJob.imgCom}
                className="img"
                alt=""
                style={{
                  position: 'absolute',
                  top: '0',
                  left: '0',
                  display: 'block',
                  zIndex: '1',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>

            <div className="detail-status">
              <span style={{ float: 'right', width: '100%', backgroundColor: '#FF7F24', color: '#F0FFFF' }}>
                Start: {detailJob.startDay.split('T')[0]}
              </span>
              <br />
              <br />
              <span style={{ float: 'right', width: '100%', backgroundColor: '#FF3030', color: '#F0FFFF' }}>
                End: {detailJob.endDay.split('T')[0]}
              </span>
            </div>
          </div>

          <div className="row bottom-mrg">
            <div className="col-md-8 col-sm-8">
              <div className="detail-desc-caption">
                <h4 style={{ color: '#33CC33', fontWeight: 'bold' }}>{detailJob.nameCom}</h4>
                <span className="designation">
                  <u>{detailJob.position}</u>
                </span>

                <p style={{ textAlign: 'justify' }}>{detailJob.detail}</p>

                <ul>
                  <li>
                    <i className="fa fa-briefcase"></i>
                    <span>{detailJob.workingTime}</span>
                  </li>
                  <li>
                    <i className="fa fa-flask"></i>
                    <span>{detailJob.experience}</span>
                  </li>
                  <li>
                    <i className="fa fa-money"></i>
                    <span>
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                        detailJob.salary.from
                      )}
                      &nbsp; - &nbsp;
                      {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                        detailJob.salary.to
                      )}
                    </span>
                  </li>
                  <li>
                    <i className="far fa-smile-beam"></i>
                    <span>{detailJob.numofRecruit} People</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-4 col-sm-4">
              <div className="get-touch">
                <h4 style={{ fontWeight: 'bold', color: '#3ce' }}>Get in Touch</h4>
                <ul>
                  <li>
                    <i className="fa fa-map-marker"></i>
                    <span>
                      <i>
                        {detailJob.location.street}, {detailJob.location.district}, {detailJob.location.city}
                      </i>
                    </span>
                  </li>
                  <li>
                    <i className="fa fa-globe"></i>
                    <span>
                      <i>{detailJob.siteCom}</i>
                    </span>
                  </li>
                  <li>
                    <i className="fa fa-envelope"></i>
                    <span>
                      <i>{detailJob.contact.contactEmail}</i>
                    </span>
                  </li>
                  <li>
                    <i className="fa fa-phone"></i>
                    <span>
                      <i>{detailJob.contact.contactPhone}</i>
                    </span>
                  </li>
                  <li>
                    <i className="fa fa-user"></i>
                    <span>
                      <i>{detailJob.contact.contactName}</i>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row no-padd">
            <div className="detail pannel-footer">
              <div className="col-md-5 col-sm-5">
                <ul className="detail-footer-social">
                  <li>
                    <a href={'# '} style={{ color: 'white' }}>
                      <i className="fa fa-facebook" style={{ backgroundColor: '#3B5998' }}></i>
                    </a>
                  </li>

                  <li>
                    <a href="# " style={{ color: 'white' }}>
                      <i className="fa fa-google-plus" style={{ backgroundColor: '#DC3545' }}></i>
                    </a>
                  </li>
                  <li>
                    <a href="# " style={{ color: 'white' }}>
                      <i className="fa fa-twitter" style={{ backgroundColor: '#1DA1F2' }}></i>
                    </a>
                  </li>
                  <li>
                    <a href="# " style={{ color: 'white' }}>
                      <i className="fa fa-linkedin" style={{ backgroundColor: '#0088CC' }}></i>
                    </a>
                  </li>
                  <li>
                    <a href="# " style={{ color: 'white' }}>
                      <i className="fa fa-instagram" style={{ backgroundColor: '#E83E8C' }}></i>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="col-md-7 col-sm-7">
                <div className="detail-pannel-footer-btn pull-right">
                  <a href="# " className="footer-btn grn-btn" title="">
                    Quick Apply
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="full-detail-description full-detail">
        <div className="container">
          <div className="row row-bottom">
            <h2 className="detail-title" style={{ fontWeight: 'bold', color: '#11B719' }}>
              Job Requirements
            </h2>
            <ul className="detail-list">
              <li>{detailJob.requirement}</li>
            </ul>
          </div>

          <div className="row row-bottom">
            <h2 className="detail-title" style={{ fontWeight: 'bold', color: '#11B719' }}>
              Benefit
            </h2>
            <ul className="detail-list">
              <li>{detailJob.benefit}</li>
            </ul>
          </div>

          <div className="row row-bottom">
            <h2 className="detail-title" style={{ fontWeight: 'bold', color: '#11B719' }}>
              Certification
            </h2>
            <ul className="detail-list">
              <li>{detailJob.certification}</li>
            </ul>
          </div>

          <div className="row row-bottom">
            <h2 className="detail-title" style={{ fontWeight: 'bold', color: '#11B719' }}>
              Other Information
            </h2>

            <div style={{ marginTop: '20px', width: '100%' }}>
              <Box p={1} fontSize="120%" color="text.secondary">
                {HtmlReactParse(detailJob.otherInfo)}
              </Box>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default DetailPage;
