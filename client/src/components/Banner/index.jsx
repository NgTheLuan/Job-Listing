import React, { Component } from 'react';

class Banner extends Component {
  render() {
    return (
      <>
        <div
          className="simple-banner"
          style={{
            backgroundImage: `url("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80")`,
          }}
        >
          <div className="container">
            <div className="simple-banner-caption">
              <div className="col-md-10 col-sm-10 col-md-offset-1 col-sm-offset-1 banner-text">
                <h3>We Are Available On</h3>

                <h1>
                  Job <span>Listing</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
      </>
    );
  }
}

export default Banner;
