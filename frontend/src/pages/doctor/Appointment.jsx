import React, { useContext, useState } from 'react'
import { CookiesContext } from '../../context/CookiesProvider';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { hideLoading } from '../../redux/features/alertSlice';

function Appointment({ appointment, axiosInstance }) {
    const { cookies } = useContext(CookiesContext);
    const dispatch = useDispatch();
    const [appointmentStatus, setAppointmentStatus] = useState(appointment.status)

    const handleStatus = async (record, status) => {
        const { token } = cookies;
        try {
            const res = await axiosInstance.post('/doctor/update-appointment-status',
                {
                    appointmentId: record._id,
                    status
                },
                {
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                });
            if (res.data.success) {
                message.success(res.data.message);
                setAppointmentStatus(status);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error('some thing went wrong');
        }
    }

    return (
        <div key={appointment._id}>
            <span>{appointment.user.name}</span> &nbsp;
            <span>{appointment.date}</span> &nbsp;
            <span>{appointment.time}</span> &nbsp;
            {appointmentStatus === "pending" ? (
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
        </div>
    )
}

export default Appointment