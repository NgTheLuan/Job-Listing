import React, { useState } from 'react';
import { useCV } from '../../../components/Store/CV';
import { useFormik } from 'formik';
import Swal from 'sweetalert2';
import Loading from '../../LoadingImg';
import axios from 'axios';

const CvName = (props) => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState(false);
  const [cvState, cvActions] = useCV();
  const formik = useFormik({
    initialValues: {
      cvName: '',
      cvImage: '',
      position: '',
      bio: '',
    },

    onSubmit: async (values) => {
      const data = {
        cvName: values.cvName,
        cvImage: values.cvImage,
        position: values.position,
        bio: values.bio,
        cvId: cvState.cvId,
      };
      await cvActions.updateCvName(data);
      props.history.push('/createcv-profile');
    },
  });

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

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
      const res = await axios.post('https://joblisting-web.herokuapp.com/api/photo/upload', formData, {
        url: photos.url,
      });

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
      await axios.post('https://joblisting-web.herokuapp.com/api/photo/destroy', { public_id: photos.public_id });
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

  const { styleUpload } = {
    display: photos ? 'block' : 'none',
  };

  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <form onSubmit={formik.handleSubmit}>
        <div class="detail-desc section">
          <div class="container white-shadow">
            <div class="row">
              <div class="detail-pic js">
                <div class="box">
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
                        <i class="fa fa-upload" aria-hidden="true" style={{ cursor: 'pointer', fontSize: '20px' }}></i>
                      </label>

                      <div style={styleUpload}>
                        <img
                          src={photos ? photos.url : ''}
                          srcSet={formik.cvImage}
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

            <div class="add-feild">
              <div class="row bottom-mrg">
                <div class="col-md-6 col-sm-6">
                  <div class="input-group">
                    <label>CV Name</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      placeholder="Example: CV1."
                      name="cvName"
                      defaultValue={cvState.cvName}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>

                <div class="col-md-6 col-sm-6">
                  <div class="input-group">
                    <label>Position</label>
                    <input
                      type="text"
                      class="form-control"
                      required
                      placeholder="Example: App Developer."
                      name="position"
                      defaultValue={cvState.position}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>

                <div class="col-md-12 col-sm-12">
                  <div class="input-group">
                    <label>Bio</label>
                    <textarea
                      type="text"
                      class="form-control"
                      placeholder="Describe yourself."
                      required
                      name="bio"
                      defaultValue={cvState.bio}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>

                <div class="col-md-6 col-sm-6">
                  <div class="input-group">
                    <input
                      type="file"
                      name="upload-pic[]"
                      id="upload-pic"
                      class="form-control input-lg"
                      style={{
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

                <div class="col-md-6 col-sm-6">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Paste your link file upload here."
                      required
                      name="cvImage"
                      defaultValue={cvState.cvImage}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>

                <div class="detail pannel-footer">
                  <div class="col-md-12 col-sm-12">
                    <div class="detail-pannel-footer-btn pull-right">
                      <button
                        class="footer-btn choose-cover"
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
                      &nbsp;&nbsp;&nbsp;
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
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CvName;
