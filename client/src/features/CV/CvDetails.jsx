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
        console(loadedCvs.education);
      } catch (error) {}
    };
    fetchDetails();
  }, [sendRequest, cvId]);

  return (
    <>
      {loadedCvs && (
        <>
          <section class="inner-header-page">
            <div class="container">
              <div class="col-md-8">
                <div class="left-side-container">
                  <div class="header-details">
                    <h4>
                      {loadedCvs.profile[0].lastname} {loadedCvs.profile[0].firstname}
                    </h4>
                    <p>{loadedCvs.position}</p>
                    <ul>
                      <li>
                        <span class="detail-info">Date of Birth: </span>
                        {loadedCvs.profile[0].dob}
                      </li>
                      <li>
                        <span class="detail-info">Email: </span>
                        {loadedCvs.profile[0].email}
                      </li>
                      <li>
                        <span class="detail-info">Phone number: </span>
                        {loadedCvs.profile[0].phone}
                      </li>
                      <br />
                      <li>
                        <span class="detail-info">Address: </span>
                        {loadedCvs.profile[0].address}
                      </li>
                    </ul>
                    <ul class="detail-footer-social">
                      <li>
                        <a href={'# '} style={{ color: 'white' }}>
                          <i class="fa fa-facebook" style={{ backgroundColor: '#3B5998' }}></i>
                        </a>
                      </li>

                      <li>
                        <a href="# " style={{ color: 'white' }}>
                          <i class="fa fa-google-plus" style={{ backgroundColor: '#DC3545' }}></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" style={{ color: 'white' }}>
                          <i class="fa fa-twitter" style={{ backgroundColor: '#1DA1F2' }}></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" style={{ color: 'white' }}>
                          <i class="fa fa-linkedin" style={{ backgroundColor: '#0088CC' }}></i>
                        </a>
                      </li>
                      <li>
                        <a href="#" style={{ color: 'white' }}>
                          <i class="fa fa-instagram" style={{ backgroundColor: '#E83E8C' }}></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="col-md-4 bl-1 br-gary">
                <div class="right-side-detail">
                  <img src={loadedCvs.cvImage} class="" alt="" style={{ width: '200px', float: 'right' }} />
                </div>
              </div>
            </div>
          </section>
          <div class="clearfix"></div>
          <section>
            <div class="container">
              <div class="col-md-12 col-sm-12">
                <div class="container-detail-box">
                  <div class="apply-job-header">
                    <h4>
                      {loadedCvs.profile[0].lastname} {loadedCvs.profile[0].firstname}
                    </h4>
                    <a href="company-detail.html" class="cl-success">
                      <span>
                        <i class="fa fa-building"></i>
                        {loadedCvs.position}
                      </span>
                    </a>
                    <span>
                      <i class="fa fa-map-marker"></i>Vienamese
                    </span>
                  </div>

                  <div class="apply-job-detail">
                    <p>{loadedCvs.bio}</p>
                  </div>                 

                  <div class="apply-job-detail">
                    <h2 class="detail-title" style={{ fontWeight: 'bold', color: '#11B719' }}>
                      Education
                    </h2>               
                    <div class="apply-job-detail">
                      <p>{HtmlReactParse(loadedCvs.education[0].education)}</p>
                    </div>
                  </div>

                  <div class="apply-job-detail">
                    <h2 class="detail-title" style={{ fontWeight: 'bold', color: '#11B719' }}>
                      Project
                    </h2>
                    <div class="apply-job-detail">
                      <p>{HtmlReactParse(loadedCvs.project[0].project)}</p>
                    </div>
                  </div>

                  <div class="apply-job-detail">
                    <h2 class="detail-title" style={{ fontWeight: 'bold', color: '#11B719' }}>
                      Experience
                    </h2>
                    <div class="apply-job-detail">
                      <p>{HtmlReactParse(loadedCvs.experience[0].expDescription)}</p>
                    </div>
                  </div>

                  <div class="apply-job-detail">
                    <h2 class="detail-title" style={{ fontWeight: 'bold', color: '#11B719' }}>
                      Additional Information
                    </h2>
                    <div class="apply-job-detail">
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
