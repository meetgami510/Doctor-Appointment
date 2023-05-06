import React, { useContext } from 'react'
import { Col, Form, Input, Row, message } from "antd";
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import { useDispatch, useSelector } from 'react-redux';
import { CookiesContext } from '../../context/CookiesProvider';
import { setUser } from '../../redux/features/userSlice';

function PersonalDetails({ axiosInstance }) {
    const { cookies } = useContext(CookiesContext);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const updatePersonalDetails = async (values) => {
        const { token } = cookies;
        try {
            dispatch(showLoading());
            console.log(values);
            const res = await axiosInstance.post(
                "/user/update-personal-details",
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
                dispatch(setUser(res.data.user));
            }
            console.log(res.data);
        } catch (error) {
            console.log(error);
            dispatch(hideLoading());
            message.error("some thing went wrong");
        }
    };
    return (
        <>
            <Form
                layout="vertical"
                onFinish={updatePersonalDetails}
                className="m-3"
                initialValues={{
                    ...user,
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
                <button className="btn btn-primary form-btn" type="submit">
                    Update
                </button>
            </Form>
        </>
    )
}

export default PersonalDetails