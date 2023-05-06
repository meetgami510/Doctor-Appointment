import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import { hideLoading } from '../redux/features/alertSlice';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { CookiesContext } from '../context/CookiesProvider';
import Appointments from '../components/Appointments/Appointments';
import { getUserAppointments } from '../components/Action/users/bookingappointment';

const UserAppointments = ({ axiosInstance }) => {
    const [appointments, setAppointments] = useState([]);
    const { removeCookies, cookies } = useContext(CookiesContext);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            try {
                const responce = await getUserAppointments(token);

                if (responce.type === 'data') {
                    message.success(responce.message);
                    console.log(responce.appointmentsList);
                    setAppointments(responce.appointmentsList)
                } else {
                    message.error(responce.message);
                }
            } catch (error) {
                console.log(error);
                dispatch(hideLoading());
                message.error('some thing went wrong');
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