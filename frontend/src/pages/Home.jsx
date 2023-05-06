import React, { useContext, useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { Row, message } from 'antd';
import { useDispatch } from 'react-redux';
import DoctorList from '../components/DoctorList';
import { CookiesContext } from '../context/CookiesProvider';
import { getAlldoctor } from '../components/Action/users/getGuestUsers';

const Home = ({ axiosInstance }) => {
    const { cookies } = useContext(CookiesContext);
    const [doctors, setDoctors] = useState(null)
    const dispatch = useDispatch();

    // get user data
    useEffect(() => {
        const { token } = cookies;
        const getDoctorData = async () => {
            try {
                dispatch(showLoading());
                const responce = await getAlldoctor(token);

                dispatch(hideLoading());
                if (responce.type === 'data') {
                    message.success(responce.message);
                    console.log(responce.doctorList)
                    setDoctors(responce.doctorList);
                } else {
                    message.error(responce.message);
                }
            } catch (error) {
                console.log(error);
                dispatch(hideLoading());
                message.error('some thing went wrong');
            }
        }
        getDoctorData();
        //eslint-disable-next-line
    }, [cookies])

    return (
        <Layout>
            <h1 className="text-center">Home Page</h1>
            <Row>
                {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} key={doctor._id} />)}
            </Row>
        </Layout>
    );
}

export default Home;

