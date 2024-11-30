import React, { useEffect, useState, useCallback } from 'react';
import { useCV } from '../../../components/Store/CV';
import { useExtra } from '../../../components/Store/Extra';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';

const Extras = (props) => {
  const [cvState, cvActions] = useCV();
  const [formState, formActions] = useExtra();
  const [extra, setExtra] = useState({
    addInfor: '',
  });

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const data = {
      addInfor: extra.addInfor,
      cvId: cvState.cvId,
      extraId: cvState.extraId,
    };
    await formActions.stepExtra(data);
    props.navigate.push('/createcv-review');
  }, [extra.addInfor, cvState.cvId, cvState.extraId, formActions, props.navigate]);

  useEffect(() => {
    const fetchExtra = async () => {
      if (!cvState.extraId) {
        const extraData = await axios.post(`http://localhost:5000/api/cvs/createExtra/${cvState.cvId}`);
        cvActions.saveExtraId(extraData.data.cv._id);
      }
    };
    fetchExtra();
  }, [cvState.cvId, cvState.extraId, cvActions]);

  const previous = () => {
    props.navigate.push('/createcv-experience');
  };

  return (
    <>
      <section className="full-detail">
        <form onSubmit={handleSubmit}>
          <div className="container">
            <div className="row bottom-mrg extra-mrg">
              <h2 className="detail-title">Extras Details</h2>
              <div className="col-md-12 col-sm-12">
                <CKEditor
                  required
                  id="addInfor"
                  data={formState.addInfor}
                  editor={ClassicEditor}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setExtra({ ...extra, addInfor: data });
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

export default Extras;