import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../components/Context/AuthContext';
import { useHttpClient } from '../../components/Hooks/Http-hook';
import Swal from 'sweetalert2';

const ManageCV = (props) => {
  const auth = useContext(AuthContext);
  const { sendRequest } = useHttpClient();
  const [loadedCvs, setLoadedCvs] = useState([]);
  const [callback, setCallBack] = useState(false);

  useEffect(() => {
    const fetchCvs = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/cvs/user/${auth.userId}`);
        const data = responseData.cvs;
        setLoadedCvs(data);
        setCallBack(!callback);
      } catch (error) {
        console.error(error); // You should handle the error appropriately
      }
    };
    fetchCvs();
  }, [auth.userId, sendRequest, callback]);

  const onView = async (cv) => {
    try {
      await sendRequest(`http://localhost:5000/api/cvs/${cv}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdate = async (cv) => {
    try {
      await sendRequest(`http://localhost:5000/api/cvs/${cv}`);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (cv) => {
    try {
      await axios.delete(`http://localhost:5000/api/cvs/${cv}`);
      setCallBack(!callback);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Deleted.',
      });
    }
  };

  return !loadedCvs.length ? (
    <>
      <section
        className="inner-header-title blank"
        style={{
          backgroundImage: `URL("https://www.mediafire.com/convkey/94a5/ld2xj8f54j7colg6g.jpg")`,
        }}
      >
        <div className="container">
          <h1>MANAGE CV</h1>
        </div>
      </section>
      <div className="main-heading">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <h4>You do not have any cvs!</h4>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </>
  ) : (
    <>
      <section
        className="inner-header-title blank"
        style={{
          backgroundImage: `URL("https://images.unsplash.com/photo-1621610086679-535f8bb2ee01?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="container">
          <h1>MANAGE CV</h1>
        </div>
      </section>

      <section className="member-card gray">
        <div className="container">
          <div className="row">
            {loadedCvs.map((cv) => {
              return (
                <>
                  <div className="col-md-3 col-sm-4">
                    <div className="manage-cndt">
                      {/* <div className="cndt-status pending">{cv.isStatus}</div> */}
                      {<p>{cv.isStatus}</p> === <p>Available</p> ? (
                        <div className="cndt-status available">Available</div>
                      ) : (
                        <div className="cndt-status pending">Pending</div>
                      )}
                      <div style={{ float: 'right', paddingTop: '5%', paddingRight: '5%' }}>
                        <div className="dropdown">
                          <div className="btn-group fl-right">
                            <button
                              type="button"
                              className="btn-trans"
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            >
                              <i className="fa fa-gear"></i>
                            </button>
                            <div className="dropdown-menu pull-right animated flipInX">
                              <Link to={`/cvs/updatecv/${cv.id}`}>
                                <a onClick={onUpdate} href=" "> 
                                  <i className="fa fa-edit" style={{ fontSize: '110%' }}></i>&nbsp; Edit
                                </a>
                              </Link>
                              <a
                                onClick={() => {
                                  onDelete(cv.id);
                                }}
                                href=" "
                              >
                                <i className="fa fa-trash-o" style={{ fontSize: '110%' }}></i>&nbsp; Delete
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                      <br />
                      <br />
                      <div className="cndt-caption">
                        <div className="cndt-pic">
                          <img src={cv.cvImage} className="img-responsive img-circle" alt="" />
                        </div>
                        <h4>{cv.cvName}</h4>
                        <span>{cv.position}</span>
                      </div>
                      <Link to={`/cvs/details/${cv.id}`} onClick={onView} className="cndt-profile-btn">
                        View Detail
                      </Link>
                    </div>
                  </div>

                  {/* <div className="col-md-3 col-sm-4">
                    <div className="manage-cndt">
                      <div className="cndt-status available">Available</div>
                      <br /> <br />
                      <div className="cndt-caption">
                        <div className="cndt-pic">
                          <img src="assets/img/client-2.jpg" className="img-responsive" alt="" />
                        </div>
                        <h4>Ethan Marion</h4>
                        <span>IOS designer</span>
                      </div>
                      <Link className="cndt-profile-btn">View Detail</Link>
                    </div>
                  </div> */}
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageCV;
