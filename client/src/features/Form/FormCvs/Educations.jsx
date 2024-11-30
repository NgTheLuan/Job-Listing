import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
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

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const data = {
      education: edu.education,
      cvId: cvState.cvId,
      educationId: cvState.educationId,
    };
    await formActions.stepEducation(data);
    props.navigate.push('/createcv-project');
  }, [edu.education, cvState.cvId, cvState.educationId, formActions, props.navigate]);

  useEffect(() => {
    if (!cvState.educationId) {
      const fetch = async () => {
        const education = await axios.post(`http://localhost:5000/api/cvs/createEducation/${cvState.cvId}`); // create empty CV
        cvActions.saveEducationId(education.data.cv._id);
      };
      fetch();
    }
  }, [cvState.cvId, cvState.educationId, cvActions]);

  const previous = () => {
    props.navigate.push('/createcv-profile');
  };

  return (
    <section className="full-detail">
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row bottom-mrg extra-mrg">
            <h2 className="detail-title">Education Details</h2>
            <div className="col-md-12 col-sm-12">
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
  );
};

export default Educations;