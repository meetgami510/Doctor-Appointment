import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { CookiesContext } from "../../context/CookiesProvider";
import { getAllguestuserData } from '../../Action/admin/getAllusersdata';
import UserList from '../../components/UserDetails/UserList';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const { removeCookies, cookies } = useContext(CookiesContext);
    const [userList, setUserList] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const { token } = cookies;
        const fetchData = async () => {
            dispatch(showLoading());
            const response = await getAllguestuserData(token);
            dispatch(hideLoading());
            if (response.type === 'data') {
                message.success(response.message);
                setUserList(response.guestList);
            } else {
                if (response.message.includes("authenitication is failed")) {
                    navigate('/')
                }
                message.error(response.type);
            }
        }
        fetchData();
        //eslint-disable-next-line
    }, []);


    return (
        <UserList userList={userList} />

    )
}

export default Users