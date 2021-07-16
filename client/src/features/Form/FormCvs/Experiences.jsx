import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useCV } from '../../../components/Store/CV';
import { useExperience } from '../../../components/Store/Experience';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const Experiences = (props) => {
  const [cvState, cvActions] = useCV();
  const [formState, formActions] = useExperience();
  const [exp, setExp] = useState({
    expDescription: '',
  })

  useEffect(() => {
    if (!cvState.experienceId) {
      const fetch = async () => {
        const experience = await axios.post(`http://localhost:5000/api/cvs/createExperience/${cvState.cvId}`); //create empty CV
        cvActions.saveExperienceId(experience.data.cv._id);
      }
      fetch();
    } else {
      return () => handleSubmit;
    }
  }, [cvState.cvId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      expDescription: exp.expDescription,
      cvId: cvState.cvId,
      experienceId: cvState.experienceId,
    };
    await formActions.stepExperience(data);
    props.history.push('/createcv-extras');
  }

  const previous = () => {
    props.history.push('/createcv-project');
  };

  return (
    <>
      <section class="full-detail">
        <form onSubmit={handleSubmit}>
          <div class="container">
            <div class="row bottom-mrg extra-mrg">
              <h2 class="detail-title">Experience Details</h2>
              <div class="col-md-12 col-sm-12">
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

export default Experiences;