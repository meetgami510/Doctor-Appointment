import React, { useContext } from "react";
import "../../styles/LayoutStyles.css";
import { adminMenu, userMenu, doctorMenu } from "./data";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../redux/features/userSlice";
import { Badge } from "antd";
import { CookiesContext } from "../../context/CookiesProvider";
import Spinner from "../Spinner";

const Layout = ({ children }) => {

    const { loading } = useSelector(state => state.alerts);
    const { removeCookies } = useContext(CookiesContext);
    const { user } = useSelector((state) => state.user);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        removeCookies('token');
        dispatch(setUser(null));
        navigate('/login');
    }

    const sidebarMenu = user?.isAdmin
        ? adminMenu
        : user?.isDoctor
            ? doctorMenu
            : userMenu;
    console.log(user)
    return (
        <>
            <div className="main">
                <div className="layout">
                    <div className="sidebar">
                        <div className="logo">
                            <h6>DOC APP</h6>
                            <hr />
                        </div>
                        <div className="menu">
                            {sidebarMenu.map((menu, key) => {
                                const isActive = location.pathname === menu.path;
                                return (
                                    // <>
                                    <div key={key} className={`menu-item ${isActive && "active"}`}>
                                        <i className={menu.icon}></i>
                                        <Link to={menu.path}>{menu.name}</Link>
                                    </div>
                                    // </>
                                );
                            })}
                            <div className={`menu-item `} onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <Link to="/login">Logout</Link>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        <div className="header">
                            <div className="header-content" style={{ cursor: 'pointer' }}>
                                <Link to="/profile">{user?.firstName + " " + user?.lastName}</Link>
                                <Badge
                                    count={user && user.notifications.length}
                                    onClick={() => {
                                        navigate('/notification')
                                    }}>
                                    <i className="fa-solid fa-bell"></i>
                                </Badge>

                            </div>
                        </div>
                        <div className="body">
                            {loading ? <Spinner /> : <>{children}</>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Layout;