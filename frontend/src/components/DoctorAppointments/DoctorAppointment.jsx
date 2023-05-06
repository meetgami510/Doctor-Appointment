import React, { useContext, useState } from "react";
import { CookiesContext } from "../../context/CookiesProvider";
import { useDispatch } from "react-redux";
import { message } from "antd";

import { hideLoading,showLoading } from "../../redux/features/alertSlice";
import ViewDoctor from "./ViewDoctor";
import { doctorStatus } from "../Action/admin/usersStatus";

const DoctorAppointment = ({doctor,axiosInstance}) => {
    const [appointmentStatus, setAppointmentStatus] = useState(
        doctor.status
    );
    const { cookies } = useContext(CookiesContext);
    const dispatch = useDispatch();

    const [editModalShow, setEditModalShow] = React.useState(false);
    const [currentItem, setCurrentItem] = React.useState(false);

    console.log(doctor);

    const handleAccountStats = async (doctorId, status) => {
        const { token } = cookies;
        try {
            dispatch(showLoading());
            const responce = await doctorStatus(token,doctorId,status);

            dispatch(hideLoading());
            if (responce.type === 'data') {
                message.success(responce.message);
                window.location.reload();
            } else {
                message.error(responce.message);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error('some thing went wrong');
        }
    }
  return (
    <>
        <tr key={doctor._id} className="font-size-14">
            <td scope="row">Raj</td>
            <td scope="row">raj@gmail.com</td>
            <td scope="row">13-05-2003</td>
            <td scope="row">
                    { appointmentStatus === "pending" ? (
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
            <td scope="col" style={{ cursor: "pointer", padding: "10px" }} onClick={() => { setEditModalShow(true); setCurrentItem(doctor); }} > <i style={{ fontSize: "13px", color: "#0077b6" }} class="fas fa-edit"></i> </td>
            <ViewDoctor show={editModalShow} onHide={() => setEditModalShow(false)} appointmentStatus={appointmentStatus} doctor={doctor} />           

        </tr>
    </>
  )
}

export default DoctorAppointment