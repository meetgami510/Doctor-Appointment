import axiosInstance from '../../utilities/axiosInstance';
import encryptData from '../../utilities/encryptData';


const updatePersonalData = async (token, values) => {
    try {
        const encryptedObj = encryptData(values);
        const res = await axiosInstance.post(
            "/user/update-personal-details",
            {
                encryptedObj,
            },
            {
                headers: {
                    authorization: 'Bearer ' + token
                }
            }
        );
        if (!res.data.success) {
            return {
                type: "error",
                message: res.data.message
            }

        } else {
            return {
                type: "data",
                message: res.data.message,
                userList: res.data.user
            }
        }

    } catch (error) {
        return {
            type: 'error',
            message: "some thing went wrong"
        }
    }
}

const getUserData = async (token) => {
    try {
        const res = await axiosInstance.get('/user/getUserData',
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        )
        if (res.data.success) {
            return {
                type: "data",
                userList: res.data.user
            }

        } else {
            return {
                type: "error",
                message: "Auth Fail"
            }
        }
    } catch (error) {
        return {
            type: "error",
            message: "Auth Fail"
        }
    }
}

const getAlldoctor = async (token) => {
    try {

        const res = await axiosInstance.get(
            '/user/getAllDoctor',
            {
                headers: {
                    authorization: 'Bearer ' + token
                }
            }
        );

        if (res.data.success) {
            return {
                type: 'data',
                message: res.data.message,
                doctorList: res.data.doctorList
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

const applyuserforDoctor = async (token,values,timeSlot,userid,file)=> {
    const response = await axiosInstance.post(
        "/user/apply-doctor",
        {
            ...values,
            timeSlot,
            user: userid,
            file,
        },
        {
            headers: {
                authorization: "Bearer " + token,
            },
        }
    );
    
    if (!response.data.success) {
        return {
            type: 'error',
            message: response.data.message
        }
    } else {
        return {
            type: 'data',
            message: response.data.message
        }

    }
}

export { updatePersonalData, getUserData, getAlldoctor ,applyuserforDoctor}