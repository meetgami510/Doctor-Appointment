import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import moment from "moment";
import { CookiesContext } from "../../context/CookiesProvider";

const Profile = ({ axiosInstance }) => {
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
        const res = await axiosInstance.post("/doctor/sloat-booking", { timeSlot },
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    } else {
      alert("time slot must require 1hr diffrence");
    }
  }

  const handleFinish = async (values) => {
    const { token } = cookies;
    try {
      dispatch(showLoading());
      console.log(values);
      const res = await axiosInstance.post(
        "/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            authorization: 'Bearer ' + token
          }
        }
      );
      dispatch(hideLoading());
      if (!res.data.success) {
        message.error(res.data.message);
      } else {
        message.success(res.data.message);
      }
      console.log(res.data);
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      message.error("some thing went wrong");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { token } = cookies;
      try {
        dispatch(showLoading());
        const res = await axiosInstance.get(`/doctor/getDoctorInfo`,
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        );
        dispatch(hideLoading());
        console.log(res.data);
        if (res.data.success) {
          //console.log(res.data.doctor);
          setDoctor(res.data.doctor);
          setTimeSlot(res.data.doctor.timeSlot);
        } else {
          message.error(res.data.message);
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
      <h1>manage profile</h1>
      {doctor && (
        <>
          <Form
            layout="vertical"
            onFinish={handleFinish}
            className="m-3"
            initialValues={{
              ...doctor,
            }}
          >
            <h4 className="">Personal Details : </h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your first name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your last name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Phone No"
                  name="phone"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your contact no" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="email" placeholder="your email address" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item label="Website" name="website">
                  <Input type="text" placeholder="your website" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your clinic address" />
                </Form.Item>
              </Col>
            </Row>
            <h4>Professional Details :</h4>
            <Row gutter={20}>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your specialization" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your experience" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={8}>
                <Form.Item
                  label="Fees Per Cunsaltation"
                  name="feesPerCunsaltation"
                  required
                  rules={[{ required: true }]}
                >
                  <Input type="text" placeholder="your contact no" />
                </Form.Item>
              </Col>

              <Col xs={24} md={24} lg={8}></Col>
              <Col xs={24} md={24} lg={8}>
                <button className="btn btn-primary form-btn" type="submit">
                  Update
                </button>
              </Col>
            </Row>
          </Form>

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

export default Profile;
