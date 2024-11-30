import React, { useState, useContext } from 'react';
import { GlobalState } from '../../GlobalState';

function Category() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [visible, setVisible] = useState([8]);

  var loadcategories = categories.slice(0, visible).map((rendercategories) => {
    return (
      <div key={rendercategories._id}>
        <div className="col-md-3 col-sm-6 category-cus" style={{ float: 'left' }}>
          <div className="category-box" data-aos="fade-up">
            <div className="category-desc">
              <div className="category-icon">
                <img src={rendercategories.career.icon} alt="" width="17%" />
              </div>
              <div className="category-detail category-desc-text">
                <h4 style={{ fontWeight: 'bold', color: 'grey' }}>{rendercategories.career.careerName}</h4>
                <h5 style={{ color: 'grey' }}>{rendercategories.career.total} Jobs</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  function handleLoadMore() {
    setVisible(visible + 4);
  }

  return !categories.length ? (
    <div className="main-heading">
      <h2>Category</h2>
      <h4>Don't have data !</h4>
      <br />
    </div>
  ) : (
    <section>
      <div className="container">
        <div className="row">
          <div className="main-heading">
            <h2>
              Browse Jobs By <span>Category</span>
              <br />
              <br />
              <div>{loadcategories}</div>
              <div>
                {visible < categories.length && (
                  <button className="btn btn-primary" onClick={handleLoadMore}>
                    Load More
                  </button>
                )}
              </div>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Category;
