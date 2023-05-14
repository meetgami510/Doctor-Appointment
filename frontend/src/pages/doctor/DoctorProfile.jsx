import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { message } from "antd";
import { CookiesContext } from "../../context/CookiesProvider";
import PersonalDetails from "../../components/Profile/PersonalDetails";
import DoctorProfessionalDetails from "../../components/Profile/DoctorProfessionalDetails";
import { getDoctorDetails } from "../../Action/doctors/getDoctorDetails";
import { updateDoctorTimeSlot } from "../../Action/doctors/updateDoctorDetails";
import ShowTimeSlot from "../../components/Profile/ShowTimeSlot";
import { useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const { removeCookies, cookies } = useContext(CookiesContext);
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);
  const navigate = useNavigate();
  const [timeSlot, setTimeSlot] = useState();

  const updateTimeSlot = async (event) => {
    event.preventDefault();
    const { token } = cookies;
    
    if (timeSlot.morningEnd - timeSlot.morningStart > 0 && timeSlot.eveningEnd - timeSlot.eveningStart > 0) {
      dispatch(showLoading());
      const response = await updateDoctorTimeSlot(token, timeSlot);
      dispatch(hideLoading());
      if (response.type === 'data') {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } else {
      alert("time slot must require 1hr diffrence");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { token } = cookies;
      dispatch(showLoading());
      const response = await getDoctorDetails(token);
      dispatch(hideLoading());
      if (response.type === 'data') {
        message.success(response.message)
        setDoctor(response.doctor);
        setTimeSlot(response.timeSlot);
      } else {
        if (response.message.includes("authenitication is failed")) {
          navigate('/')
        }
        message.error(response.message);
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  const handleTimeSlot = (e) => {
    const { name, value } = e.target;
    setTimeSlot(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <Layout removeCookies={removeCookies}>
      {doctor && (
        <>
          <PersonalDetails />
          <DoctorProfessionalDetails doctor={doctor} setDoctor={setDoctor} />
          <form onSubmit={updateTimeSlot}>
            <ShowTimeSlot timeSlot={timeSlot} handleTimeSlot={handleTimeSlot} />
            <button type="submit">Update Time Slot</button>
          </form>
        </>
      )}
    </Layout>
  );
};

export default DoctorProfile;
