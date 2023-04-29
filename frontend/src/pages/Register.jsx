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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={name} onChange={handleInputData} />
                <input type="text" value={email} name='email' onChange={handleInputData} />
                <input type="password" name="password" value={password} onChange={handleInputData} />
                <button type="submit">register</button>
            </form>
        </div>
    );
}

export default Register;
