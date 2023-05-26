import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import axiosInstance from '../utilities/axiosInstance';
import CryptoJS from 'crypto-js';
import { registerUsers, sendOtpTouser, verifyOtpofUser } from '../Action/users/loginandregister';
const secretKey = process.env.REACT_APP_SECRET_KEY;


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
      console.log(error)
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
      console.log(error)
      alert("server error please try again");
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await verifyOtpofUser(userData.phone,otp);

      if(response.type === 'data') {
        const registerresponse = await registerUsers(userData);
        dispatch(hideLoading());

        if(registerresponse.type === 'data') {
          alert(registerresponse.message);
          navigate('/login')
        }else{
          alert(registerresponse.message);
        }
      }else{
        alert(response.message)
      }
      
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
      alert("server error please try again");
    }
  }

  return (
    <>
      {false === validation ?
        <>
        <nav className="bg-gray-800 shadow">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <a className="text-lg font-semibold text-gray-100 hover:text-gray-400" href="/">
                Doctor App
              </a>
            </div>
            <div className="flex items-center">
              <a className="text-gray-100 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium" href="#">
                Home
              </a>
              <a className="text-gray-100 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium" href="#">
                About
              </a>
              <a className="text-gray-100 hover:text-gray-400 px-3 py-2 rounded-md text-sm font-medium" href="#">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto flex justify-center items-center h-screen" style={{ backgroundColor: "black" }}>
        <div className="w-full max-w-md  shadow-md rounded-lg p-8 bg-gray-800">
          <h2 className="text-2xl font-semibold mb-6 text-white">Create a new account</h2>
          <form id="stripe-login" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 " htmlFor="address">
                Address
              </label>
              <input
                type="text"
                className="form-input w-full "
                name="address"
                id="address"
                value={address}
                onChange={handleInputData}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                className="form-input w-full"
                onChange={handleInputData}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="phone">
                Contact No
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                className="form-input w-full"
                onChange={handleInputData}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="firstName">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                className="form-input w-full"
                onChange={handleInputData}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                className="form-input w-full"
                onChange={handleInputData}
                required
                />
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
                </label>
                <input
                    type="password"
                    className="form-input w-full"
                    name="password"
                    id="password"
                    value={password}
                    onChange={handleInputData}
                    required
                  />
                </div>
              <div className="flex items-center justify-between">
              <button
                          type="submit"
                          name="submit"
                          value="SIGNUP"
                          className="btn btn-primary px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded"
                        >
              Sign Up
              </button>
                <div className="ml-4">
                <span className="text-gray-600">Already have an account?</span>
                <a className="text-blue-500 hover:underline" href="/login">
                Login
                </a>
                </div>
              </div>
            </form>
            </div>
          </div>

 
        </>
        :
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


{/* <div className="login-root">
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
</div> */}
