import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const Register = ({ axiosInstance }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ name: '', email: '', password: '' });
  const { name, email, password } = userData;

  const handleInputData = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading());
      const res = await axiosInstance.post('/user/register', userData);
      dispatch(hideLoading());
      if (res.data.success) {
        alert('registerd successfully!');
        navigate('/login')
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      alert('some thing went wrong');
    }
  }

  return (
    <>
      <div className="login-root">
        <div
          className="box-root flex-flex flex-direction--column"
          style={{ minHeight: "100vh", flexGrow: 1 }}
        >
          <div
            className="box-root  flex-flex flex-direction--column"
            style={{ flexGrow: 1, zIndex: 9 }}
          >
            <div className="box-root padding-top--24 padding-bottom--12 flex-flex flex-justifyContent--center">
              <h2>
                Create a new account
              </h2>
            </div>
            <div className="formbg-outer">
              <div className="formbg">
                <div className="formbg-inner padding-horizontal--48">
                  {/* <span className="padding-bottom--15">Sign in to your account</span>  */}
                  <form id="stripe-login" onSubmit={handleSubmit}>
                    <div className="form-group padding-bottom--24">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        value={name}
                        onChange={handleInputData}
                        // placeholder="Your professional name here"
                        required
                      />
                    </div>
                    <div className="form-group padding-bottom--24">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        className="form-control"
                        onChange={handleInputData}
                        required
                      />
                    </div>
                    <div className="form-group padding-bottom--24">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handleInputData}
                        required
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        name="submit"
                        value="SIGNUP"
                        // onClick={myregister}
                        className="btn btn-primary"
                        style={{
                          width: "100%",
                          backgroundColor: "rgb(84, 105, 212)",
                        }}
                      >
                        Sign Up
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="footer-link padding-top--12 padding-bottom--12">
                <span>
                  Already have an account? <a href="/login">Login</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;

{/* <div>
<form onSubmit={handleSubmit}>
    <input type="text" name="name" value={name} onChange={handleInputData} />
    <input type="text" value={email} name='email' onChange={handleInputData} />
    <input type="password" name="password" value={password} onChange={handleInputData} />
    <button type="submit">register</button>
</form>
</div> */}
