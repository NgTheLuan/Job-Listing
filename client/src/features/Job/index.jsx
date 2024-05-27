import React, { useContext, useState } from 'react';
import { GlobalState } from '../../GlobalState';
import Navbars from '../../components/Navbars';
import Footer from '../../components/Footers';
import Swal from 'sweetalert2';
import JobList from './JobList';
import Filters from './Filters';
import LoadMore from './LoadMore';
import Loading from '../../features/Loading';
import axios from 'axios';

function ListPage() {
  const state = useContext(GlobalState);
  const [jobs] = state.jobAPI.jobs;
  const [loading, setLoading] = useState(false);
  const [callback, setCallBack] = state.jobAPI.callback;

  const deleteJob = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/jobs/${id}`).then((res) => {
        // console.log(res.data);
      });

      setCallBack(!callback);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong, please try again.',
      });
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbars />
          <br /> <br />
          <section
            className="inner-header-title"
            style={{
              backgroundImage: `URL("https://www.mediafire.com/convkey/3256/oy9yrpyhvvwgu8b6g.jpg")`,
            }}
          >
            <div className="container">
              <h1>Browse Jobs</h1>
            </div>
          </section>
          <section className="brows-job-category">
            <div className="container">
              <Filters />
              <div className="item-click">
                {jobs.map((job) => {
                  return <JobList key={job._id} job={job} deleteJob={deleteJob} />;
                })}
              </div>

              <LoadMore />
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
}

export default ListPage;
