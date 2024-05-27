import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Progress = () => {
  const location = useLocation();
  const { pathname } = location;

  const isFirstStep = pathname === '/createcv';
  const isSecondStep = pathname === '/createcv-profile';
  const isThirdStep = pathname === '/createcv-education';
  const isFourthStep = pathname === '/createcv-project';
  const isFifthStep = pathname === '/createcv-experience';
  const isSixthStep = pathname === '/createcv-extras';
  const isSeventhStep = pathname === '/createcv-review';

  return (
    <React.Fragment>
      <div className="steps">
        <div className={`${isFirstStep ? 'step active' : 'step'}`}>
          <div>1</div>
          <div>
            {isSecondStep || isThirdStep || isFourthStep || isFifthStep || isSixthStep || isSeventhStep ? 
              <Link to="/createcv">Overview</Link> : 'Overview'
            }
          </div>
        </div>

        <div className={`${isSecondStep ? 'step active' : 'step'}`}>
          <div>2</div>
          <div>
            {isThirdStep || isFourthStep || isFifthStep || isSixthStep || isSeventhStep ? 
              <Link to="/createcv-profile">Profile</Link> : 'Profile'
            }
          </div>
        </div>

        <div className={`${isThirdStep ? 'step active' : 'step'}`}>
          <div>3</div>
          <div>
            {isFourthStep || isFifthStep || isSixthStep || isSeventhStep ? 
              <Link to="/createcv-education">Education</Link> : 'Education'
            }
          </div>
        </div>

        <div className={`${isFourthStep ? 'step active' : 'step'}`}>
          <div>4</div>
          <div>
            {isFifthStep || isSixthStep || isSeventhStep ? 
              <Link to="/createcv-project">Project</Link> : 'Project'
            }
          </div>
        </div>

        <div className={`${isFifthStep ? 'step active' : 'step'}`}>
          <div>5</div>
          <div>
            {isSixthStep || isSeventhStep ? 
              <Link to="/createcv-experience">Experience</Link> : 'Experience'
            }
          </div>
        </div>

        <div className={`${isSixthStep ? 'step active' : 'step'}`}>
          <div>6</div>
          <div>
            {isSeventhStep ? 
              <Link to="/createcv-extras">Extras</Link> : 'Extras'
            }
          </div>
        </div>

        <div className={`${pathname === '/createcv-review' ? 'step active' : 'step'}`}>
          <div>7</div>
          <div>Review</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Progress;