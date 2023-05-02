import React, { useState, useEffect, useContext } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { hideLoading } from '../redux/features/alertSlice';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import moment from "moment";
import { CookiesContext } from '../context/CookiesProvider';

const Appointments = ({ axiosInstance }) => {
    const [appointments, setAppointments] = useState([]);
    const { removeCookies, cookies } = useContext(CookiesContext);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const { token } = cookies;
            try {
                const res = await axiosInstance.get('/user/user-appointment',
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

    const columns = [
        {
            title: "ID",
            dataIndex: "_id",
        },
        {
            title: "Date & Time",
            dataIndex: "date",
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")} &nbsp;
                    {moment(record.time).format("HH:mm")}
                </span>
            ),
        },
        {
            title: "Status",
            dataIndex: "status",
        },
    ];

    return (
        <Layout removeCookies={removeCookies}>
            <h1>Appointment Lists</h1>
            <Table columns={columns} dataSource={appointments} />
        </Layout>
    )
}

export default Appointments