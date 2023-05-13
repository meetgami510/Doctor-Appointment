import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { CookiesContext } from "../../context/CookiesProvider";
import { getAllguestuserData } from '../../components/Action/admin/getAllusersdata';
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

    // antD table col
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Doctor",
            dataIndex: "isDoctor",
            render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
        },
        // if admin press the block button then that particular user will be blocked
        {
            title: "Actions",
            dataIndex: "actions",
            render: (text, record) => (
                <div className="d-flex">
                    <button className="btn btn-danger">Block</button>
                </div>
            ),
        },
    ];

    return (
        <Layout removeCookies={removeCookies}>
            <h1 className="text-center m-2">Users List</h1>
            <Table columns={columns} dataSource={userList} />
        </Layout>
    )
}

export default Users