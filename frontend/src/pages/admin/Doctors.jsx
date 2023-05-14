import React, { useContext, useEffect, useState } from 'react';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { CookiesContext } from "../../context/CookiesProvider";
import AllDoctors from '../../components/DoctorDetails/DoctorList';
import { getAlldoctorsData } from '../../Action/admin/getAllusersdata';
import { useNavigate } from 'react-router-dom';

const Doctors = ({ axiosInstance }) => {
    const { cookies } = useContext(CookiesContext);
    const [doctorList, setDoctorList] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const { token } = cookies;
        const fetchData = async () => {
            dispatch(showLoading());
            const response = await getAlldoctorsData(token);
            dispatch(hideLoading());
            if (response.type === 'data') {
                message.success(response.message);
                setDoctorList(response.doctorList);
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
        <AllDoctors  doctorList={doctorList} />
    )
}

export default Doctors