import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useCV } from '../../../components/Store/CV';
import { useExperience } from '../../../components/Store/Experience';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const Experiences = (props) => {
  const [cvState, cvActions] = useCV();
  const [formState, formActions] = useExperience();
  const [exp, setExp] = useState({
    expDescription: '',
  });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const data = {
      expDescription: exp.expDescription,
      cvId: cvState.cvId,
      experienceId: cvState.experienceId,
    };
    await formActions.stepExperience(data);
    props.navigate.push('/createcv-extras');
  }, [exp.expDescription, cvState.cvId, cvState.experienceId, formActions, props.navigate]);

  useEffect(() => {
    const fetch = async () => {
      if (!cvState.experienceId) {
        const experience = await axios.post(`http://localhost:5000/api/cvs/createExperience/${cvState.cvId}`);
        cvActions.saveExperienceId(experience.data.cv._id);
      }
    };
    fetch();
  }, [cvState.cvId, cvState.experienceId, cvActions]);

  const previous = () => {
    props.navigate.push('/createcv-project');
  };

  return (
    <>
      <section className="full-detail">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row bottom-mrg extra-mrg">
              <h2 className="detail-title">Experience Details</h2>
              <div className="col-md-12 col-sm-12">
                <CKEditor
                  required
                  id="expDescription"
                  data={formState.expDescription}
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setExp({ ...exp, expDescription: data });
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
    </>
  );
};

export default Experiences;