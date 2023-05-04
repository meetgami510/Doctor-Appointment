import React, { useContext, useEffect, useState } from 'react'
import { hideLoading } from '../../redux/features/alertSlice';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { CookiesContext } from "../../context/CookiesProvider";
import Appointment from '../../components/Appointments/Appointment';
import Appointments from '../../components/Appointments/Appointments';

const DoctorAppointments = ({ axiosInstance }) => {
    const { removeCookies, cookies } = useContext(CookiesContext);
    const [appointments, setAppointments] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            try {
                const res = await axiosInstance.get('/doctor/appointments',
                    {
                        headers: {
                            authorization: 'Bearer ' + token
                        }
                    });
                if (res.data.success) {
                    message.success(res.data.message);
                    console.log(res.data.appointments);
                    setAppointments(res.data.appointments);
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
        <Appointments axiosInstance={axiosInstance} appointments={appointments} isDoctor={true} />
    )
}

export default DoctorAppointments