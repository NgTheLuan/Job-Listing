import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from '../../features/Form/FormCvs/Header';
import Navbars from '../../components/Navbars';
import Footers from '../../components/Footers';
import '../../features/Form/FormCvs/styles.scss';

import Overview from '../../features/Form/FormCvs/Overview';
import Profiles from '../../features/Form/FormCvs/Profiles';
import Educations from '../../features/Form/FormCvs/Educations';
import Projects from '../../features/Form/FormCvs/Projects';
import Experiences from '../../features/Form/FormCvs/Experiences';
import Extras from '../../features/Form/FormCvs/Extras';
import Review from '../../features/Form/FormCvs/Review';

const CvRouter = () => {
  return (
    <>
      <Navbars />
      <br /><br /><br />
      <Header />
      <Routes>
        <Route component={Overview} path="/createcv" exact={true} />
        <Route component={Profiles} path="/createcv-profile" />
        <Route component={Educations} path="/createcv-education" />
        <Route component={Projects} path="/createcv-project" />
        <Route component={Experiences} path="/createcv-experience" />
        <Route component={Extras} path="/createcv-extras" />
        <Route component={Review} path="/createcv-review" />
      </Routes>
      <Footers />
    </>
  );
};

export default CvRouter;