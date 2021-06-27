import React from 'react';
import FavoriteJob from '../../../features/Job/FavoriteJob';
import Navbars from '../../../components/Navbars';
import Footers from '../../../components/Footers';

function FavoritesJob() {
  return (
    <div>
      <Navbars />
      <br /> <br />
      <FavoriteJob />
      <br /> <br />
      <Footers />
    </div>
  );
}

export default FavoritesJob;
