import { useContext, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import { CookiesContext } from "../context/CookiesProvider";
import { message } from "antd";
import '../styles/Login.css'
import Spinner from "../components/Spinner";

import CryptoJS from 'crypto-js';
import { loginUsers } from "../Action/users/loginandregister";
const secretKey = process.env.REACT_APP_SECRET_KEY;


const Login = () => {
  const { setCookies } = useContext(CookiesContext);

  const { loading } = useSelector(state => state.alerts);
  const [userData, setUserData] = useState({ email: '', password: '' });

  const handleInputData = (event) => {
    const { name, value } = event.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  }

  const { email, password } = userData;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(showLoading());

      const response = await loginUsers(email,password);

      if(response.type === 'data') {
        dispatch(hideLoading());
        setCookies('token', response.token);
        message.success(response.message);
        navigate('/')
      }else{
        dispatch(hideLoading());
        navigate('/')
        alert(response.message);
      }
      // const objStr = JSON.stringify({ email, password });
      // const encryptedObj = CryptoJS.AES.encrypt(objStr, secretKey).toString();
      // const res = await axiosInstance.post('/user/login', { encryptedObj });
      // dispatch(hideLoading());
      // console.log(res.data);
      // if (res.data.success) {
      //   setCookies('token', res.data.token);
      //   alert('Login successfully!');
      //   navigate('/')
      // } else {
      //   alert(res.data.message);
      // }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      alert('some thing went wrong');
    }
  }
  return (
    <>
      {
        loading ?
          <Spinner /> :
          <div className="login-root">
            <div
              className="box-root flex-flex flex-direction--column"
              style={{ minHeight: "100vh", flexGrow: 1 }}
            >
              <div
                className="box-root padding-top--24 flex-flex flex-direction--column"
                style={{ flexGrow: 1, zIndex: 9 }}
              >
                <div className="box-root padding-top--48 padding-bottom--24 flex-flex flex-justifyContent--center">
                  <h2>
                    <a>Login to your account</a>
                  </h2>
                </div>
                <div className="formbg-outer">
                  <div className="formbg">
                    <div className="formbg-inner padding-horizontal--48">
                      {/* <span className="padding-bottom--15">Sign in to your account</span>  */}
                      <form id="stripe-login" onSubmit={handleSubmit}>
                        <div className="form-group padding-bottom--24">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={email}
                            onChange={handleInputData}
                            required
                          />
                        </div>

                        <div className="form-group padding-bottom--24">
                          <label htmlFor="password">Password</label>

                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={password}
                            onChange={handleInputData}
                            required
                          />
                          <div className="reset-pass">
                            <a href="#">Forgot your password?</a>
                          </div>
                        </div>

                        <div>
                          <input
                            type="submit"
                            name="submit"
                            value="LOGIN"
                            className="btn btn-primary"
                            style={{
                              width: "100%",
                              "backgroundColor": "rgb(84, 105, 212)",
                            }}
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="footer-link padding-top--24">
                    <span>
                      Don't have an account? <a href="/register">Sign up</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
      }
    </>

  )
}

export default Login;