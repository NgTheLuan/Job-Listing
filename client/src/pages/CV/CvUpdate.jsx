import React from 'react';
import Navbars from '../../components/Navbars';
import Footers from '../../components/Footers';
import UpdateCV from '../../features/CV/UpdateCV';

const CvUpdate = () => {
  return (
    <>
      <Navbars />
      <UpdateCV />
      <Footers />
    </>
  );
};

export default CvUpdate;