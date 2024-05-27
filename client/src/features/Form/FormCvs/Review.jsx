import React from 'react';
import { useCV } from '../../../components/Store/CV';
import { useProfile } from '../../../components/Store/Profile';
import { useEducation } from '../../../components/Store/Education';
import { useProject } from '../../../components/Store/Project';
import { useExperience } from '../../../components/Store/Experience';
import { useExtra } from '../../../components/Store/Extra';
import { useNavigate } from 'react-router-dom' 
import HTMLReactParser from 'html-react-parser';
import Swal from "sweetalert2";

const Review = (props) => {
  const [cvState] = useCV();
  const [profileState] = useProfile();
  const [eduState] = useEducation();
  const [projectState] = useProject();
  const [expState] = useExperience();
  const [extraState] = useExtra();
  const navigate = useNavigate();

  const finish = () => {
    navigate.push('/managecv')
    Swal.fire('Awesome!', "You're successfully created cv!", 'success')
  };

  const previous = () => {
    props.navigate.push('/createcv-extras');
  };

  return (
    <>
      <section className="full-detail">
        <div className="container">
          <div className="row bottom-mrg extra-mrg">
            <h2 className="detail-title">Overview</h2>
            <div className="col-md-12 col-sm-12">
              <label>Position</label>
              <p>{cvState.position}</p>
            </div>

            <div className="col-md-12 col-sm-12">
              <label>Bio</label>
              <p>{cvState.bio}</p>
            </div>

          </div>

          <div className="row bottom-mrg extra-mrg">
            <h2 className="detail-title">Personal Details</h2>
            <div className="col-md-4 col-sm-12">
              <label>First Name</label>
              <p>{profileState.firstname}</p>
            </div>

            <div className="col-md-4 col-sm-12">
              <label>Last Name</label>
              <p>{profileState.lastname}</p>
            </div>

            <div className="col-md-4 col-sm-12">
              <label>Email</label>
              <p>{profileState.email}</p>
            </div>

            <div className="col-md-4 col-sm-12">
              <label>Date of Birth</label>
              <p>{profileState.dob}</p>
            </div>

            <div className="col-md-4 col-sm-12">
              <label>Phone Number</label>
              <p>{profileState.phone}</p>
            </div>

            <div className="col-md-4 col-sm-12">
              <label>Address</label>
              <p>{profileState.address}</p>
            </div>
          </div>

          <div className="row bottom-mrg extra-mrg">
            <h2 className="detail-title">Education Details</h2>
            <div className="col-md-12 col-sm-12">
              <p>{HTMLReactParser(eduState.education)}</p>
            </div>
          </div>

          <div className="row bottom-mrg extra-mrg">
            <h2 className="detail-title">Project Details</h2>
            <div className="col-md-12 col-sm-12">
              <p>{HTMLReactParser(projectState.project)}</p>
            </div>
          </div>

          <div className="row bottom-mrg extra-mrg">
            <h2 className="detail-title">Experience Details</h2>
            <div className="col-md-12 col-sm-12">
              <p>{HTMLReactParser(expState.expDescription)}</p>
            </div>
          </div>

          <div className="row bottom-mrg extra-mrg">
            <h2 className="detail-title">Extra Details</h2>
            <div className="col-md-12 col-sm-12">
              <p>{HTMLReactParser(extraState.addInfor)}</p>
            </div>
          </div>
          <div className="detail pannel-footer">
            <div className="col-md-12 col-sm-12">
              <div className="detail-pannel-footer-btn pull-left">
                <button
                  onClick={previous}
                  className="footer-btn choose-cover"
                  type="submit"
                  style={{
                    backgroundColor: '#3DB810',
                    border: 'none',
                    color: 'white',
                    padding: '15px 22px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                  }}
                >
                  Previous
                </button>
              </div>

              <div className="detail-pannel-footer-btn pull-right">
                <button
                  className="footer-btn choose-cover"
                  onClick={finish}
                  style={{
                    backgroundColor: '#3DB810',
                    border: 'none',
                    color: 'white',
                    padding: '15px 22px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    display: 'inline-block',
                    fontSize: '16px',
                  }}
                >
                  Finish
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Review;
