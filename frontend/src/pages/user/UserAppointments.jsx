import React, { useState, useEffect, useContext } from 'react';
import Layout from '../../components/Layout/Layout';
import { hideLoading } from '../../redux/features/alertSlice';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { CookiesContext } from '../../context/CookiesProvider';
import Appointments from '../../components/Appointments/Appointments';
import { getUserAppointments } from '../../Action/users/bookingappointment';
import { useNavigate } from 'react-router-dom';

const UserAppointments = ({ axiosInstance }) => {
    const [appointments, setAppointments] = useState([]);
    const { cookies } = useContext(CookiesContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            const response = await getUserAppointments(token);
            if (response.type === 'data') {
                message.success(response.message);
               
                setAppointments(response.appointmentsList)
            } else {
                if (response.message.includes("authenitication is failed")) {
                    navigate('/')
                }
                message.error(response.message);
            }
        }
        fetchData();
        //eslint-disable-next-line
    }, []);

    return (

        <Appointments axiosInstance={axiosInstance} appointments={appointments} isDoctor={false} />

    )
}

export default UserAppointments