import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../components/Context/AuthContext';
import { useHttpClient } from "../../../components/Hooks/Http-hook";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const FormRegister = () => {
  const auth = useContext(AuthContext);
  const [userName, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { sendRequest } = useHttpClient();
  const [error, setError] = useState("");

  async function register(e) {
    e.preventDefault();
    try {
      const responseData = await sendRequest(
        "http://localhost:5000/api/users/signup",
        "POST",
        JSON.stringify({
          userName,
          email,
          passwordHash,
          confirmPassword,
        }),
        {
          "Content-Type": "application/json",
        }
      );
      console.log(responseData);
      Swal.fire('Awesome!', "You're successfully interested in!", 'success').then(
        (result) => {
          if (result.isConfirmed || result.isDismissed) {
            
          }
        }
      );
      auth.login(responseData.user.id);
      auth.authorization(responseData.user.userName);
      auth.authorization(responseData.user.role);
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again.");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  }

  return (
    <>
      <section className="login-plane-sec">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
              <div className="login-panel panel panel-default">
                <div className="panel-heading">
                  <h1 className="panel-title" style={{ fontWeight: 'bold', color: 'green' }}>
                    Create An Account
                  </h1>
                </div>
                <div className="panel-body">
                  {/* <img src={'/assets/img/Job-Listing.png'} className="img-responsive" alt="" /> */}

                  <form onSubmit={register}>
                    <fieldset>
                      <div className="form-group">
                        <img src={'/assets/img/Job-Listing.png'} className="img-responsive" alt="" />
                        <label style={{ paddingLeft: '2%' }}>Username:</label>
                        <input
                          className="form-control"
                          type="userName"
                          placeholder="Username"
                          onChange={(e) => setUsername(e.target.value)}
                          value={userName}
                          required
                          // name="email"
                          // type="email"
                          // autofocus
                        />
                        <label style={{ paddingLeft: '2%' }}>Email:</label>
                        <input
                          className="form-control"
                          type="email"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                          required
                          // name="email"
                          // type="email"
                          // autofocus
                        />
                      </div>
                      <div className="form-group">
                        <label style={{ paddingLeft: '2%' }}>Password: </label>
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Password"
                          onChange={(e) => setPasswordHash(e.target.value)}
                          value={passwordHash}
                          required
                          // name="password"
                          // type="password"
                          // value=""
                        />
                        <label style={{ paddingLeft: '2%' }}>Confirm Password:</label>
                        <input
                          className="form-control"
                          type="password"
                          placeholder="Verify your password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          value={confirmPassword}
                          required
                          // name="password"
                          // type="password"
                          // value=""
                        />
                      </div>

                      <div className="checkbox" style={{ marginLeft: '5%' }}>
                        <label>
                          <input
                            name="remember"
                            type="checkbox"
                            style={{ marginLeft: '-7%', width: '5%' }}
                            value="Remember Me"
                          />
                          Remember Me
                        </label>
                      </div>
                      <div>
                        {error && <span className="error-message">{error}</span>}
                      </div>
                      <button type="submit" className="btn btn-login" style={{ height: '1%' }}>
                        Register
                      </button>
                    </fieldset>
                  </form>
                  <div style={{ textAlign: 'center', marginTop: '-4%' }}>
                    <div>
                      <p>Already have an account? <Link to="/login"><label style={{ cursor: 'pointer' }}>Click here!</label></Link></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default FormRegister;
