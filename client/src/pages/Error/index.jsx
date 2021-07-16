import React from 'react';
import Navbar from '../../components/Navbars';
import Footer from '../../components/Footers';
function Error() {
  return (
    <>
      <Navbar />
      <section class="simple-bg-screen big-wrap">
        <div class="container">
          <div class="error-page">
            <h2>
              4<span>0</span>4
            </h2>
            <p>Oops...looks like we got lost</p>
            <a class="btn btn-success small-btn" href="# ">
              Let's Go Home
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Error;
