import React, { useContext, useState, useEffect, useRef } from 'react'
import Layout from '../../components/Layout/Layout'
import { hideLoading, showLoading } from '../../redux/features/alertSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CookiesContext } from "../../context/CookiesProvider";
import { message } from 'antd';

const BookingPage = ({ axiosInstance }) => {
    const { removeCookies, cookies } = useContext(CookiesContext);
    const [doctor, setDoctor] = useState(null);
    const { user } = useSelector(state => state.user);
    console.log(user)
    const dispatch = useDispatch();
    const params = useParams();
    const [isAvailable, setIsAvailable] = useState(false);
    const [timingSlot, setTimingSlot] = useState("");
    const [textfeelling, setTextfeelling] = useState("");
    const morningSlots = useRef([]);
    const eveningSlots = useRef([]);

    const arr = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];

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



    const handleChange = (event) => {
        setTimingSlot(event.target.value);
        console.log(event.target.value);
    };

    const feellingchange = (event) => {
        setTextfeelling(event.target.value);
    }
    // get user data
    useEffect(() => {
        const { token } = cookies;
        const getDoctorData = async () => {
            try {
                console.log(params.doctorId);
                dispatch(showLoading());
                const res = await axiosInstance.post(
                    '/doctor/getDoctorById',
                    { doctorId: params.doctorId },
                    {
                        headers: {
                            authorization: 'Bearer ' + token
                        }
                    }
                );
                dispatch(hideLoading());
                if (res.data.success) {
                    message.success(res.data.message);
                    setDoctor(res.data.doctor);
                    morningSlots.current = generateTimeSlots(res.data.doctor.timeSlot.morningStart, res.data.doctor.timeSlot.morningEnd);
                    eveningSlots.current = generateTimeSlots(res.data.doctor.timeSlot.eveningStart, res.data.doctor.timeSlot.eveningEnd);
                    console.log(res.data.doctor);
                } else {
                    message.error(res.data.message);
                }
            } catch (error) {
                console.log(error);
                dispatch(hideLoading());
                message.error('some thing went wrong');
            }
        }
        getDoctorData();
        //eslint-disable-next-line
    }, [cookies]);

    const handleBooking = async () => {
        console.log(user)
        const { token } = cookies;
        try {
            if (!timingSlot) {
                return alert('date and time is required');
            }
            dispatch(showLoading());
            console.log(timingSlot);
            const res = await axiosInstance.post(
                '/user/book-appointment',
                {
                    doctorId: params.doctorId,
                    userName: user.name,
                    doctorUserId: doctor.user,
                    userId: user._id,
                    timingSlot,
                    textfeelling
                },
                {
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                setDoctor(res.data.doctor);
                console.log(res.data.doctor);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error('some thing went wrong');
        }
    }

    const checkAvailability = async (req, res) => {
        const { token } = cookies;
        try {
            dispatch(showLoading());
            const res = await axiosInstance.post('/user/booking-avalibility',
                { doctorId: params.doctorId, timingSlot },
                {
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                setIsAvailable(true);
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error('some thing went wrong');
        }
    }

    return (
        <Layout removeCookies={removeCookies}>
            <h3>Booking Page</h3>
            <div className="container m-2">
                {doctor && (
                    <div>
                        <h4>
                            Dr.{doctor.user.firstName} {doctor.user.lastName}
                        </h4>
                        <h4>Fees : {doctor.feesPerCunsaltation}</h4>
                        <h4>
                            Timings : {doctor.timings && doctor.timings[0]} -{" "}
                            {doctor.timings && doctor.timings[1]}{" "}
                        </h4>
                        <div className="d-flex flex-column w-50">
                            <h4>you are booking appointment for tomorrow</h4>
                            {/* <DatePicker
                                className="m-2"
                                format="DD-MM-YYYY"
                                onChange={
                                    (value) => {
                                        console.log(moment(value).format("DD-MM-YYYY"));
                                        setIsAvailable(false);
                                        setDate(moment(value).format("DD-MM-YYYY"))
                                    }
                                }
                            /> */}
                            {/* <TimePicker
                                format="HH:mm"
                                className="m-2"
                                onChange={
                                    (value) => {
                                        setIsAvailable(false);
                                        setTime(moment(value).format("HH:mm"));
                                    }
                                }
                            /> */}
                            <div>
                                <select value={timingSlot} onChange={handleChange}>
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
                                <p>You selected: {timingSlot}</p>
                            </div>
                            <button className="btn btn-primary mt-2" onClick={checkAvailability}>
                                Check Availability
                            </button>
                            {
                                isAvailable && <>
                                    Enter Your Feelling : <input type="TextArea" onChange={feellingchange} />
                                    <button className="btn btn-dark mt-2" onClick={handleBooking}>
                                        Book Now
                                    </button>
                                </>
                            }
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default BookingPage