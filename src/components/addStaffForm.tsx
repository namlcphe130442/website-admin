import React, {useEffect} from 'react';
import 'antd/dist/antd.css';
import {Form,Input,Button,Row, Col} from 'antd';
import { connect } from 'react-redux';

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};


const AddStaffForm = (props: any) => {

    const [form] = Form.useForm();
    const {staffEdit} = props;
    const {staffs} = props;

    useEffect(() => {
        form.setFieldsValue({
            email: staffEdit.email,
            name: staffEdit.name,
            salary: staffEdit.salary,
            dob: staffEdit.dob,
        })
    });

    const onFinish = (value: any) => {
        if (staffEdit!=='') {
            value.id = staffEdit.id;
        }
        props.onClickStaff(value); 
    };

    const checkDuplicate = (value: any) => {
        var result = false;
        var count = 0;
        staffs.forEach((staff: Staff) => {
            if(value === staff.email) count++; 
        });
        if(count === 0) result = true;
        return result;
    }

    return (
        <Row>
            <Col span={12} offset={6}>
                <Form
                    {...formItemLayout}
                    form={form}
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <Form.Item
                            name="email"
                            label="email"
                            rules={[
                            {
                                type: 'email',
                                message: 'You must enter Email',
                            },
                            {
                                required: true,
                                message: 'Please input your Email',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || checkDuplicate(value) || staffEdit !== '') {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Email already exists');
                                },
                            }),
                            ]}
                    >
                    <Input className="width" placeholder="Please input Email"/>
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="name"
                        label="Name"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your name',
                        },
                        ]}
                    >
                        <Input className="width" placeholder="Please input your name" />
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="salary"
                        label="Salary"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your salary',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (!isNaN(value)) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('You must enter number');
                            },
                        }),
                        ]}
                    >
                        <Input className="width" placeholder="Please input your salary" />
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="dob"
                        label="dob"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your dob',
                        },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (new Date(value).toString() !== 'Invalid Date') {
                                    return Promise.resolve();
                                }
                                return Promise.reject('You must enter date');
                            },
                        }),
                        ]}
                    >
                        <Input className="width" placeholder="Please input your salary" />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Col>
        </Row>
    );
};

const mapStateToProps = (state:any) => {
    return {         
        staffs: state.staffs
    }
};

export default connect(mapStateToProps)(AddStaffForm); 