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

  const handleAdd = async (val) => {
    const { token } = cookies;
    console.log(val);
    
    const morningTimeslot = {
      start: val.timings[0].format("HH:mm A"),
      end: val.timings[1].format("HH:mm A"),
    };
    const eveningTimeslot = {
      start: val.timings1[0].format("HH:mm A"),
      end: val.timings1[1].format("HH:mm A"),
    };
    console.log(morningTimeslot);
    console.log(eveningTimeslot);

    const res = await axiosInstance.post("/doctor/sloat-booking",{morningTimeslot,eveningTimeslot},
    {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    );
    console.log(res);
  };

  const handleFinish = async (values) => {
    const { token } = cookies;
    try {
      dispatch(showLoading());
      console.log(values);
      //   const res = await axiosInstance.post(
      //     "/doctor/updateProfile",
      //     {
      //       ...values,
      //       userId: user._id,
      //       // timings: [
      //       //     moment(values.timings[0]).format("HH:mm"),
      //       //     moment(values.timings[1]).format("HH:mm"),
      //       // ],
      //     }
      //     // {
      //     //     headers: {
      //     //         Authorization: 'Bearer ' + token
      //     //     }
      //     // }
      //   );
      //   dispatch(hideLoading());
      //   if (!res.data.success) {
      //     message.error(res.data.message);
      //   } else {
      //     message.success(res.data.message);
      //   }
      //   console.log(res.data);
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
              // timings: [
              //     moment(doctor?.timings[0], "HH:mm"),
              //     moment(doctor?.timings[1], "HH:mm"),
              // ],
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

          <Form onFinish={handleAdd}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Morning Timeslot" name="timings" required>
                <TimePicker.RangePicker format="HH" showNow={false} />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Evening Timeslot" name="timings1" required>
                <TimePicker.RangePicker format="HH" showNow={false} />
              </Form.Item>
            </Col>
            <button type="submit">Add Timeslots</button>
          </Form>
        </>
      )}
    </Layout>
  );
};

export default Profile;
