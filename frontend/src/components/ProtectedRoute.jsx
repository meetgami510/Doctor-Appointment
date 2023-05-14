import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';
import { CookiesContext } from '../context/CookiesProvider';
import { getUserData } from '../Action/users/getGuestUsers';

const ProtectedRoute = ({ children, axiosInstance }) => {
    const { removeCookies, cookies } = useContext(CookiesContext);
    const { token } = cookies;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            try {
                if (token) {
                    dispatch(showLoading());
                    const responce = await getUserData(token);
                    dispatch(hideLoading());
                    if (responce.type === 'data') {
                        dispatch(setUser(responce.userList));
                    } else {
                        removeCookies('token');
                        navigate('/login');
                    }
                } else {
                    removeCookies('token');
                    navigate('/login');
                }
            } catch (error) {
                removeCookies('token');
                dispatch(hideLoading());
            }
        }
        if (!user)
            getUser();
        //eslint-disable-next-line
    }, [dispatch, navigate, removeCookies, token, user])

    if (token) {
        return (
            children
        )
    } else {
        return <Navigate to='/login' />
    }

}

export default ProtectedRoute;