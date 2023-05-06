import React, { useContext, useEffect } from 'react'
import { Col, Form, Input, Row, message } from "antd";
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { useDispatch } from 'react-redux';
import { CookiesContext } from '../../context/CookiesProvider';

function ProfessionalDetails({ doctor, axiosInstance, setDoctor }) {
    const dispatch = useDispatch();
    const { cookies } = useContext(CookiesContext);
    const updateProfessionalDetails = async (values) => {
        const { token } = cookies;
        try {
            dispatch(showLoading());
            console.log(values);
            const res = await axiosInstance.post(
                "/doctor/update-professional-details",
                {
                    ...values,
                },
                {
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                }
            );
            console.log(res)
            dispatch(hideLoading());
            if (!res.data.success) {
                message.error(res.data.message);
            } else {
                message.success(res.data.message);
                console.log(res.data.user)
                setDoctor(res.data.doctor)

            }
            console.log(res.data);
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error("some thing went wrong");
        }
    }
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue(doctor);
    }, [doctor]);
    return (
        <Form layout="vertical"
            onFinish={updateProfessionalDetails}
            className="m-3"
            form={form}
            initialValues={{
                ...doctor,
            }}>
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
                    <Form.Item label="Website" name="website">
                        <Input type="text" placeholder="your website" />
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
    )
}

export default ProfessionalDetails