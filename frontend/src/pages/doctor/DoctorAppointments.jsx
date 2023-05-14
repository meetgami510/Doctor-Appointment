import React, { useContext, useEffect, useState } from 'react'
import { hideLoading } from '../../redux/features/alertSlice';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import Layout from '../../components/Layout/Layout';
import { CookiesContext } from "../../context/CookiesProvider";
import Appointment from '../../components/Appointments/Appointment';
import Appointments from '../../components/Appointments/Appointments';
import { getdoctorAppointment } from '../../Action/doctors/appointment';
import { useNavigate } from 'react-router-dom';

const DoctorAppointments = ({ axiosInstance }) => {
    const { cookies } = useContext(CookiesContext);
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            const response = await getdoctorAppointment(token);
            if (response.type === 'data') {
                message.success(response.message);
                
                setAppointments(response.appointmentList);
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
        <Appointments axiosInstance={axiosInstance} appointments={appointments} isDoctor={true} />
    )
}

export default DoctorAppointments