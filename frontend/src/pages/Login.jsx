import { useContext, useState } from "react"
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { CookiesContext } from "../context/CookiesProvider";
import Layout from "../components/Layout/Layout";
import '../styles/Login.css'

const Login = ({ axiosInstance }) => {
    const { setCookies } = useContext(CookiesContext);
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
            const res = await axiosInstance.post('/user/login', { email, password });
            dispatch(hideLoading());
            console.log(res.data);
            if (res.data.success) {
                setCookies('token', res.data.token);
                alert('Login successfully!');
                navigate('/')
            } else {
                alert(res.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            console.log(error);
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
                      <div class="form-group padding-bottom--24">
                        <label for="email">Email</label>
                        <input
                          type="email"
                          name="email"
                          class="form-control"
                          value={email}
                          onChange={handleInputData}
                          required
                        />
                      </div>
  
                      <div class="form-group padding-bottom--24">
                        <label for="password">Password</label>
  
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
                            "background-color": "rgb(84, 105, 212)",
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
      </>

    )
}

export default Login;

{/* <>
<form onSubmit={handleSubmit}>
    <input type="text" value={email} name='email' onChange={handleInputData} />
    <input type="password" name="password" value={password} onChange={handleInputData} />
    <button type="submit">login</button>
</form>
<Link to="/register" className="m-2">Not Registered Yet?</Link>
</> */}