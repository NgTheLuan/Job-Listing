import React, { useEffect, useState } from 'react';
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
  })

  useEffect(() => {
    if (!cvState.extraId) {
      const fetch = async () => {
        const extra = await axios.post(`http://localhost:5000/api/cvs/createExtra/${cvState.cvId}`);
        cvActions.saveExtraId(extra.data.cv._id);
      }
      fetch();
    } else {
      return () => handleSubmit;
    }
  }, [cvState.cvId])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      addInfor: extra.addInfor,
      cvId: cvState.cvId,
      extraId: cvState.extraId,
    };
    await formActions.stepExtra(data);
    props.history.push('/createcv-review');
  }

  const previous = (data) => {
    console.log(data);
    props.history.push('/createcv-experience');
  };

  return (
    <>
      <section class="full-detail">
        <form onSubmit={handleSubmit}>
          <div class="container">
            <div class="row bottom-mrg extra-mrg">
              <h2 class="detail-title">Extras Details</h2>
              <div class="col-md-12 col-sm-12">
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

export default Extras;