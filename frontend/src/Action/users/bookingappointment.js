import axiosInstance from '../../utilities/axiosInstance';
import encryptData from '../../utilities/encryptData';

const userbooking = async (token, params, user, doctor, timingSlot, textfeelling, meetingMode) => {
    try {
        const encryptedObj = encryptData({
            doctorId: params.doctorId,
            userName: user.name,
            doctorUserId: doctor.user._id,
            userId: user._id,
            timingSlot,
            textfeelling,
            meetingMode,
        });
        const res = await axiosInstance.post(
            "/user/book-appointment",
            {
                encryptedObj
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
            message: "server error please try again"
        }
    }
}

const chechbookingAvalability = async (token, params, user, doctor, timingSlot, textfeelling, meetingMode) => {
    try {

        const res = await axiosInstance.post(
            "/user/booking-avalibility",
            {   doctorId: params.doctorId,
                userName: user.name,
                doctorUserId: doctor.user._id,
                userId: user._id,
                timingSlot,
                textfeelling,
                meetingMode, },
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
                _id:res.data._id,
                timerId : res.data.timerId
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
            message: "server error please try again"
        }
    }
}

const getAllNotifications = async (token) => {
    try {
        const res = await axiosInstance.get('/user/get-all-notification',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        );

        if (res.data.success) {
            return {
                type: 'data',
                message: res.data.message,
                userList: res.data.user
            }

        } else {
            return {
                type: 'data',
                message: res.data.message
            }
        }
    } catch (error) {
        return {
            type: 'data',
            message: 'some thing went wrong'
        }
    }
}

const deletAllNotifications = async (token) => {
    try {
        const res = await axiosInstance.delete('/user/delete-all-notification', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });

        if (res.data.success) {
            return {
                type: 'data',
                message: res.data.message,
                userList: res.data.user
            }
        } else {
            return {
                type: 'data',
                message: res.data.message
            }
        }
    } catch (error) {
        return {
            type: 'data',
            message: 'some thing went wrong'
        }
    }
}

const getUserAppointments = async (token) => {
    try {
        const res = await axiosInstance.get('/user/appointments',
            {
                headers: {
                    authorization: 'Bearer ' + token
                }
            });
        if (res.data.success) {
            return {
                type: 'data',
                message: res.data.message,
                appointmentsList: res.data.appointments
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
            message: 'some thing went wrong'
        }
    }
}


export { userbooking, chechbookingAvalability, getAllNotifications, deletAllNotifications, getUserAppointments } 