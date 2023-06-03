import React, { useContext, useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import "../../styles/Bookingpage.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CookiesContext } from "../../context/CookiesProvider";
import { message } from "antd";
import moment from "moment";
import { getdoctorthroughid } from "../../Action/doctors/getDoctorDetails";
import { chechbookingAvalability, userbooking } from "../../Action/users/bookingappointment";
import axiosInstance from '../../utilities/axiosInstance';
import { userPaymentRequest, userPaymentVerify } from "../../Action/users/paymentVerification";
import { checkAppointment } from "../../Action/doctors/appointment";


const BookingPage = () => {
    const { removeCookies, cookies } = useContext(CookiesContext);
    const [doctor, setDoctor] = useState(null);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    console.log(moment().add(1, "day").format("YYYY-MM-DD"));

    const dispatch = useDispatch();
    const params = useParams();

    const [appointmentInfo, setAppointmentInfo] = useState({
        isAvailable: false,
        timingSlot: "",
        meetingMode: "offline",
        textfeelling: "",
    });

    const { isAvailable, timingSlot, meetingMode, textfeelling } =
        appointmentInfo;

    const morningSlots = useRef([]);
    const eveningSlots = useRef([]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setAppointmentInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    // get user data
    useEffect(() => {
        const { token } = cookies;
        const getDoctorData = async () => {
            dispatch(showLoading());
            const response = await getdoctorthroughid(token, params);
            dispatch(hideLoading());
            if (response.type === 'data') {
                message.success(response.message);
                setDoctor(response.doctorList);
                morningSlots.current = generateTimeSlots(
                    response.morningStart,
                    response.morningEnd
                );
                eveningSlots.current = generateTimeSlots(
                    response.eveningStart,
                    response.eveningEnd
                );
            } else {
                if (response.message.includes("authenitication is failed")) {
                    navigate('/')
                }
                message.error(response.message);
            }
        };
        getDoctorData();
        //eslint-disable-next-line
    }, [cookies]);

    const handleBooking = async () => {

        const { token } = cookies;
        try {
            if (!timingSlot) {
                return alert("date and time is required");
            }
            const resp = await checkAppointment(token, appointmentInfo._id);
            console.log(resp)
            if (resp.type === 'data') {
                const response = await userPaymentRequest(token, doctor.feesPerCunsaltation);
                const options = {
                    key: process.env.REACT_APP_Razorpay_key,
                    amount: response.amount,
                    currency: "INR",
                    name: 'Demo',
                    description: 'Test Payment',
                    image: 'https://avatars.githubusercontent.com/u/25058652?v=4',
                    order_id: response.id,
                    handler: async (response) => {

                        try {
                            const verificationResponse = await userPaymentVerify(token, response.razorpay_payment_id);
                            if (verificationResponse.type === 'data') {
                                dispatch(showLoading());
                                const response = await userbooking(token, params, user, doctor, timingSlot, textfeelling, meetingMode);
                                dispatch(hideLoading());
                                if (response.type === 'data') {
                                    message.success(response.message);
                                    navigate("/");
                                } else {
                                    message.error(response.message);
                                }
                            } else {
                                dispatch(hideLoading());
                                message.error(verificationResponse.message);
                            }
                        } catch (error) {

                            dispatch(hideLoading());
                            message.error("some thing went wrong");
                        }
                        // handle successful payment response
                    },
                    prefill: {
                        name: 'John Doe',
                        email: 'john.doe@example.com',
                        contact: '+919876543210'
                    },
                    notes: {
                        address: 'Razorpay Corporate Office'
                    },
                    theme: {
                        color: '#F37254'
                    }
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            }
        } catch (error) {
            dispatch(hideLoading());
            message.error("some thing went wrong");
        }
    };

    const checkAvailability = async (req, res) => {
        if ("" === timingSlot) {
            alert("please give time slot value");
            return;
        }
        const { token } = cookies;
        dispatch(showLoading());
        const response = await chechbookingAvalability(token, params, user, doctor, timingSlot, textfeelling, meetingMode)
        dispatch(hideLoading());
        if (response.type === 'data') {
            setAppointmentInfo((prevState) => ({
                ...prevState,
                isAvailable: true,
                _id: response._id,
                timerId: response.timerId
            }));
            message.success(response.message);
        } else {
            message.error(response.message);
        }
    };

    return (
        <Layout removeCookies={removeCookies}>
            <h3 className="header">Booking Page</h3>
            <div className="container m-2">
                {doctor && (
                    <div>
                        <div className="info-container">
                            <div>
                                <h4 className="firstname">Doctor Name :</h4>
                                <h5 className="doctor-name">
                                    Dr.{doctor.user.firstName} {doctor.user.lastName}
                                </h5>
                            </div>
                            <div>
                                <h4 className="firstname">Per Consultant Fees:</h4>
                                <h5 className="doctor-name"> {doctor.feesPerCunsaltation}</h5>
                            </div>
                            <div>
                                <h4 className="firstname">Speciallization:</h4>
                                <h5 className="doctor-name"> {doctor.speciallization}</h5>
                            </div>
                        </div>
                        <h5 className="booking-subtitle">
                            You are booking an appointment for tomorrow :
                        </h5>
                        <div className="booking-form ">
                            <div className="time-select">
                                <h5 className="sloat-time">Select Your Booking Slot :</h5>
                                <select
                                    className="sloat-option"
                                    name="timingSlot"
                                    value={timingSlot}
                                    onChange={handleChange}
                                >
                                    <option value="">-- Select a time --</option>
                                    {morningSlots.current.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                    {eveningSlots.current.map((time) => (
                                        <option key={time} value={time}>
                                            {time}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="meeting-mode-select">
                                <h5 className="mode-select">Select You Mode : </h5>
                                <select
                                    name="meetingMode"
                                    className="meet-mode"
                                    onChange={handleChange}
                                    value={meetingMode}
                                >
                                    <option value="online">Virtual Meeting</option>
                                    <option value="offline">Physical Meeting</option>
                                </select>
                                <div>
                                    <h5 htmlFor="text-feeling" className="feeling-label">
                                        Enter Your Feeling:
                                    </h5>
                                    <textarea
                                        id="text-feeling"
                                        name="textfeelling"
                                        className="feeling-textarea"
                                        onChange={handleChange}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary mt-2 mode-butn"
                                    onClick={checkAvailability}
                                >
                                    Check Availability
                                </button>

                            </div>
                            {isAvailable && (
                                <>
                                    <button className="btn btn-dark mt-2 final-btn" onClick={handleBooking}>
                                        Book Now
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default BookingPage;


function generateTimeSlots(start, end) {
    let timeSlots = [];
    let hour = parseInt(start);
    let minute = "00";
    while (hour < parseInt(end)) {
        timeSlots.push(hour + ":" + minute);
        minute = minute === "00" ? "30" : "00";
        if (minute === "00") hour++;
    }
    timeSlots.push(end + ":00");
    return timeSlots;
}