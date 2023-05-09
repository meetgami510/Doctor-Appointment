import axiosInstance from '../../../utilities/axiosInstance';

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
            type: "data",
            message: "server error please try again"
        }
    }
}
