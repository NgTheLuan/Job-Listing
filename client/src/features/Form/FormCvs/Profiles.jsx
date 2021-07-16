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
      props.history.push('/createcv-education');
    },
  });

  useEffect(() => {
    if (!cvState.profileId) {
      const fetch = async () => {
        const profile = await axios.post(`http://localhost:5000/api/cvs/createProfile/${cvState.cvId}`); //create empty CV
        cvActions.saveProfileId(profile.data.cv._id);
      }
      fetch();
    } else {
      return () => formik.handleSubmit;
    }
  }, [cvState.cvId])

  const previous = () => {
    props.history.push('/createcv');
  };

  return (
    <>
      <section class="full-detail">
        <form onSubmit={formik.handleSubmit}>
          <div class="container">
            <div class="row bottom-mrg extra-mrg">
              <h2 class="detail-title">Personal Information</h2>

              <div class="col-md-6 col-sm-6">
                <label>First Name</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Example: Bart"
                    required
                    name="firstname"
                    defaultValue={formState.firstname}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div class="col-md-6 col-sm-6">
                <label>Last Name</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Example: Simpson"
                    required
                    name="lastname"
                    defaultValue={formState.lastname}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div class="col-md-4 col-sm-6">
                <label>Email</label>
                <div class="input-group">
                  <input
                    type="email"
                    class="form-control"
                    placeholder="Example: bartsimpson@gmail.com"
                    required
                    name="email"
                    defaultValue={formState.email}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div class="col-md-4 col-sm-6">
                <label>Phone Number</label>
                <div class="input-group">
                  <input
                    type="phone"
                    class="form-control"
                    placeholder="Example: 0xx-xxx-xxxx"
                    required
                    name="phone"
                    defaultValue={formState.phone}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div class="col-md-4 col-sm-6">
                <label>Date of Birth</label>
                <div class="input-group">
                  <input
                    type="date"
                    class="form-control"
                    placeholder="Birthday"
                    required
                    name="dob"
                    defaultValue={formState.dob}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div class="col-md-12 col-sm-12">
                <label>Address</label>
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    required
                    placeholder="Example: ward - district - city"
                    name="address"
                    defaultValue={formState.address}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
            </div>

            <div class="detail pannel-footer">
              <div class="col-md-12 col-sm-12">
                <div class="detail-pannel-footer-btn pull-left">
                  <button
                    class="footer-btn choose-cover"
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

                <div class="detail-pannel-footer-btn pull-right">
                  <button
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