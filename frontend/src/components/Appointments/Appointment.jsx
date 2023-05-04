import React, { useContext, useState } from "react";
import { CookiesContext } from "../../context/CookiesProvider";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading } from "../../redux/features/alertSlice";
import '../../styles/Appointment.css'
import ShowDetails from "./ShowDetails";
function Appointment({ appointment, axiosInstance, isDoctor }) {
    const { cookies } = useContext(CookiesContext);
    const dispatch = useDispatch();

    const [editModalShow, setEditModalShow] = React.useState(false);
    const [currentItem,setCurrentItem] = React.useState(false);
    const [appointmentStatus, setAppointmentStatus] = useState(
        appointment.status
    );
    console.log(appointment);
    const handleStatus = async (record, status) => {
        const { token } = cookies;
        try {
            const res = await axiosInstance.post(
                "/doctor/update-appointment-status",
                {
                    appointmentId: record._id,
                    status,
                },
                {
                    headers: {
                        authorization: "Bearer " + token,
                    },
                }
            );
            if (res.data.success) {
                message.success(res.data.message);
                setAppointmentStatus(status);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error("some thing went wrong");
        }
    };

    return (
        <>
            <tr key={appointment._id} className="font-size-14">
                <td scope="row">{isDoctor ? (appointment.user.firstName + " " + appointment.user.lastName) : (appointment.doctor.firstName + " " + appointment.doctor.lastName)}</td>
                <td scope="row">{appointment.date}</td>
                <td scope="row">{appointment.time}</td>
                <td scope="row">
                    {isDoctor && appointmentStatus === "pending" ? (
                        <div className="d-flex">
                            <button
                                className="btn btn-success"
                                onClick={() => handleStatus(appointment, "approved")}
                            >
                                Approved
                            </button>
                            <button
                                className="btn btn-danger ms-2"
                                onClick={() => handleStatus(appointment, "reject")}
                            >
                                Reject
                            </button>
                        </div>
                    ) : appointmentStatus}
                </td>
                <td scope="col" style={{ cursor: "pointer", padding: "10px" }} onClick={() => { setEditModalShow(true); setCurrentItem(appointment); }} > <i style={{ fontSize: "13px", color: "#0077b6" }} class="fas fa-edit"></i> </td>
                <ShowDetails show={editModalShow} onHide={() => setEditModalShow(false)} data={appointment} />
            </tr>
        </>
        // <div key={appointment._id}>
        //     <span>{appointment.user.name}</span> &nbsp;
        //     <span>{appointment.date}</span> &nbsp;
        //     <span>{appointment.time}</span> &nbsp;
        // {appointmentStatus === "pending" ? (
        //     <div className="d-flex">
        //         <button
        //             className="btn btn-success"
        //             onClick={() => handleStatus(appointment, "approved")}
        //         >
        //             Approved
        //         </button>
        //         <button
        //             className="btn btn-danger ms-2"
        //             onClick={() => handleStatus(appointment, "reject")}
        //         >
        //             Reject
        //         </button>
        //     </div>
        // ) : appointmentStatus}
        // </div>
    );
}

export default Appointment;
