import React, { useContext, useEffect, useState } from 'react'
import { hideLoading } from '../../redux/features/alertSlice';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { CookiesContext } from "../../context/CookiesProvider";
import Appointment from '../../components/Appointments/Appointment';
import Appointments from '../../components/Appointments/Appointments';
import { getdoctorAppointment } from '../../components/Action/doctors/appointment';

const DoctorAppointments = ({ axiosInstance }) => {
    const { removeCookies, cookies } = useContext(CookiesContext);
    const [appointments, setAppointments] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            const responce = await getdoctorAppointment(token);
            if (responce.type === 'data') {
                message.success(responce.message);
                console.log(responce.appointmentList);
                setAppointments(responce.appointmentList);
            } else {
                message.error(responce.message);
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