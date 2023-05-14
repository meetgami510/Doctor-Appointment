import React, { useContext, useState } from "react";
import { CookiesContext } from "../../context/CookiesProvider";
import { useDispatch } from "react-redux";
import { message } from "antd";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import ViewDoctor from "./ViewDoctor";
import { doctorStatus } from "../../Action/admin/usersStatus";

const DoctorAppointment = ({ doctor }) => {
    const [accountStatus, setAccountmentStatus] = useState(doctor.status);
    const { cookies } = useContext(CookiesContext);
    const dispatch = useDispatch();

    const [editModalShow, setViewModalShow] = React.useState(false);

    const handleAccountStats = async (doctorId, status) => {
        const { token } = cookies;
        dispatch(showLoading());
        const response = await doctorStatus(token, doctorId, status);
        dispatch(hideLoading());
        if (response.type === 'data') {
            message.success(response.message);
            console.log(status)
            setAccountmentStatus(status);
        } else {
            message.error(response.message);
        }
    }
    return (
        <>
            <tr key={doctor._id} className="font-size-14">
                <td >{doctor?.user.firstName + " " + doctor?.user.lastName}</td>
                <td >{doctor?.user.email}</td>
                <td >{doctor.createdAt.substr(0, 10)}</td>
                <td >
                    {accountStatus === "pending" ? (
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
                    ) : accountStatus}
                </td>
                <td style={{ cursor: "pointer", padding: "10px" }} onClick={() => { setViewModalShow(true); }} > <i style={{ fontSize: "13px", color: "#0077b6" }} className="fa fa-eye"></i> </td>

                <ViewDoctor show={editModalShow} onHide={() => setViewModalShow(false)} appointmentStatus={accountStatus} doctor={doctor} />
            </tr>
        </>
    )
}

export default DoctorAppointment