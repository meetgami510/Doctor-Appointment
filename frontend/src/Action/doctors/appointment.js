import axiosInstance from '../../utilities/axiosInstance';

export const getdoctorAppointment = async (token) => {
    try {
        const res = await axiosInstance.get('/doctor/appointments',
            {
                headers: {
                    authorization: 'Bearer ' + token
                }
            });
        if (res.data.success) {
            return {
                type: 'data',
                appointmentList: res.data.appointments,
                message: res.data.message
            }
        } else {
            return {
                type: 'error',
                message: res.data.message
            }
        }
    } catch (error) {
        return {
            type: 'error',
            message: 'server error please try again'
        }
    }
}

export const updateDoctorappointmentstatus = async (token, record, status) => {
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
            return {
                type: 'data',
                message: res.data.message,
                updateStatus: status
            }
        } else {
            return {
                type: "data",
                message: res.data.message
            }
        }
    } catch (error) {
        return {
            type: "error",
            message: "server error please try again"
        }
    }
}


export const checkAppointment = async (token, appointmentInfoid) => {
    try {
        const res = await axiosInstance.post("/user/check-appointmentInfo", {
            appointmentInfoid
        }, {
            headers: {
                authorization: "Bearer " + token,
            },
        })
        console.log(res);
        if (res.data.success) {
            return {
                type: 'data',
                message: 'appointment get Succeffuley'
            }
        } else {
            return {
                type: 'error',
                message: "server error please try again"
            }
        }

    } catch (error) {
        return {
            type: 'error',
            message: "server error please try again"
        }
    }
}
