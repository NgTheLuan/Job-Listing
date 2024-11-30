import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../components/Context/AuthContext';
import Loading from '../../Loading';

function FavoriteJob() {
  const auth = useContext(AuthContext);
  const [favojob, setFavoJob] = useState([]);
  const [loadding, setLoading] = useState(true);

  const addToFavorite = async () => {
    await axios.patch(`/api/users/addfavoritejob/${auth.userId}`, { favorite: favojob });
  };

  const removeFavoriteJob = (id) => {
    favojob.forEach((item, index) => {
      if (item._id === id) {
        favojob.splice(index, 1);
      }
      console.log(favojob);
    });

    // favojob.map((item, index) => {
    //   if (item._id === id) {
    //     favojob.splice(index, 1);
    //   }
    // });

    // favojob.splice(1);

    // console.log(favojob);
    // console.log(favojob.splice(1));

    setFavoJob([...favojob]);
    addToFavorite(favojob);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`/api/users/${auth.userId}`);
        setFavoJob(res.data.user.favorite);

        setLoading(false);
      } catch (err) {
        alert(err.response.data.msg);
      }
    };
    getUser();
  }, [favojob,auth.userId]);

  // if (favojob.length === 0)
  //   return <h2 style={{ textAlign: 'center', fontSize: '5rem', paddingTop: '5%' }}>Favorite Empty</h2>;

  return (
    <>
      {loadding ? (
        <Loading />
      ) : (
        <section className="accordion">
          <div className="container">
            <div className="col-md-12 col-sm-12">
              <div className="simple-tab">
                <div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingOne">
                      <h4 className="panel-title">
                        <a
                          role="button"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          💗 Your Favorite Job
                        </a>
                      </h4>
                    </div>
                    <div
                      id="collapseOne"
                      className="panel-collapse collapse in"
                      role="tabpanel"
                      aria-labelledby="headingOne"
                    >
                      {favojob.length === 0 ? (
                        <h3 style={{ textAlign: 'center' }}>Your Favorite Job Is Null 🙂</h3>
                      ) : (
                        <table style={{ fontSize: '110%' }}>
                          <thead>
                            <tr>
                              <th style={{ paddingTop: '1%', paddingLeft: '2%' }}>Logo</th>
                              <th style={{ paddingTop: '1%' }}>Name Company</th>
                              <th style={{ paddingTop: '1%' }}>Position</th>
                              <th style={{ paddingTop: '1%' }}>Location</th>
                              <th style={{ paddingTop: '1%' }}>Remove</th>
                            </tr>
                          </thead>
                          {favojob.map((job) => {
                            return (
                              <tbody>
                                <tr>
                                  <td style={{ width: '15%', paddingTop: '2%' }}>
                                    <img src={job.imgCom} alt="favorite jobs" style={{ width: '40%', paddingLeft: '10%' }} />
                                  </td>
                                  <td style={{ width: '20%', paddingTop: '3%' }}>{job.nameCom}</td>
                                  <td style={{ width: '20%', paddingTop: '3%' }}>{job.position}</td>
                                  <td style={{ width: '20%', paddingTop: '3%' }}>{job.location.city} city</td>
                                  <td style={{ width: '3%', paddingTop: '3%', textAlign: 'center', cursor: 'pointer' }}>
                                    <i
                                      className="fas fa-trash-alt"
                                      onClick={() => {
                                        if (window.confirm('Are you sure to remove this favorite job?'))
                                          removeFavoriteJob(job._id);
                                      }}
                                    ></i>
                                    {/* <Link to={job._id}>ABC</Link> */}
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                        </table>
                      )}
                    </div>
                  </div>
                  <div className="panel panel-default">
                    <div className="panel-heading" role="tab" id="headingTwo">
                      <h4 className="panel-title">
                        <a
                          className="collapsed"
                          role="button"
                          data-toggle="collapse"
                          data-parent="#accordion"
                          href="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                        >
                          💡 Tips: Refine your resume
                        </a>
                      </h4>
                    </div>
                    <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
                      <div className="panel-body" style={{ textAlign: 'justify' }}>
                        <h3>What information should I include?</h3>
                        <p>
                          We want to hear about your latest accomplishments, your strengths, and how specific skills
                          might be applied to a position at Microsoft. Be sure to highlight your accomplishments in
                          previous jobs—not just your duties. Do you have past projects to share? Include them as
                          attachments or links to give us a better sense of your style.
                        </p>
                        <h3>How long should my resume be?</h3>
                        <p>
                          It’s okay to use more than one page. That said, be sure your summaries are succinct and
                          relevant—and that your most important information figures prominently on the first page.
                        </p>
                        <h3>Should I list extracurricular and volunteer work?</h3>
                        <p>
                          Yes, help us get to know you better by telling us a little bit about the things that you’re
                          passionate about both in and outside of the workplace.
                        </p>
                        <h3>What are the top traits you look for in a potential candidate?</h3>
                        <p>
                          The specific questions we ask will depend on the position you’re applying for, but all our
                          questions are intended to help us understand your capabilities and potential to grow.
                          Generally, we look for a strong desire to learn, high intelligence, a passion for technology,
                          willingness to work hard, rock-solid skills, an entrepreneurial spirit, and a desire to excel.
                        </p>
                        <h3>I've submitted my resume. Now what?</h3>
                        <p>
                          Our recruiters review job applicants for each opening and reach out to those who appear to be
                          a strong match with the position. But even if you're not contacted for the job you applied
                          for, your information will go into our recruiter's shared candidate database, which means you
                          may be contacted for other opportunities within Microsoft at a later date.
                        </p>
                        <p style={{ textAlign: 'right' }}>Resource: https://careers.microsoft.com/us/en/faq</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default FavoriteJob;
