import React, { useContext, useEffect } from 'react'
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, message } from 'antd';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/features/userSlice';
import { CookiesContext } from '../../context/CookiesProvider';
import { deletAllNotifications, getAllNotifications } from '../../Action/users/bookingappointment';

const Notification = ({ axiosInstance }) => {
    const { removeCookies, cookies } = useContext(CookiesContext);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    
    
    const handleMarkAllRead = async () => {
        console.log('ere')
        try {
            const { token } = cookies;
            dispatch(showLoading());

            const responce = await getAllNotifications(token);

            dispatch(hideLoading());

            if (responce.type === 'data') {
                message.success(responce.message);
                
                dispatch(setUser(responce.userList))
            } else {
                message.error(responce.message);
            }
        } catch (error) {
            
            dispatch(hideLoading());
            message.error('some thing went wrong');
        }
    }
    const handleDeleteAllRead = async () => {
        
        try {
            const { token } = cookies;
            dispatch(showLoading());

            const responce = await deletAllNotifications(token);

            dispatch(hideLoading());
            if (responce.type === 'data') {
                message.success(responce.message);
                console.log(responce.userList)
                dispatch(setUser(responce.userList))
            } else {
                message.error(responce.message);
            }
        } catch (error) {
           
            dispatch(hideLoading());
            message.error('some thing went wrong');
        }
    }
    return (
        <Layout removeCookies={removeCookies}>
            <h4 className="p-3 text-center">Notification Page</h4>
            <Tabs>
                <Tabs.TabPane tab="unRead" key={0}>
                    <div className="d-flex justify-content-end">
                        {
                            user?.notifications.length !== 0 ?
                                <h4 className="p-2" onClick={handleMarkAllRead}>
                                    Mark All Read
                                </h4>
                                :
                                <h4 className="p-2">
                                    no notifications
                                </h4>
                        }
                    </div>
                    {
                        user?.notifications.map((notificationMgs, ind) => (
                            <div key={ind} className="card" style={{ cursor: "pointer" }}>
                                <div
                                    className="card-text"
                                    onClick={() => navigate(notificationMgs.data.onClickPath)}
                                >
                                    {notificationMgs.message}
                                </div>
                            </div>
                        ))
                    }
                </Tabs.TabPane>
                <Tabs.TabPane tab="Read" key={1}>
                    <div className="d-flex justify-content-end">
                        {
                            user?.seennotifications.length !== 0 ?
                                <h4 className="p-2" onClick={handleDeleteAllRead}>
                                    Delete All Read
                                </h4>
                                :
                                <h4 className="p-2" >
                                    no notifications
                                </h4>
                        }
                    </div>

                    {user?.seennotifications.map((notificationMgs, ind) => {
                        console.log(notificationMgs);
                        return (
                            <div key={ind} className="card" style={{ cursor: "pointer" }}>
                                <div
                                    className="card-text"
                                    onClick={() => navigate(notificationMgs.data.onClickPath)}
                                >
                                    {notificationMgs.message}
                                </div>
                            </div>)
                    })}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    )
}

export default Notification