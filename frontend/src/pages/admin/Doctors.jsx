import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { CookiesContext } from "../../context/CookiesProvider";
import AllDoctors from '../../components/DoctorAppointments/AllDoctors';
import { getAlldoctorsData } from '../../components/Action/admin/getAllusersdata';
import { doctorStatus } from '../../components/Action/admin/usersStatus';


const Doctors = ({ axiosInstance }) => {
    const { removeCookies, cookies } = useContext(CookiesContext);
    const [doctorList, setDoctorList] = useState([]);

    const dispatch = useDispatch();

    // const handleAccountStats = async (doctorId, status) => {
    //     const { token } = cookies;
    //     try {
    //         dispatch(showLoading());
    //         const responce = await doctorStatus(token,doctorId,status);

    //         dispatch(hideLoading());
    //         if (responce.type === 'data') {
    //             message.success(responce.message);
    //             window.location.reload();
    //         } else {
    //             message.error(responce.message);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         dispatch(hideLoading());
    //         message.error('some thing went wrong');
    //     }
    // }

    useEffect(() => {
        const { token } = cookies;
        const fetchData = async () => {
            try {
                dispatch(showLoading());

                const responce = await getAlldoctorsData(token);
                
                dispatch(hideLoading());
                if (responce.type === 'data') { 
                    message.success(responce.message);
                    setDoctorList(responce.doctorList);
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
    
        <AllDoctors axiosInstance={axiosInstance} doctorList={doctorList} />
    )
}

export default Doctors