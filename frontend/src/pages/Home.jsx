import React, { useContext, useEffect, useRef, useState } from 'react';
import Layout from '../components/Layout/Layout';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { Row, message } from 'antd';
import { useDispatch } from 'react-redux';
import DoctorList from '../components/DoctorList';
import { CookiesContext } from '../context/CookiesProvider';
import { getAlldoctor } from '../components/Action/users/getGuestUsers';
import Fuse from "fuse.js";

const Home = ({ axiosInstance }) => {
    const { cookies } = useContext(CookiesContext);
    const [doctors, setDoctors] = useState(null)
    const dispatch = useDispatch();
    const fuse = useRef(null);

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
                    fuse.current = new Fuse(responce.doctorList, {
                        keys: ["specialization"],
                    });
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
    const [searchedDoctors, setSearchedDoctors] = useState([]);
    const [query, setQuery] = useState("");
    useEffect(() => {
        if (fuse.current) {
            if ("" !== query) {
                const result = fuse.current.search(query);
                const doctorList = []
                console.log(result)
                result.forEach((result) => {
                    doctorList.push(result.item);
                });
                setSearchedDoctors(doctorList);
            } else setSearchedDoctors(doctors);
        }
    }, [doctors, query]);

    return (
        <Layout>
            <h1 className="text-center">Home Page</h1>
            <input
                type="text"
                className="form-control "
                placeholder="Search Companies Here"
                aria-describedby="button-addon2"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
            />
            <Row>
                {searchedDoctors && searchedDoctors.map((doctor) => <DoctorList doctor={doctor} key={doctor._id} />)}
            </Row>
        </Layout>
    );
}

export default Home;

