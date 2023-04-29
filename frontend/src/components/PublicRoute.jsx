import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { CookiesContext } from '../context/CookiesProvider';

const PublicRoute = ({ children }) => {
    const { cookies } = useContext(CookiesContext);
    const { token } = cookies;
    if (token) {
        return <Navigate to='/' />
    } else {
        return (
            children
        )
    }
}

export default PublicRoute