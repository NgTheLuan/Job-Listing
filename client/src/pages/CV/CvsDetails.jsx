import React from 'react';
import Navbars from '../../components/Navbars';
import Footers from '../../components/Footers';
import CvDetails from '../../features/CV/CvDetails';

const CvsDetails = () => {
  return (
    <>
      <Navbars />
      <CvDetails />
      <Footers />
    </>
  );
};

export default CvsDetails;
