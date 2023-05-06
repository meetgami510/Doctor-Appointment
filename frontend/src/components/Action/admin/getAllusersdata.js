import { message } from 'antd';
import axiosInstance from '../../../utilities/axiosInstance';


const getAlldoctorsData = async (token) => {
   
    try {
        
        const res = await axiosInstance.get('/admin/get-all-doctors', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        
        if (res.data.success) {
            return {
                type : 'data',
                doctorList : res.data.doctors,
                message:res.data.message
            }
            
        } else {
            return {
                type : 'error',
                message:res.data.message
            }
        }
    } catch (error) {
        return {
            type : 'error',
            message:"some thing is wrong"
        }
    }
}


const getAllguestuserData = async (token) => { 
    try {
        const res = await axiosInstance.get('/admin/get-all-users', 
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        );
        
        if (res.data.success) {
            return {
                type : "data",
                guestList : res.data.users,
                message : res.data.message
            }
        } else {
            return {
                type : "error",
                message: res.data.message
            }
        }
    } catch (error) {
        return {
            type : "error",
            message: "while fetching the data "
        }
    }
}


export {getAlldoctorsData,getAllguestuserData}