import React from 'react';
import Navbars from '../../components/Navbars';
import Footers from '../../components/Footers';
import CrudCategory from '../../features/Category/CrudCategory';
function ManageCategory() {
  return (
    <>
      <Navbars />
      <CrudCategory />
      <Footers />
    </>
  );
}

export default ManageCategory;
