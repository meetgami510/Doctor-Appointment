import axiosInstance from '../../../utilities/axiosInstance';

const updatePersonalData = async (token, values) => {
    try {
        const res = await axiosInstance.post(
            "/user/update-personal-details",
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
            type: 'data',
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

export { updatePersonalData, getUserData, getAlldoctor }