import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { registerUsers, sendOtpTouser, verifyOtpofUser } from '../Action/users/loginandregister';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({ email: '', password: '', firstName: '', lastName: '', phone: '', address: '' });
  const [otp, setOtp] = useState("");
  const [validation, setValidation] = useState(false);

  const { email, password, firstName, lastName, phone, address } = userData;


  const handleInputData = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  }

  const sentOtp = async (event) => {
    if (event) event.preventDefault();
    try {
      dispatch(showLoading());

      const response = await sendOtpTouser(userData.phone);

      //const { data: resp } = await axiosInstance.post('/user/send-otp', { contact: userData.phone });
      dispatch(hideLoading());

      if (response.type === 'data') {
        alert(response.message);
      } else {
        alert(response.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error)
      alert("server error please try again");
    }
  }

  const checkValidation = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading());
      //  before register we require one phase check validation || for this we will create one backend api 
      //  validateRegistration()

      // if validation is successfull then we need setState of validation as true
      // then call to sent otp function
      setValidation(true);
      dispatch(hideLoading());
      sentOtp();
    } catch (error) {
      dispatch(hideLoading());
      // console.log(error)
      alert("server error please try again");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await verifyOtpofUser(userData.phone, otp);

      if (response.type === 'data') {
        const registerresponse = await registerUsers(userData);
        dispatch(hideLoading());

        if (registerresponse.type === 'data') {
          alert(registerresponse.message);
          navigate('/login')
        } else {
          alert(registerresponse.message);
        }
      } else {
        alert(response.message)
      }

    } catch (error) {
      dispatch(hideLoading());
      // console.log(error)
      alert("server error please try again");
    }
  }

  return (
    <>
      {false === validation ?
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
                    <form id="stripe-login" onSubmit={checkValidation}>
                      <div className="form-group padding-bottom--24">
                        <label htmlFor="address">Address</label>
                        <input
                          type="text"
                          className="form-control"
                          name="address"
                          id="address"
                          value={address}
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
                        <label htmlFor="phone">Contact No</label>
                        <input
                          type="text"
                          name="phone"
                          id="phone"
                          value={phone}
                          className="form-control"
                          onChange={handleInputData}
                          required
                        />
                      </div>
                      <div className="form-group padding-bottom--24">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={firstName}
                          className="form-control"
                          onChange={handleInputData}
                          required
                        />
                      </div>
                      <div className="form-group padding-bottom--24">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={lastName}
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
        </div> :
        <form onSubmit={handleSubmit}>
          <input type="text" value={otp} name="otp" onChange={(e) => setOtp(e.target.value)} />
          <button onClick={sentOtp}>resend otp</button>
          <button type="submit">submit</button>
        </form>
      }
    </>
  );
}

export default Register;
