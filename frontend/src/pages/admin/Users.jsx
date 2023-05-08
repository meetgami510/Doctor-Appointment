import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { Table, message } from 'antd';
import { useDispatch } from 'react-redux';
import { CookiesContext } from "../../context/CookiesProvider";
import { getAllguestuserData } from '../../components/Action/admin/getAllusersdata';

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