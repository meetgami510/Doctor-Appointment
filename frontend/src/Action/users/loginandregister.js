import axiosInstance from '../../utilities/axiosInstance';
import encryptData from '../../utilities/encryptData';
import CryptoJS from 'crypto-js';
const secretKey = process.env.REACT_APP_SECRET_KEY;

export const loginUsers = async (email,password) => {
    try{
        const objStr = JSON.stringify({ email, password });
        const encryptedObj = CryptoJS.AES.encrypt(objStr, secretKey).toString();
        const res = await axiosInstance.post('/user/login', { encryptedObj });
        
        console.log(res.data);
        if (res.data.success) {
            return {
                type : 'data',
                token : res.data.token,
                message : 'Login Successfully'
            }
        } else {
            return {
                type : 'error',
                message : res.data.message
            }
        }
    }catch(error){
        return {
            type: 'error',
            message: "some thing went wrong"
        }
    }
}

export const sendOtpTouser = async (phoneNo) => {
    try{
        
        const { data: resp } = await axiosInstance.post('/user/send-otp', { contact: phoneNo });

        if (resp.success) {
            return {
                type : 'data',
                message : 'otp sent successfully'
            }
        } else {
            return {
                type: 'error',
                message: "server error please try again"
            }
          }
    }catch(error){
        return {
            type: 'error',
            message: "some thing went wrong"
        }
    }
}

export const verifyOtpofUser = async (phoneNo,otp) => {
    try{
        const { data: resp } = await axiosInstance.post('/user/verify-otp', { contact: phoneNo, otp });
        
        if (resp.success) {
            return {
                type : 'data',
                message : 'otp match successfully'
            }
        }else{
            return {
                type : 'error',
                message : "otp is not match"
            }
        }
    }catch(error){
        return {
            type: 'error',
            message: "some thing went wrong"
        }
    }
}

export const registerUsers = async (userData) => {
    try{
        const objStr = JSON.stringify({ user: userData });
        const encryptedObj = CryptoJS.AES.encrypt(objStr, secretKey).toString();
        const res = await axiosInstance.post('/user/register', { encryptedObj });
        
        if (res.data.success) {
            return {
                type : 'data',
                message : 'registerd successfully!'
            }
        } else {
            return {
                type : 'error',
                message : res.data.message
            }
        }
    }catch(error){
        return {
            type: 'error',
            message: "some thing went wrong"
        }
    }
}