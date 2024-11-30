import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function Filters() {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;

  const [category, setCategory] = state.jobAPI.category;
  const [search, setSearch] = state.jobAPI.search;
  const [sort, setSort] = state.jobAPI.sort;

  const handleCategory = (e) => {
    setCategory(e.target.value);
    // setSearch('');
    console.log(e.target.value);
  };

  const handleLocation = (e) => {
    setCategory(e.target.value);
    // setSearch('');
    console.log(e.target.value);
  };

  return (
    <>
      <div className="row extra-mrg">
        <div className="wrap-search-filter">
          <form>
            <div className="col-md-3 col-sm-6">
              <input
                type="text"
                className="form-control"
                placeholder="What Is Your Favorite Job ?"
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
            </div>

            <div className="col-md-3 col-sm-6">
              <select className="form-control" name="location" onChange={handleLocation}>
                <option value="">All City</option>

                <option value={'location.city=Ho Chi Minh'}>Ho Chi Minh</option>
                <option value={'location.city=Ha Noi'}>Ha Noi</option>
              </select>
            </div>

            <div className="col-md-3 col-sm-6">
              <select className="form-control" name="category" value={category} onChange={handleCategory}>
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option value={'category=' + category.career.careerName} key={category._id}>
                    {category.career.careerName}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-3 col-sm-6">
              <select
                id="choose-filter"
                className="form-control"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Newest</option>
                <option value="sort=-salary.to">Salary: high-low</option>
                <option value="sort=salary.to">Salary: low-high</option>
              </select>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Filters;
