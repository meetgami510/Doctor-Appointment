import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { CookiesContext } from "../../context/CookiesProvider";
import { getAllguestuserData } from '../../components/Action/admin/getAllusersdata';
import UserList from '../../components/UserDetails/UserList';

const Users = () => {
    const { removeCookies, cookies } = useContext(CookiesContext);
    const [userList, setUserList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const { token } = cookies;
        const fetchData = async () => {
            dispatch(showLoading());
            const responce = await getAllguestuserData(token);
            dispatch(hideLoading());
            if (responce.type === 'data') {
                message.success(responce.message);
                setUserList(responce.guestList);
            } else {
                message.error(responce.type);
            }
        }
        fetchData();
        //eslint-disable-next-line
    }, []);



    return (
            <UserList  userList={userList} />
        
    )
}

export default Users