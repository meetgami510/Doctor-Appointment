import axiosInstance from '../../../utilities/axiosInstance';

const getdoctorAppointment = async (token) => {
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
            message: 'some thing went wrong'
        }
    }
}

const doctorSlotbooking = async (token, timeSlot) => {
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
            message: 'some thing went wrong'
        }
    }

}

const updateDoctorappointmentstatus = async (token, record, status) => {
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
                updateStatus : status
            }
        } else {
            return {
                type : "data",
                message: res.data.message
            }
            
        }
    } catch (error) {
        return {
            type : "data",
            message:"some thing went wrong"
        }
    }
}

const updateProfessional = async (token, values) => {
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
                type : 'error',
                message: res.data.message
            }
            
        } else {
            
            return {
                type : 'data',
                updateList : res.data.doctor,
                message : res.data.message
            }

        }
    }catch(error){
        return {
            type : 'error',
            message : "Server Error"
        }
    }
}

export { getdoctorAppointment, doctorSlotbooking ,updateDoctorappointmentstatus,updateProfessional}