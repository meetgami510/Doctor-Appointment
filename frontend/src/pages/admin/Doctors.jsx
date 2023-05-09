import React, { useContext, useEffect, useState } from 'react';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { CookiesContext } from "../../context/CookiesProvider";
import AllDoctors from '../../components/DoctorDetails/DoctorList';
import { getAlldoctorsData } from '../../components/Action/admin/getAllusersdata';

const Doctors = ({ axiosInstance }) => {
    const { cookies } = useContext(CookiesContext);
    const [doctorList, setDoctorList] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const { token } = cookies;
        const fetchData = async () => {
            dispatch(showLoading());
            const responce = await getAlldoctorsData(token);
            dispatch(hideLoading());
            if (responce.type === 'data') {
                message.success(responce.message);
                setDoctorList(responce.doctorList);
            } else {
                message.error(responce.message);
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