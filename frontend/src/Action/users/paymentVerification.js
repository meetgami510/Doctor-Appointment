import axiosInstance from '../../utilities/axiosInstance';
import encryptData from '../../utilities/encryptData';

export const userPaymentRequest = async (token, doctorFee) => {

    try {
        const { data: { data: order } } = await axiosInstance.post("/user/orders", { amount: doctorFee * 100, currency: 'INR', payment_capture: 1 },
            {
                headers: {
                    authorization: "Bearer " + token,
                },
            });

        return {
            type: 'data',
            amount: order.amount,
            id: order.id
        }
    } catch (error) {
        return {
            type: 'data',
            message: "server error on Payment"
        }
    }

}


export const userPaymentVerify = async (token, paymentId) => {

    try {
        const verificationResponse = await axiosInstance.post('/user/verify', {
            razorpay_payment_id: paymentId
        },
            {
                headers: {
                    authorization: "Bearer " + token,
                },
            }
        );

        if (verificationResponse.data.success) {
            return {
                type: "data",
                message: "verifiy Succefully"
            }
        } else {
            return {
                type: 'error',
                message: "verify is not succeffuly"
            }
        }

    } catch (error) {
        return {
            type: 'error',
            message: "server error on Payment"
        }
    }

}

export const vidoeMeetingLink = async (token, roomId) => {
    try {
        const response = await axiosInstance.post('/user/verify-video-meeting-id', { roomId },
            {
                headers: {
                    authorization: "Bearer " + token,
                },
            });
        console.log(response);
        if (false === response.data.success) {
            return {
                type: 'error',
                message: "verify is not succeffuly"
            }
        } else {
            return {
                type: "data",
                message: "meeting is verified",
            }
        }

    } catch (error) {
        return {
            type: 'error',
            message: "server error on Payment"
        }
    }
}