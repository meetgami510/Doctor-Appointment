import React, { useContext, useState } from 'react';
import Layout from '../components/Layout/Layout'
import { Form, Input, Button, Row, Col, Checkbox, Upload, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { CookiesContext } from '../context/CookiesProvider';
import { UploadOutlined } from '@ant-design/icons';
import axiosInstance from '../utilities/axiosInstance';
import ShowTimeSlot from '../components/Profile/ShowTimeSlot';
// import moment from 'moment';

const ApplyDoctor = () => {
    const { cookies } = useContext(CookiesContext);
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)

    const handleFileChange = (info) => {
        const { status, originFileObj } = info.file;
        if (status === 'done') {
            setFile(originFileObj);
        }
    };

    const [timeSlot, setTimeSlot] = useState({
        morningStart: 9,
        morningEnd: 13,
        eveningStart: 16,
        eveningEnd: 20
    });



    const handleFinish = async (values) => {
        const { token } = cookies;
        // console.log(values);
        if (timeSlot.morningEnd - timeSlot.morningStart > 0 && timeSlot.eveningEnd - timeSlot.eveningStart > 0) {
            try {
                dispatch(showLoading());
                const res = await axiosInstance.post('/user/apply-doctor',
                    {
                        ...values,
                        timeSlot,
                        user: user._id,
                        file
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
                    navigate('/');
                }
                console.log(res.data)
            } catch (error) {
                console.log(error);
                dispatch(hideLoading());
                message.error('some thing went wrong');
            }
        } else {
            alert("time slot must require 1hr diffrence");
        }
    }
    const handleTimeSlot = (e) => {
        const { name, value } = e.target;
        setTimeSlot(prevState => ({ ...prevState, [name]: value }))
    }
    return (
        <Layout>
            <h1 className="text-center">Apply Doctor</h1>
            <Form layout="vertical" onFinish={handleFinish} className="m-3">
                <h4 className="">Personal Details : </h4>
                <Row>
                    <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Website" name="website">
                            <Input type="text" placeholder="your website" />
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
                    <ShowTimeSlot timeSlot={timeSlot} handleTimeSlot={handleTimeSlot} />
                    {/* <Col xs={24} md={24} lg={8}>
                        <Form.Item label="Upload File" name="file">
                            <Upload
                                accept=".pdf,.doc,.docx"
                                maxCount={1}
                                onChange={handleFileChange}
                                fileList={file ? [file] : []}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        </Form.Item>
                    </Col> */}
                    <Col xs={24} md={24} lg={8}></Col>
                    <Col xs={24} md={24} lg={8}>
                        <button className="btn btn-primary form-btn" type="submit">
                            Submit
                        </button>
                    </Col>
                </Row>
            </Form>

        </Layout>
    )
}

export default ApplyDoctor