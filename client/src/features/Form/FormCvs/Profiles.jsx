import React, { useEffect } from 'react';
import { useCV } from '../../../components/Store/CV';
import { useProfile } from '../../../components/Store/Profile';
import { useFormik } from 'formik';
import axios from 'axios';

const Profiles = (props) => {
  const [cvState, cvActions] = useCV();
  const [formState, formActions] = useProfile();
  const formik = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      address: '',
      dob: '',
    },

    onSubmit: async (values) => {
      const data = {
        firstname: values.firstname,
        lastname: values.lastname,
        dob: values.dob,
        email: values.email,
        address: values.address,
        phone: values.phone,
        cvId: cvState.cvId,
        profileId: cvState.profileId,
      };
      await formActions.stepProfile(data)
      props.navigate.push('/createcv-education');
    },
  });

  useEffect(() => {
    if (!cvState.profileId) {
      const fetchProfile = async () => {
        const profile = await axios.post(`http://localhost:5000/api/cvs/createProfile/${cvState.cvId}`);
        cvActions.saveProfileId(profile.data.cv._id);
      }
      fetchProfile();
    } else {
      return () => formik.handleSubmit;
    }
  }, [cvState.cvId, cvState.profileId, cvActions, formik.handleSubmit]);

  const previous = () => {
    props.navigate.push('/createcv');
  };

  return (
    <>
      <section className="full-detail">
        <form onSubmit={formik.handleSubmit}>
          <div className="container">
            <div className="row bottom-mrg extra-mrg">
              <h2 className="detail-title">Personal Information</h2>

              <div className="col-md-6 col-sm-6">
                <label>First Name</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Example: Bart"
                    required
                    name="firstname"
                    defaultValue={formState.firstname}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              {/* Rest of the form inputs */}

            </div>

            <div className="detail pannel-footer">
              <div className="col-md-12 col-sm-12">
                <div className="detail-pannel-footer-btn pull-left">
                  <button
                    className="footer-btn choose-cover"
                    onClick={previous}
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
                    Save and continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Profiles;