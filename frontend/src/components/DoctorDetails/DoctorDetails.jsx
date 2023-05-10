import React, { useContext, useState } from "react";
import { CookiesContext } from "../../context/CookiesProvider";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import ViewDoctor from "./ViewDoctor";
import { doctorStatus } from "../Action/admin/usersStatus";

const DoctorAppointment = ({ doctor }) => {
    const [appointmentStatus, setAppointmentStatus] = useState(doctor.status);
    const { cookies } = useContext(CookiesContext);
    const dispatch = useDispatch();
    
    const [editModalShow, setEditModalShow] = React.useState(false);

    const handleAccountStats = async (doctorId, status) => {
        const { token } = cookies;
        dispatch(showLoading());
        const responce = await doctorStatus(token, doctorId, status);
        dispatch(hideLoading());
        if (responce.type === 'data') {
            message.success(responce.message);
            setAppointmentStatus(status);
        } else {
            message.error(responce.message);
        }
    }
    return (
        <>
            <tr key={doctor._id} className="font-size-14">
                <td >{doctor.user.firstName + " " + doctor.user.lastName}</td>
                <td >{doctor.user.email}</td>
                <td >{}</td>
                <td >
                    {appointmentStatus === "pending" ? (
                        <div className="d-flex">
                            <button
                                className="btn btn-success"
                                onClick={() => handleAccountStats(doctor._id, "approved")}
                            >
                                Approved
                            </button>
                            <button
                                className="btn btn-danger ms-2"
                                onClick={() => handleAccountStats(doctor._id, "reject")}
                            >
                                Reject
                            </button>
                        </div>
                    ) : appointmentStatus}
                </td>
                <td style={{ cursor: "pointer", padding: "10px" }} onClick={() => { setEditModalShow(true); }} > <i style={{ fontSize: "13px", color: "#0077b6" }} className="fas fa-edit"></i> </td>

                <ViewDoctor show={editModalShow} onHide={() => setEditModalShow(false)} appointmentStatus={appointmentStatus} doctor={doctor} />
            </tr>
        </>
    )
}

export default DoctorAppointment