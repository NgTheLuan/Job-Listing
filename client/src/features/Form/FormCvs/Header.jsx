import React from 'react';
import Progress from './Progress';

const Header = () => (
  <div>
    <section
        className="inner-header-title blank"
        style={{
          backgroundImage: `URL("https://www.mediafire.com/convkey/94a5/ld2xj8f54j7colg6g.jpg")`,
        }}
      >
        <div className="container">
          <h1>CREATE CV</h1>
        </div>
    </section>
    <Progress />
  </div>
);

export default Header;