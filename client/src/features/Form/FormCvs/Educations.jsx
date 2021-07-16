import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCV } from '../../../components/Store/CV';
import { useEducation } from '../../../components/Store/Education';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const Educations = (props) => {
  const [cvState, cvActions] = useCV();
  const [formState, formActions] = useEducation();
  const [edu, setEdu] = useState({
    education: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      education: edu.education,
      cvId: cvState.cvId,
      educationId: cvState.educationId,
    };
    await formActions.stepEducation(data);
    props.history.push('/createcv-project');
  };

  useEffect(() => {
    if (!cvState.educationId) {
      const fetch = async () => {
        const education = await axios.post(`http://localhost:5000/api/cvs/createEducation/${cvState.cvId}`); //create empty CV
        cvActions.saveEducationId(education.data.cv._id);
      };
      fetch();
    } else {
      return () => handleSubmit;
    }
  }, [cvState.cvId]);

  const previous = () => {
    props.history.push('/createcv-profile');
  };

  return (
    <>
      <section class="full-detail">
        <form onSubmit={handleSubmit}>
          <div class="container">
            <div class="row bottom-mrg extra-mrg">
              <h2 class="detail-title">Education Details</h2>
              <div class="col-md-12 col-sm-12">
                <CKEditor
                  required
                  id="education"
                  data={formState.education}
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setEdu({ ...edu, education: data });
                  }}
                />
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

export default Educations;
