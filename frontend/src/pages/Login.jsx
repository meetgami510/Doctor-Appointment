import { useContext, useState } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { CookiesContext } from "../context/CookiesProvider";
import Layout from "../components/Layout/Layout";

const Login = ({ instance }) => {
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
            const res = await instance.post('/user/login', { email, password });
            dispatch(hideLoading());
            console.log(res.data);
            if (res.data.success) {
                setCookies('token', res.data.token);
                alert('registerd successfully!');
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
        <Layout>
            <form onSubmit={handleSubmit}>
                <input type="text" value={email} name='email' onChange={handleInputData} />
                <input type="password" name="password" value={password} onChange={handleInputData} />
                <button type="submit">login</button>
            </form>
        </Layout>
    )
}

export default Login;