import React from 'react';
import { useCV } from '../../../components/Store/CV';
import { useProfile } from '../../../components/Store/Profile';
import { useEducation } from '../../../components/Store/Education';
import { useProject } from '../../../components/Store/Project';
import { useExperience } from '../../../components/Store/Experience';
import { useExtra } from '../../../components/Store/Extra';
import { useHistory } from 'react-router';
import HTMLReactParser from 'html-react-parser';
import Swal from "sweetalert2";

const Review = (props) => {
  const [cvState] = useCV();
  const [profileState] = useProfile();
  const [eduState] = useEducation();
  const [projectState] = useProject();
  const [expState] = useExperience();
  const [extraState] = useExtra();
  const history = useHistory();

  const finish = () => {
    history.push('/managecv')
    Swal.fire('Awesome!', "You're successfully created cv!", 'success')
  };

  const previous = () => {
    props.history.push('/createcv-extras');
  };

  return (
    <>
      <section class="full-detail">
        <div class="container">
          <div class="row bottom-mrg extra-mrg">
            <h2 class="detail-title">Overview</h2>
            <div class="col-md-12 col-sm-12">
              <label>Position</label>
              <p>{cvState.position}</p>
            </div>

            <div class="col-md-12 col-sm-12">
              <label>Bio</label>
              <p>{cvState.bio}</p>
            </div>

          </div>

          <div class="row bottom-mrg extra-mrg">
            <h2 class="detail-title">Personal Details</h2>
            <div class="col-md-4 col-sm-12">
              <label>First Name</label>
              <p>{profileState.firstname}</p>
            </div>

            <div class="col-md-4 col-sm-12">
              <label>Last Name</label>
              <p>{profileState.lastname}</p>
            </div>

            <div class="col-md-4 col-sm-12">
              <label>Email</label>
              <p>{profileState.email}</p>
            </div>

            <div class="col-md-4 col-sm-12">
              <label>Date of Birth</label>
              <p>{profileState.dob}</p>
            </div>

            <div class="col-md-4 col-sm-12">
              <label>Phone Number</label>
              <p>{profileState.phone}</p>
            </div>

            <div class="col-md-4 col-sm-12">
              <label>Address</label>
              <p>{profileState.address}</p>
            </div>
          </div>

          <div class="row bottom-mrg extra-mrg">
            <h2 class="detail-title">Education Details</h2>
            <div class="col-md-12 col-sm-12">
              <p>{HTMLReactParser(eduState.education)}</p>
            </div>
          </div>

          <div class="row bottom-mrg extra-mrg">
            <h2 class="detail-title">Project Details</h2>
            <div class="col-md-12 col-sm-12">
              <p>{HTMLReactParser(projectState.project)}</p>
            </div>
          </div>

          <div class="row bottom-mrg extra-mrg">
            <h2 class="detail-title">Experience Details</h2>
            <div class="col-md-12 col-sm-12">
              <p>{HTMLReactParser(expState.expDescription)}</p>
            </div>
          </div>

          <div class="row bottom-mrg extra-mrg">
            <h2 class="detail-title">Extra Details</h2>
            <div class="col-md-12 col-sm-12">
              <p>{HTMLReactParser(extraState.addInfor)}</p>
            </div>
          </div>
          <div class="detail pannel-footer">
            <div class="col-md-12 col-sm-12">
              <div class="detail-pannel-footer-btn pull-left">
                <button
                  onClick={previous}
                  class="footer-btn choose-cover"
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

              <div class="detail-pannel-footer-btn pull-right">
                <button
                  class="footer-btn choose-cover"
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
