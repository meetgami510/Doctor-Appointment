import axiosInstance from '../../utilities/axiosInstance';

const doctorStatus = async (token, doctorId, status) => {
    try {
        const res = await axiosInstance.post('/admin/change-account-status', {
            doctorId,
            status
        }, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        if (res.data.success) {
            return {
                type: "data",
                doctorList: res.data.user,
                message: res.data.message
            }
        } else {
            return {
                type: "error",
                message: res.data.message
            }
        }
    } catch (error) {
        console.log(error);
        return {
            type: "error",
            message: "server Error please try again"
        }
    }
}

export { doctorStatus }