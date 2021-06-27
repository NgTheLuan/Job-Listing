import React from 'react';

import Navbars from '../../../components/Navbars';
import Footers from '../../../components/Footers';
import CreateJob from '../../../features/Job/CreateJob';
function AddJob() {
  return (
    <div>
      <Navbars />
      <CreateJob />
      <Footers />
    </div>
  );
}

export default AddJob;
