import React, { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

function LoadMore() {
  const state = useContext(GlobalState);
  const [page, setPage] = state.jobAPI.page;

  return (
    <>
      <div className="row">
        <ul className="pagination">
          <li>
            {/* eslint-disable-next-line */}
            <a href="#" onClick={() => setPage(page + 1)}>Load more</a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default LoadMore;