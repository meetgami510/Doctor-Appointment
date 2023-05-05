import React, { useContext, useState, useEffect, useRef } from "react";
import Layout from "../../components/Layout/Layout";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import "../../styles/Bookingpage.css"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { CookiesContext } from "../../context/CookiesProvider";
import { message } from "antd";
import moment from "moment";

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

    const arr = [
        "09:00",
        "09:30",
        "10:00",
        "10:30",
        "11:00",
        "11:30",
        "12:00",
        "12:30",
    ];

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
        const { name, value } = event.target;
        console.log(event.target);
        console.log(event.target.value);
        setAppointmentInfo((prevState) => ({ ...prevState, [name]: value }));
    };

    // get user data
    useEffect(() => {
        const { token } = cookies;
        const getDoctorData = async () => {
            try {
                console.log(params.doctorId);
                dispatch(showLoading());
                const res = await axiosInstance.post(
                    "/doctor/getDoctorById",
                    { doctorId: params.doctorId },
                    {
                        headers: {
                            authorization: "Bearer " + token,
                        },
                    }
                );
                dispatch(hideLoading());
                if (res.data.success) {
                    message.success(res.data.message);
                    setDoctor(res.data.doctor);
                    morningSlots.current = generateTimeSlots(
                        res.data.doctor.timeSlot.morningStart,
                        res.data.doctor.timeSlot.morningEnd
                    );
                    eveningSlots.current = generateTimeSlots(
                        res.data.doctor.timeSlot.eveningStart,
                        res.data.doctor.timeSlot.eveningEnd
                    );
                    console.log(res.data.doctor);
                } else {
                    message.error(res.data.message);
                }
            } catch (error) {
                console.log(error);
                dispatch(hideLoading());
                message.error("some thing went wrong");
            }
        };
        getDoctorData();
        //eslint-disable-next-line
    }, [cookies]);

    const handleBooking = async () => {
        console.log(user);
        const { token } = cookies;
        try {
            if (!timingSlot) {
                return alert("date and time is required");
            }
            dispatch(showLoading());
            console.log(timingSlot);
            const res = await axiosInstance.post(
                "/user/book-appointment",
                {
                    doctorId: params.doctorId,
                    userName: user.name,
                    doctorUserId: doctor.user._id,
                    userId: user._id,
                    timingSlot,
                    textfeelling,
                    meetingMode,
                },
                {
                    headers: {
                        authorization: "Bearer " + token,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                message.success(res.data.message);
                navigate("/");
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error("some thing went wrong");
        }
    };

    const checkAvailability = async (req, res) => {
        const { token } = cookies;
        try {
            dispatch(showLoading());
            const res = await axiosInstance.post(
                "/user/booking-avalibility",
                { doctorId: params.doctorId, timingSlot },
                {
                    headers: {
                        authorization: "Bearer " + token,
                    },
                }
            );
            dispatch(hideLoading());
            if (res.data.success) {
                setAppointmentInfo((prevState) => ({
                    ...prevState,
                    isAvailable: true,
                }));
                message.success(res.data.message);
            } else {
                message.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error("some thing went wrong");
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
                                <p className="select-sloat">You selected: 
                                <div className="select-sloat1">{timingSlot}</div></p>
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
                                        name="textfeeling"
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

{
    /* <Layout removeCookies={removeCookies}>
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
                  <div>
                      <select name="timingSlot" value={timingSlot} onChange={handleChange}>
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
                  <div>
                      <select name="meetingMode" onChange={handleChange} value={meetingMode}>
                          <option value="online">Virtual Meeting</option>
                          <option value="offline">Physical Meeting</option>
                      </select>
                  </div>
                  <button className="btn btn-primary mt-2" onClick={checkAvailability}>
                      Check Availability
                  </button>
                  {
                      isAvailable && <>
                          Enter Your Feelling : <input name="textfeelling" type="TextArea" onChange={handleChange} />
                          <button className="btn btn-dark mt-2" onClick={handleBooking}>
                              Book Now
                          </button>
                      </>
                  }
              </div>
          </div>
      )}
  </div>
  </Layout> */
}
