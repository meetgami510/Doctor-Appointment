import React, { useContext, useEffect } from 'react'
import { Col, Form, Input, Row, message } from "antd";
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { useDispatch } from 'react-redux';
import { CookiesContext } from '../../context/CookiesProvider';
import { updateProfessional } from '../../Action/doctors/updateDoctorDetails';

function DoctorProfessionalDetails({ doctor, setDoctor }) {
    const dispatch = useDispatch();
    const { cookies } = useContext(CookiesContext);
    const updateProfessionalDetails = async (values) => {
        const { token } = cookies;
        try {
            dispatch(showLoading());
            console.log(values);
            const responce = await updateProfessional(token, values);
            console.log(responce)
            dispatch(hideLoading());
            if (responce.type === 'data') {
                message.success(responce.message);
                setDoctor(responce.updateList)
            } else {
                message.error(responce.message);
            }
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

export default DoctorProfessionalDetails