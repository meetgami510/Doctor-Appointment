import axiosInstance from "../../utilities/axiosInstance";

export const updateDoctorTimeSlot = async (token, timeSlot) => {
    try {
        const res = await axiosInstance.post("/doctor/sloat-booking", { timeSlot },
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
            message: 'server error please try again'
        }
    }

}


export const updateProfessional = async (token, values) => {
    try {

        const res = await axiosInstance.post(
            "/doctor/update-professional-details",
            {
                ...values,
            },
            {
                headers: {
                    authorization: 'Bearer ' + token
                }
            }
        );

        if (!res.data.success) {
            return {
                type: 'error',
                message: res.data.message
            }
        } else {
            return {
                type: 'data',
                updateList: res.data.doctor,
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

