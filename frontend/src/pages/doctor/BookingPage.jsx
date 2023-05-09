import React, { useContext, useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import "../../styles/Bookingpage.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CookiesContext } from "../../context/CookiesProvider";
import { message } from "antd";
import moment from "moment";
import { getdoctorthroughid } from "../../components/Action/doctors/getDoctorDetails";
import { chechbookingAvalability, userbooking } from "../../components/Action/users/bookingappointment";

const BookingPage = ({ axiosInstance }) => {
    const { removeCookies, cookies } = useContext(CookiesContext);
    const [doctor, setDoctor] = useState(null);
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    console.log(moment().add(1, "day").format("YYYY-MM-DD"));
    console.log(user);
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
        console.log(event.target);
        console.log(event.target.value);
        setAppointmentInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    // get user data
    useEffect(() => {
        const { token } = cookies;
        const getDoctorData = async () => {
            dispatch(showLoading());
            const responce = await getdoctorthroughid(token, params);
            dispatch(hideLoading());
            if (responce.type === 'data') {
                message.success(responce.message);
                setDoctor(responce.doctorList);
                morningSlots.current = generateTimeSlots(
                    responce.morningStart,
                    responce.morningEnd
                );
                eveningSlots.current = generateTimeSlots(
                    responce.eveningStart,
                    responce.eveningEnd
                );
            } else {
                message.error(responce.message);
            }
        };
        getDoctorData();
        //eslint-disable-next-line
    }, [cookies]);

    const handleBooking = async () => {
        console.log(user);
        const { token } = cookies;
        if (!timingSlot) {
            return alert("date and time is required");
        }
        dispatch(showLoading());
        const responce = await userbooking(token, params, user, doctor, timingSlot, textfeelling, meetingMode);
        dispatch(hideLoading());
        if (responce.type === 'data') {
            message.success(responce.message);
            navigate("/");
        } else {
            message.error(responce.message);
        }
    };

    const checkAvailability = async (req, res) => {
        if ("" === timingSlot) {
            alert("please give time slot value");
            return;
        }
        const { token } = cookies;
        dispatch(showLoading());
        const responce = await chechbookingAvalability(token, params, timingSlot)
        dispatch(hideLoading());
        if (responce.type === 'data') {
            setAppointmentInfo((prevState) => ({
                ...prevState,
                isAvailable: true,
            }));
            message.success(responce.message);
        } else {
            message.error(responce.message);
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
                                <h5 className="doctor-name"> {doctor.feesPerCunsaltation}</h5>
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
                                <button
                                    className="btn btn-primary mt-2 mode-butn"
                                    onClick={checkAvailability}
                                >
                                    Check Availability
                                </button>
                            </div>
                            {isAvailable && (
                                <>
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