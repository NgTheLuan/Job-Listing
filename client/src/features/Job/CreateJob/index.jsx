import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { GlobalState } from '../../../GlobalState';
import Loading from '../../../features/LoadingImg';
import HTMLReactParser from 'html-react-parser';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import axios from 'axios';
import './styles.css';

function CreateJob() {
  const [job, setJob] = useState({
    // jobId: '',
    startDay: '',
    endDay: '',
    position: '',
    salary: {
      from: 0,
      to: 0,
    },
    category: '',
    workingTime: '',
    detail: '',
    requirement: '',
    experience: '',
    certification: '',
    benefit: '',
    numofRecruit: 0,
    nameCom: '',
    siteCom: '',
    thumbnail: '',
    imgCom: '',
    otherInfo: '',
    location: {
      street: '',
      district: '',
      city: '',
    },
    contact: {
      contactName: 'Nguyen The Luan',
      contactEmail: 'nguyenluan.work@gmail.com',
      contactAddress: 'Ho Chi Minh',
      contactPhone: '0909774xxx',
    },
    _id: '',
  });
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [jobs] = state.jobAPI.jobs;
  const [photos, setPhotos] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const param = useParams();
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallBack] = state.jobAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      jobs.forEach((job) => {
        if (job._id === param.id) {
          setJob(job);
          setPhotos(job.imgCom);
        }
      });
    } else {
      //Job detail to Create job
      setOnEdit(false);
      clear();
    }
  }, [param.id, jobs]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];
      // console.log(file);

      if (!file)
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'File not existed!',
        });
      if (file.size > 1024 * 1024)
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Size is too large!',
        });
      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'File format is incorrect!',
        });

      let formData = new FormData();
      formData.append('file', file);

      setLoading(true);
      const res = await axios.post('/api/photo/upload', formData, { url: photos.url });

      console.log(res.data.url);
      setLoading(false);
      setPhotos(res.data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong, please try again.',
      });
    }
  };

  const handleDestroy = async () => {
    try {
      await axios.post('/api/photo/destroy', { public_id: photos.public_id });
      Swal.fire({
        icon: 'success',
        title: 'Good job !',
        text: 'Remove photo successfully',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No image upload!',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!photos)
        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'File not existed!',
        });

      if (onEdit) {
        await axios.put(`/api/jobs/${job._id}`, { ...job }).then((res) => {
          // console.log(res.data);
        });
      } else {
        await axios.post('/api/jobs', { ...job }).then((res) => {
          // console.log(res.data);
        });
      }
      setCallBack(!callback);
      navigate.push('/');
      Swal.fire('Awesome!', 'Job created and wait for admin to approve the post... 🎉🎉', 'success').then((result) => {
        if (result.isConfirmed || result.isDismissed) {
        }
      });

      clear();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong, please try again.',
      });
    }
  };

  const clear = () => {
    setPhotos(false);
    setJob({
      // jobId: '',
      startDay: '',
      endDay: '',
      position: '',
      salary: { to: 0, from: 0 },
      category: '',
      workingTime: '',
      detail: '',
      requirement: '',
      experience: '',
      certification: '',
      benefit: '',
      numofRecruit: 0,
      nameCom: '',
      siteCom: '',
      thumbnail: '',
      otherInfo: '',
      imgCom: '',
      location: {
        street: '',
        district: '',
        city: '',
      },
      contact: {
        contactName: 'Nguyen The Luan',
        contactEmail: 'nguyenluan.work@gmail.com',
        contactAddress: 'Ho Chi Minh',
        contactPhone: '0909774xxx',
      },
    });
  };

  const styleUpload = {
    display: photos ? 'block' : 'none',
  };

  return (
    <>
      <section
        className="inner-header-title blank"
        style={{
          backgroundImage: `URL("https://www.mediafire.com/convkey/94a5/ld2xj8f54j7colg6g.jpg")`,
        }}
      >
        <div className="container">
          <h1>Create Job</h1>
        </div>
      </section>

      <form onSubmit={handleSubmit}>
        <div className="detail-desc section">
          <div className="container white-shadow">
            <div className="row">
              <div className="detail-pic js">
                <div className="box">
                  <input
                    type="file"
                    name="upload-pic[]"
                    // id="upload-pic"
                    className="inputfile"
                    onChange={handleUpload}
                  />
                  {loading ? (
                    <div id="file_img">
                      <Loading />
                    </div>
                  ) : (
                    <>
                      <label htmlFor="upload-pic">
                        <i className="fa fa-upload" aria-hidden="true" style={{ cursor: 'pointer', fontSize: '20px' }}></i>
                      </label>

                      <div style={styleUpload}>
                        <img
                        alt='job Img'
                          src={photos ? photos.url : ''}
                          srcSet={job.imgCom}
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
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="add-feild">
              <div className="row bottom-mrg">
                <div className="col-md-4 col-sm-6">
                  <div className="input-group">
                    <label>Position</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Please input your position"
                      required
                      value={job.position}
                      onChange={(e) => setJob({ ...job, position: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-4 col-sm-6">
                  <div className="input-group">
                    <label>Start Day</label>&nbsp;&nbsp;
                    <Moment format="DD-MM-YYYY">{job.startDay}</Moment>
                    <input
                      id="startDay"
                      type="date"
                      className="form-control"
                      placeholder=""
                      required
                      value={job.startDay}
                      onChange={(e) => setJob({ ...job, startDay: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-4 col-sm-6">
                  <div className="input-group">
                    <label>End Day</label>&nbsp;&nbsp;
                    <Moment format="DD-MM-YYYY">{job.endDay}</Moment>
                    <input
                      id="endDay"
                      type="date"
                      className="form-control"
                      placeholder=""
                      required
                      value={job.endDay}
                      onChange={(e) => setJob({ ...job, endDay: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-4 col-sm-6">
                  <div className="input-group">
                    <label>Category</label>
                    <select
                      className="form-control input-lg"
                      required
                      value={job.category}
                      onChange={(e) => setJob({ ...job, category: e.target.value })}
                    >
                      <option value="">Please select a category</option>
                      {categories.map((category) => (
                        <option value={category.career.careerName} key={category._id}>
                          {category.career.careerName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="col-md-4 col-sm-6">
                  <div className="input-group">
                    <label>Salary From</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      placeholder="Currency unit: $"
                      required
                      value={job.salary.from}
                      onChange={(e) =>
                        setJob((prevJob) => ({
                          ...prevJob,
                          salary: { ...prevJob.salary, from: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="col-md-4 col-sm-6">
                  <div className="input-group">
                    <label>Salary To</label>
                    <input
                      type="number"
                      className="form-control"
                      min="0"
                      placeholder="Currency unit: $"
                      required
                      value={job.salary.to}
                      onChange={(e) =>
                        setJob((prevJob) => ({
                          ...prevJob,
                          salary: { ...prevJob.salary, to: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="col-md-4 col-sm-6">
                  <label>Working Time</label>
                  <div className="input-group">
                    <select
                      className="form-control input-lg"
                      required
                      value={job.workingTime}
                      onChange={(e) => setJob({ ...job, workingTime: e.target.value })}
                    >
                      <option value="">Please select working time</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Freelancer">Freelancer</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                </div>

                <div className="col-md-4 col-sm-6">
                  <div className="input-group">
                    <label>Url Company</label>
                    <input
                      type="url"
                      className="form-control"
                      placeholder="Please input a URL image company"
                      required
                      value={job.imgCom}
                      onChange={(e) => setJob({ ...job, imgCom: e.target.value })}
                    />
                  </div>
                </div>

                <div className="col-md-4 col-sm-6">
                  <div className="input-group">
                    <label>Upload File</label>
                    <input
                      type="file"
                      name="upload-pic[]"
                      id="upload-pic"
                      className="form-control input-lg"
                      style={{
                        // backgroundColor: '#3DB810',
                        // border: 'none',
                        // color: 'white',
                        padding: '15px ',
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        fontSize: '16px',
                      }}
                      onChange={handleUpload}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row no-padd">
              <div className="detail pannel-footer">
                <div className="col-md-12 col-sm-12">
                  <div className="detail-pannel-footer-btn pull-right">
                    <button
                      className="footer-btn choose-cover"
                      onClick={handleDestroy}
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
                      Change Cover Photos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="full-detail">
          <div className="container">
            <div className="row bottom-mrg extra-mrg">
              <h2 className="detail-title">
                <b>Job Information</b>
              </h2>
              <div className="col-md-6 col-sm-12">
                <label>Detail</label>
                <textarea
                  rows="6"
                  className="form-control"
                  placeholder="Keep the content short and easy to understand..."
                  required
                  value={job.detail}
                  onChange={(e) => setJob({ ...job, detail: e.target.value })}
                ></textarea>
              </div>

              <div className="col-md-6 col-sm-12">
                <label>Requirement</label>
                <textarea
                  rows="6"
                  className="form-control textarea"
                  placeholder="Requirement"
                  required
                  value={job.requirement}
                  onChange={(e) => setJob({ ...job, requirement: e.target.value })}
                ></textarea>
              </div>

              <div className="col-md-6 col-sm-12">
                <label>Benefit</label>
                <textarea
                  rows="6"
                  className="form-control textarea"
                  placeholder="About Company"
                  required
                  value={job.benefit}
                  onChange={(e) => setJob({ ...job, benefit: e.target.value })}
                ></textarea>
              </div>

              <div className="col-md-6 col-sm-12">
                <label>Certification</label>
                <textarea
                  rows="6"
                  className="form-control textarea"
                  placeholder="Certification"
                  required
                  value={job.certification}
                  onChange={(e) => setJob({ ...job, certification: e.target.value })}
                ></textarea>
              </div>

              <div className="col-md-6 col-sm-12">
                <label>Experience</label>
                <select
                  className="form-control input-lg"
                  required
                  value={job.experience}
                  onChange={(e) => setJob({ ...job, experience: e.target.value })}
                >
                  <option value="No experience">No experience</option>
                  <option value="Less than 1 year">Less than 1 year</option>
                  <option value="1 year">1 year</option>
                  <option value="2 year">2 year</option>
                  <option value="3 year">3 year</option>
                  <option value="More than 3 years">More than 3 years</option>
                </select>
              </div>
              <div className="col-md-6 col-sm-12">
                <label>Number of Recruit</label>
                <input
                  placeholder="Number of recruit"
                  type="number"
                  min="0"
                  className="form-control"
                  required
                  value={job.numofRecruit}
                  onChange={(e) => setJob({ ...job, numofRecruit: e.target.value })}
                />
              </div>

              <div className="col-md-12 col-sm-12">
                <label>Other Information</label>
                {HTMLReactParser(job.otherInfo)}
                <hr />
                <CKEditor
                  id="otherinfo"
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setJob({ ...job, otherInfo: data });
                  }}
                />
              </div>
            </div>

            <div className="row bottom-mrg extra-mrg">
              <h2 className="detail-title">
                <b>Company Information</b>
              </h2>

              <div className="col-md-4 col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-flag"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Name"
                    required
                    value={job.nameCom}
                    onChange={(e) => setJob({ ...job, nameCom: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-globe"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company Site"
                    required
                    value={job.siteCom}
                    onChange={(e) => setJob({ ...job, siteCom: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fas fa-image"></i>
                  </span>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="Company Thumnail"
                    required
                    value={job.thumbnail}
                    onChange={(e) => setJob({ ...job, thumbnail: e.target.value })}
                  />
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fas fa-road"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Street"
                    required
                    value={job.location.street}
                    onChange={(e) =>
                      setJob((prevJob) => ({
                        ...prevJob,
                        location: { ...prevJob.location, street: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fas fa-street-view"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="District"
                    required
                    value={job.location.district}
                    onChange={(e) =>
                      setJob((prevJob) => ({
                        ...prevJob,
                        location: { ...prevJob.location, district: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="col-md-4 col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fas fa-building"></i>
                  </span>
                  <select
                    className="form-control input-lg"
                    required
                    value={job.location.city}
                    onChange={(e) =>
                      setJob((prevJob) => ({
                        ...prevJob,
                        location: { ...prevJob.location, city: e.target.value },
                      }))
                    }
                  >
                    <option value="">All City</option>
                    <option value="Ho Chi Minh">Ho Chi Minh</option>
                    <option value="Ha Noi">Ha Noi</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row bottom-mrg extra-mrg">
              <h2 className="detail-title">
                <b>Contact Information</b>
              </h2>
              <div className="col-md-6 col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fa fa-facebook"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact Name"
                    required
                    value={job.contact.contactName}
                    onChange={(e) =>
                      setJob((preJob) => ({
                        ...preJob,
                        contact: { ...preJob, contactName: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact Email"
                    required
                    value={job.contact.contactEmail}
                    onChange={(e) =>
                      setJob((preJob) => ({
                        ...preJob,
                        contact: { ...preJob, contactEmail: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="col-md-6 col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact Address"
                    required
                    value={job.contact.contactAddress}
                    onChange={(e) =>
                      setJob((preJob) => ({
                        ...preJob,
                        contact: { ...preJob, contactAddress: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
              <div className="col-md-6 col-sm-6">
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="fas fa-phone-alt"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact Phone"
                    required
                    value={job.contact.contactPhone}
                    onChange={(e) =>
                      setJob((preJob) => ({
                        ...preJob,
                        contact: { ...preJob, contactPhone: e.target.value },
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-sm-12">
            <button className="btn btn-success btn-primary small-btn">
              {onEdit ? 'Update Available Jobs' : 'Create a new Job'}
            </button>
          </div>
        </section>
      </form>

      <br />
    </>
  );
}

export default CreateJob;
