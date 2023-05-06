import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import moment from "moment";
import { CookiesContext } from "../../context/CookiesProvider";
import { setUser } from "../../redux/features/userSlice";
import PersonalDetails from "../../components/Profile/PersonalDetails";
import ProfessionalDetails from "../../components/Profile/ProfessionalDetails";
import { getallDoctorInfo } from "../../components/Action/doctors/getdoctorInfo";
import { doctorSlotbooking } from "../../components/Action/doctors/appointmentStatus";

const DoctorProfile = ({ axiosInstance }) => {
  const { removeCookies, cookies } = useContext(CookiesContext);
  const { user } = useSelector((state) => state.user);
  console.log(user);
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);
  const [timeSlot, setTimeSlot] = useState();

  const updateTimeSlot = async (event) => {
    event.preventDefault();
    const { token } = cookies;
    console.log(timeSlot)
    if (timeSlot.morningEnd - timeSlot.morningStart > 0 && timeSlot.eveningEnd - timeSlot.eveningStart > 0) {
      try {
        const responce = await doctorSlotbooking(token,timeSlot);
        if(responce.type === 'data') {
          message.success(responce.message);
        }else{
          message.error(responce.message);
        }
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    } else {
      alert("time slot must require 1hr diffrence");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { token } = cookies;
      try {
        dispatch(showLoading());

        const responce = await getallDoctorInfo(token);
        
        dispatch(hideLoading());
        
        if (responce.type === 'data') {
          console.log(responce.doctorList);
          setDoctor(responce.doctorList);
          setTimeSlot(responce.timeSlot);
        } else {
          message.error(responce.message);
        }
      } catch (error) {
        console.log(error);
        dispatch(hideLoading());
        message.error("some thing went wrong");
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  console.log(timeSlot)
  const handleTimeSlot = (e) => {
    const { name, value } = e.target;
    setTimeSlot(prevState => ({ ...prevState, [name]: value }))
  }


  return (
    <Layout removeCookies={removeCookies}>
      {doctor && (
        <>
          <PersonalDetails axiosInstance={axiosInstance} />
          <ProfessionalDetails axiosInstance={axiosInstance} doctor={doctor} setDoctor={setDoctor} />
          <form onSubmit={updateTimeSlot}>
            <select name="morningStart" value={timeSlot.morningStart} onChange={handleTimeSlot}>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
            </select>
            <select name="morningEnd" value={timeSlot.morningEnd} onChange={handleTimeSlot}>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
            </select>
            <select name="eveningStart" value={timeSlot.eveningStart} onChange={handleTimeSlot}>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>
            <select name="eveningEnd" value={timeSlot.eveningEnd} onChange={handleTimeSlot}>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
            </select>
            <button type="submit">Update Time Slot</button>
          </form>
        </>
      )}
    </Layout>
  );
};

export default DoctorProfile;
