import React from 'react';
import { Link } from 'react-router-dom';

function Footers() {
  return (
    <>
      <footer className="footer">
        <div className="row lg-menu">
          <div className="container">
            <div className="col-md-4 col-sm-4">
              <Link to="/">
                <img src={'/assets/img/Job-Listing.png'} className="img-responsive" alt="" />
              </Link>
            </div>
            <div className="col-md-8 co-sm-8 pull-right">
              <div className="textwidget">
                <ul className="footer-social">
                  <li>
                    <a href={'https://www.facebook.com/ngtheluan.99'} target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href={'# '} target="_blank" rel="noreferrer">
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li>
                    <a href={'https://twitter.com/ngtheluan99'} target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href={'https://www.instagram.com/ng.thluan/'} target="_blank" rel="noreferrer">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href={'https://www.linkedin.com/in/ngtheluan99/'} target="_blank" rel="noreferrer">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="row no-padding">
          <div className="container">
            <div className="col-md-4 col-sm-12">
              <div className="footer-widget">
                <h3 className="widgettitle widget-title">About Site 🎯</h3>
                <p>The recruitment site with the best jobs gives employees many choices</p>
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="footer-widget">
                <h3 className="widgettitle widget-title">Contact 📧</h3>

                <p>
                  <strong>Email:</strong> nguyenluan.work@gmail.com
                </p>
                <p>
                  <strong>Email:</strong> nguyenthanhloc1308@gmail.com
                </p>
              </div>
            </div>

            <div className="col-md-4 col-sm-12">
              <div className="footer-widget">
                <h3 className="widgettitle widget-title">Tell Us 📞</h3>

                <p>
                  <strong>Phone:</strong> <a href={'# '}>0909 774 4xx (Mr.Luân)</a>
                </p>
                <p>
                  <strong>Phone:</strong> <a href={'# '}>0774 784 1xx (Mr.Lộc)</a>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row copyright">
          <div className="container"></div>
        </div> */}
      </footer>
    </>
  );
}

export default Footers;
