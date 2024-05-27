import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHttpClient } from "../../components/Hooks/Http-hook";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Swal from "sweetalert2";

const UpdateCV = (props) => {
  const { sendRequest } = useHttpClient();
  const [loadedCvs, setLoadedCvs] = useState();
  const cvId = useParams().cvId;
  const [callback, setCallBack] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/cvs/${cvId}`
        );
        setLoadedCvs(responseData.cv);
        setCallBack(!callback);
      } catch (error) { }
    };
    fetchDetails();
  }, [sendRequest, cvId, callback]);

  const cvState = useFormik({
    initialValues: {
      position: '',
      bio: '',
    },

    onSubmit: async (values) => {
      const data = {
        cvName: loadedCvs.cvName,
        cvImage: loadedCvs.cvImage,
        position: values.position,
        bio: values.bio,
      };
      await axios.patch(`http://localhost:5000/api/cvs/updateCv/${cvId}`, data)
      Swal.fire('Awesome!', "You're successfully updated!", 'success')
    },
  });

  const profileState = useFormik({
    initialValues: {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      dob: '',
      address: '',
    },

    onSubmit: async (values) => {
      const data = {
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        phone: values.phone,
        dob: values.dob,
        address: values.address,
      };
      await axios.patch(`http://localhost:5000/api/cvs/updateProfile/${loadedCvs.profile[0]._id}`, data)
      Swal.fire('Awesome!', "You're successfully updated!", 'success')
      setCallBack(!callback);
    },
  });

  const [edu, setEdu] = useState({
    education: '',
  })

  const updateEdu = async (e) => {
    e.preventDefault();
    const data = {
      education: edu.education,
    };
    await axios.patch(`http://localhost:5000/api/cvs/updateEducation/${loadedCvs.education[0]._id}`, data)
    Swal.fire('Awesome!', "You're successfully updated!", 'success')
  }

  const [project, setProject] = useState({
    project: '',
  })

  const updateProject = async (e) => {
    e.preventDefault();
    const data = {
      project: project.project,
    };
    await axios.patch(`http://localhost:5000/api/cvs/updateProject/${loadedCvs.project[0]._id}`, data)
    Swal.fire('Awesome!', "You're successfully updated!", 'success')
  }

  const [exp, setExp] = useState({
    expDescription: '',
  })

  const updateExp = async (e) => {
    e.preventDefault();
    const data = {
      expDescription: exp.expDescription,
    };
    await axios.patch(`http://localhost:5000/api/cvs/updateExperience/${loadedCvs.experience[0]._id}`, data)
    Swal.fire('Awesome!', "You're successfully updated!", 'success')
  }

  const [extra, setExtra] = useState({
    addInfor: '',
  })

  const updateExtra = async (e) => {
    e.preventDefault();
    const data = {
      addInfor: extra.addInfor,
    };
    await axios.patch(`http://localhost:5000/api/cvs/updateExtra/${loadedCvs.extra[0]._id}`, data)
    Swal.fire('Awesome!', "You're successfully updated!", 'success')
  }

  return (
    <>
      {loadedCvs && (
        <>
          <section className="inner-header-page">
            <div className="container">
              <div className="col-md-8">
                <div className="left-side-container">
                  <div className="header-details">
                    <h4>{loadedCvs.profile[0].lastname} {loadedCvs.profile[0].firstname}</h4>
                    <p>{loadedCvs.position}</p>
                    <ul>
                      <li><span className="detail-info">Date of Birth: </span>{loadedCvs.profile[0].dob}</li>
                      <li><span className="detail-info">Email: </span>{loadedCvs.profile[0].email}</li>
                      <li><span className="detail-info">Phone number: </span>{loadedCvs.profile[0].phone}</li><br />
                      <li><span className="detail-info">Address: </span>{loadedCvs.profile[0].address}</li>
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

          <section className="full-detail">
            <div className="container">
              <div className="row bottom-mrg extra-mrg">
                <h2 className="detail-title">Overview</h2>
                <div className="col-md-12 col-sm-12">
                  <div className="input-group">
                    <label>Position: <p>{loadedCvs.position}</p></label><br />
                    <label>Bio: <p>{loadedCvs.bio}</p></label>
                  </div>
                </div>
                <hr />
                <form onSubmit={cvState.handleSubmit}>
                  <div className="col-md-12 col-sm-12">
                    <div className="input-group">
                      <label>Position</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        name="position"
                        placeholder={loadedCvs.position}
                        defaultValue={cvState.position}
                        onChange={cvState.handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 col-sm-12">
                    <div className="input-group">
                      <label>Bio</label>
                      <textarea
                        type="text"
                        className="form-control"
                        required
                        name="bio"
                        placeholder={loadedCvs.bio}
                        defaultValue={cvState.bio}
                        onChange={cvState.handleChange}
                      />
                    </div>
                  </div>

                  <div className="detail pannel-footer">
                    <div className="col-md-12 col-sm-12">
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
                          Update Overview
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="row bottom-mrg extra-mrg">
                <h2 className="detail-title">Personal Details</h2>
                <div className="col-md-4 col-sm-12">
                  <label>Firstname: <a href=" ">{loadedCvs.profile[0].firstname}</a></label>
                </div>
                <div className="col-md-4 col-sm-12">
                  <label>Lastname: <a href=" ">{loadedCvs.profile[0].lastname}</a></label>
                </div>
                <div className="col-md-4 col-sm-12">
                  <div className="input-group">
                    <label>Birthday: <a href=" ">{loadedCvs.profile[0].dob}</a></label>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="input-group">
                    <label>Email: <a href=" ">{loadedCvs.profile[0].email}</a></label>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="input-group">
                    <label>Phone: <a href=" ">{loadedCvs.profile[0].phone}</a></label>
                  </div>
                </div>
                <div className="col-md-12 col-sm-12">
                  <div className="input-group">
                    <label>Address: <a href=" ">{loadedCvs.profile[0].address}</a></label>
                  </div>
                </div>
                <hr />
                <form onSubmit={profileState.handleSubmit}>
                  <div className="col-md-4 col-sm-12">
                    <div className="input-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        name="firstname"
                        data={loadedCvs.profile[0].firstname}
                        defaultValue={profileState.firstname}
                        onChange={profileState.handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 col-sm-12">
                    <div className="input-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        name="lastname"
                        placeholder={loadedCvs.profile[0].lastname}
                        defaultValue={profileState.lastname}
                        onChange={profileState.handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-4 col-sm-12">
                    <div className="input-group">
                      <label>Date of birth</label>
                      <input
                        type="date"
                        className="form-control"
                        required
                        name="dob"
                        placeholder={loadedCvs.profile[0].dob}
                        defaultValue={profileState.dob}
                        onChange={profileState.handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <div className="input-group">
                      <label>Email</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        name="email"
                        placeholder={loadedCvs.profile[0].email}
                        defaultValue={profileState.email}
                        onChange={profileState.handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12">
                    <div className="input-group">
                      <label>Phone</label>
                      <input
                        type="phone"
                        className="form-control"
                        required
                        name="phone"
                        placeholder={loadedCvs.profile[0].phone}
                        defaultValue={profileState.phone}
                        onChange={profileState.handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-12 col-sm-12">
                    <div className="input-group">
                      <label>Address</label>
                      <input
                        type="text"
                        className="form-control"
                        required
                        name="address"
                        placeholder={loadedCvs.profile[0].address}
                        defaultValue={profileState.address}
                        onChange={profileState.handleChange}
                      />
                    </div>
                  </div>

                  <div className="detail pannel-footer">
                    <div className="col-md-12 col-sm-12">
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
                          Update Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="row bottom-mrg extra-mrg">
                <h2 className="detail-title">Education Details</h2>
                <form onSubmit={updateEdu}>
                  <div className="col-md-12 col-sm-12">
                    <CKEditor
                      required
                      id="education"
                      data={loadedCvs.education[0].education}
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        const data = editor.getData();                        
                        setEdu({ ...edu, education: data });
                      }}
                    />
                  </div>

                  <div className="detail pannel-footer">
                    <div className="col-md-12 col-sm-12">
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
                          Update Education
                      </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="row bottom-mrg extra-mrg">
                <h2 className="detail-title">Project Details</h2>
                <form onSubmit={updateProject}>
                  <div className="col-md-12 col-sm-12">
                    <CKEditor
                      required
                      id="project"
                      data={loadedCvs.project[0].project}
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setProject({ ...project, project: data });
                      }}
                    />
                  </div>

                  <div className="detail pannel-footer">
                    <div className="col-md-12 col-sm-12">
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
                          Update Project
                      </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="row bottom-mrg extra-mrg">
                <h2 className="detail-title">Experience Details</h2>
                <form onSubmit={updateExp}>
                  <div className="col-md-12 col-sm-12">
                    <CKEditor
                      required
                      id="expDescription"
                      data={loadedCvs.experience[0].expDescription}
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setExp({ ...exp, expDescription: data });
                      }}
                    />
                  </div>
                  <div className="detail pannel-footer">
                    <div className="col-md-12 col-sm-12">
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
                          Update Experience
                      </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="row bottom-mrg extra-mrg">
                <h2 className="detail-title">Extra Details</h2>
                <form onSubmit={updateExtra}>
                  <div className="col-md-12 col-sm-12">
                    <CKEditor
                      required
                      id="addInfor"
                      data={loadedCvs.extra[0].addInfor}
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setExtra({ ...exp, addInfor: data });
                      }}
                    />
                  </div>
                  <div className="detail pannel-footer">
                    <div className="col-md-12 col-sm-12">
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
                          Update Extras
                      </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="col-md-12 col-sm-12">
                <Link to='/managecv'>
                  <a className="btn btn-success btn-primary small-btn" href=" ">
                    Finish
                  </a>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default UpdateCV;
