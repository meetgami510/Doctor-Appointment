import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import { hideLoading } from '../redux/features/alertSlice';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { CookiesContext } from '../context/CookiesProvider';
import Appointments from '../components/Appointments/Appointments';

const UserAppointments = ({ axiosInstance }) => {
    const [appointments, setAppointments] = useState([]);
    const { removeCookies, cookies } = useContext(CookiesContext);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            try {
                const res = await axiosInstance.get('/user/appointments',
                    {
                        headers: {
                            authorization: 'Bearer ' + token
                        }
                    });
                if (res.data.success) {
                    message.success(res.data.message);
                    console.log(res.data.appointments);
                    setAppointments(res.data.appointments)
                } else {
                    message.error(res.data.message);
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