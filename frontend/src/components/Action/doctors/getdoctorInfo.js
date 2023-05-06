import axiosInstance from '../../../utilities/axiosInstance';

const getallDoctorInfo = async (token) => {
    try {
        
        const res = await axiosInstance.get(`/doctor/getDoctorInfo`,
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        
       
        if (res.data.success) {
          return {
            type : "data",
            doctorList: res.data.doctor,
            timeSlot:res.data.doctor.timeSlot,
            message:res.data.message
          }
        } else {
          return {
            type: "error",
            message:res.data.message
          }
        }
      } catch (error) {
        return {
            type: "error",
            message:"has some error"
          }
      }
}


const getdoctorthroughid = async (token,params) => {
  try {
    console.log(params.doctorId);
    
    const res = await axiosInstance.post(
        "/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
            headers: {
                authorization: "Bearer " + token,
            },
        }
    );
    
    if (res.data.success) {
        
        return {
          type : 'data',
          message : res.data.message,
          doctorList: res.data.doctor,
          morningStart : res.data.doctor.timeSlot.morningStart,
          morningEnd : res.data.doctor.timeSlot.morningEnd,
          eveningStart : res.data.doctor.timeSlot.eveningStart,
          eveningEnd : res.data.doctor.timeSlot.eveningEnd
        }
        
    } else {
      return {
        type : 'error',
        message : res.data.message
      }
    }
} catch (error) {
    return {
      type : 'error',
      message:"some thing went wrong"
    }
}
}

export {getallDoctorInfo,getdoctorthroughid}
