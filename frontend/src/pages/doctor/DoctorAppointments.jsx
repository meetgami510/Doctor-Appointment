import React, { useContext, useEffect, useState } from 'react'
import { hideLoading } from '../../redux/features/alertSlice';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import moment from "moment";
import { CookiesContext } from "../../context/CookiesProvider";
import Appointment from './Appointment';

const DoctorAppointments = ({ axiosInstance }) => {
    const { removeCookies, cookies } = useContext(CookiesContext);
    const [appointments, setAppointments] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            try {
                const res = await axiosInstance.get('/doctor/doctor-appointments',
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
        <Layout removeCookies={removeCookies}>
            <h1>Appointment Lists</h1>
            {
                appointments.map((appointment) => (
                    <Appointment appointment={appointment} axiosInstance={axiosInstance} />
                ))
            }
        </Layout>
    )
}

export default DoctorAppointments