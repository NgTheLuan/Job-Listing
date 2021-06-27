import React, { Component } from "react";

class Application extends Component {
  render() {
    return (
      <section
        className="download-app"
        style={{ backgroundImage: `url("assets/img/banner-10.jpg")` }}
      >
        <div className="container">
          <div className="col-md-5 col-sm-5 hidden-xs">
            <img
              src="assets/img/iphone.png"
              alt="iphone"
              className="img-responsive"
            />
          </div>
          <div className="col-md-7 col-sm-7">
            <div className="app-content">
              <h2>Download Our Best Apps</h2>
              <h4>Best oppertunity in your hand</h4>

              <p>
                Aliquam vestibulum cursus felis. In iaculis iaculis sapien ac
                condimentum. Vestibulum congue posuere lacus, id tincidunt nisi
                porta sit amet. Suspendisse et sapien varius, pellentesque dui
                non, semper orci. Curabitur blandit, diam ut ornare ultricies.
              </p>
              <a href={"# "} className="btn call-btn">
                <i className="fa fa-apple"></i>Download
              </a>
              <a href={"# "} className="btn call-btn">
                <i className="fa fa-android"></i>Download
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Application;
