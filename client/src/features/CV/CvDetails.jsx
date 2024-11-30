import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHttpClient } from '../../components/Hooks/Http-hook';
import HtmlReactParse from 'html-react-parser';

const CvDetails = () => {
  const { sendRequest } = useHttpClient();
  const [loadedCvs, setLoadedCvs] = useState();
  const cvId = useParams().cvId;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/cvs/${cvId}`);
        setLoadedCvs(responseData.cv);
        // console(loadedCvs.education);
      } catch (error) {}
    };
    fetchDetails();
  }, [sendRequest, cvId]);

  return (
    <>
      {loadedCvs && (
        <>
          <section className="inner-header-page">
            <div className="container">
              <div className="col-md-8">
                <div className="left-side-container">
                  <div className="header-details">
                    <h4>
                      {loadedCvs.profile[0].lastname} {loadedCvs.profile[0].firstname}
                    </h4>
                    <p>{loadedCvs.position}</p>
                    <ul>
                      <li>
                        <span className="detail-info">Date of Birth: </span>
                        {loadedCvs.profile[0].dob}
                      </li>
                      <li>
                        <span className="detail-info">Email: </span>
                        {loadedCvs.profile[0].email}
                      </li>
                      <li>
                        <span className="detail-info">Phone number: </span>
                        {loadedCvs.profile[0].phone}
                      </li>
                      <br />
                      <li>
                        <span className="detail-info">Address: </span>
                        {loadedCvs.profile[0].address}
                      </li>
                    </ul>
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
                </div>
              </div>

              <div className="col-md-4 bl-1 br-gary">
                <div className="right-side-detail">
                  <img src={loadedCvs.cvImage} className="" alt="" style={{ width: '200px', float: 'right' }} />
                </div>
              </div>
            </div>
          </section>
          <div className="clearfix"></div>
          <section>
            <div className="container">
              <div className="col-md-12 col-sm-12">
                <div className="container-detail-box">
                  <div className="apply-job-header">
                    <h4>
                      {loadedCvs.profile[0].lastname} {loadedCvs.profile[0].firstname}
                    </h4>
                    <a href="company-detail.html" className="cl-success">
                      <span>
                        <i className="fa fa-building"></i>
                        {loadedCvs.position}
                      </span>
                    </a>
                    <span>
                      <i className="fa fa-map-marker"></i>Vienamese
                    </span>
                  </div>

                  <div className="apply-job-detail">
                    <p>{loadedCvs.bio}</p>
                  </div>                 

                  <div className="apply-job-detail">
                    <h2 className="detail-title" style={{ fontWeight: 'bold', color: '#11B719' }}>
                      Education
                    </h2>               
                    <div className="apply-job-detail">
                      <p>{HtmlReactParse(loadedCvs.education[0].education)}</p>
                    </div>
                  </div>

                  <div className="apply-job-detail">
                    <h2 className="detail-title" style={{ fontWeight: 'bold', color: '#11B719' }}>
                      Project
                    </h2>
                    <div className="apply-job-detail">
                      <p>{HtmlReactParse(loadedCvs.project[0].project)}</p>
                    </div>
                  </div>

                  <div className="apply-job-detail">
                    <h2 className="detail-title" style={{ fontWeight: 'bold', color: '#11B719' }}>
                      Experience
                    </h2>
                    <div className="apply-job-detail">
                      <p>{HtmlReactParse(loadedCvs.experience[0].expDescription)}</p>
                    </div>
                  </div>

                  <div className="apply-job-detail">
                    <h2 className="detail-title" style={{ fontWeight: 'bold', color: '#11B719' }}>
                      Additional Information
                    </h2>
                    <div className="apply-job-detail">
                      <p>{HtmlReactParse(loadedCvs.extra[0].addInfor)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default CvDetails;
