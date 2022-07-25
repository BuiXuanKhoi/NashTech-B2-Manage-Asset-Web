import {Row, Col, Form, Input, Select, Button, DatePicker, Radio, Cascader} from "antd";
import React, {useState} from "react";
import "antd/dist/antd.css";
import "./CreateUser.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const [isLoading, setLoading] = useState({isLoading: false});
    const loginState = JSON.parse(localStorage.getItem("loginState"));
    const navigate = useNavigate();
    const {Option} = Select;
    const [form] = Form.useForm();
    const config = {
        headers: { Authorization: `Bearer ${loginState.token}` }
    };
    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
            offset: 1,
        },
    };
    const onFinish = (fieldsValue) => {
        console.log(fieldsValue);
        const values = {
            ...fieldsValue,
            DateOfBirth: fieldsValue["DateOfBirth"].format("DD/MM/YYYY"),
            JoinedDate: fieldsValue["JoinedDate"].format("DD/MM/YYYY"),
        };

        axios
            .post(`https://asset-assignment-be.azurewebsites.net/api/account`, {
                firstName: values.Firstname,
                lastName: values.Lastname,
                join: values.JoinedDate,
                role: values.Type[0],
                birth: values.DateOfBirth,
                gender: values.Gender,
                prefix: values.Part,
                locations: values.Type[1]
            }, config)
            .then((response) => {
                setTimeout(() => {
                    setLoading({isLoading: false});
                }, 2000)

                console.log(response.data);

                navigate("/user");

            })
            .catch((error) => {
                console.log(error)
                console.log(error.response.data.message);
            });
     };

    const options = [
        {
          value: 'admin',
          label: 'Admin',
          children: [
            {
              value: 'HCM',
              label: 'Ho Chi Minh',
              
            },
            {
                value: 'DN',
                label: 'Da Nang',
            },
            {
                value: 'HN',
                label: 'Ha Noi',
            },
          ],
        },
        {
          value: 'staff',
          label: 'Staff',
        },
      ];
      
      const onChange = (value) => {
        console.log(value);
      };
    return (
        <Row>
            <Col span={12} offset={6}>
                <div className="content">
                    <Row  className="fontHeaderContent">
                        Create New User
                    </Row>
                    <Row className="formCreate"
                        
                    >
                        <Form
                            form={form}
                            // initialValues={{Gender: 'Female'}}
                            name="complex-form"
                            onFinish={onFinish}
                            {...formItemLayout}
                            labelAlign="left"
                        >
                            <Form.Item label="First name" >
                                <Form.Item
                                    name="Firstname"
                                    rules={[{required: true, message: 'First name must be required'},
                                        {
                                            pattern: new RegExp("^[a-zA-Z'. ]+$"),
                                            message: 'First name can not have number'
                                        }
                                        , {max: 50, message: "First name must less than 50 characters"}
                                    ]}
                                    hasFeedback
                                >
                                    <Input disabled={isLoading.isLoading === true} maxLength={51}
                                           className="inputForm"/>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item label="Last name" >
                                <Form.Item
                                    name="Lastname"
                                    rules={[{required: true, message: 'Last name must be required'},
                                        {
                                            pattern: new RegExp("^[a-zA-Z'. ]+$"),
                                            message: 'Last name can not have number'
                                        }
                                        , {max: 50, message: "Last name must less than 50 characters"}
                                    ]}
                                    hasFeedback
                                >
                                    <Input disabled={isLoading.isLoading === true} maxLength={51}
                                           className="inputForm"/>
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Date of Birth" >
                                <Form.Item
                                    name="DateOfBirth"
                                    rules={[{required: true, message: 'Date of birth must be required'},
                                        () => ({
                                            validator(_, value) {
                                                if ((new Date().getFullYear() - value._d.getFullYear()) < 18) {
                                                    return Promise.reject("User is under 18. Please select a different date")
                                                }
                                                return Promise.resolve();
                                            }
                                        })
                                    ]}
                                    hasFeedback
                                >
                                    <DatePicker
                                        disabled={isLoading.isLoading === true}
                                        format="DD/MM/YYYY"

                                        className="inputForm"
                                    />

                                </Form.Item>
                            </Form.Item>
                            <Form.Item disabled={isLoading.isLoading === true} label="Gender" >
                                <Form.Item name="Gender" rules={[{required: true, message: 'Gender must be required'}]}>
                                    <Radio.Group disabled={isLoading.isLoading === true}>
                                        <Radio value="Female">Female</Radio>
                                        <Radio value="Male">Male</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Joined Date" >
                                <Form.Item
                                    name="JoinedDate"
                                    rules={[{required: true, message: 'Joined date must be required',},
                                        ({getFieldValue}) => ({
                                            validator(_, value) {

                                                if (value === null || value === "") {
                                                    return Promise.resolve()
                                                }
                                                if (value._d.getDay() === 0 || value._d.getDay() === 6) {

                                                    return Promise.reject(`Joined date is Saturday or Sunday. Please select a different date `);

                                                } else if (value - getFieldValue('DateOfBirth') < 0) {

                                                    return Promise.reject("Joined date is not later than Date of Birth. Please select a different date");
                                                }  
                                                else if (value - getFieldValue('DateOfBirth') < 568080000000) {

                                                    return Promise.reject("Only accept staff from 18 years old");
                                                } else {
                                                    return Promise.resolve()
                                                }
                                            }
                                        })
                                    ]}
                                    hasFeedback
                                >

                                    <DatePicker
                                        disabled={isLoading.isLoading === true}
                                        format="DD/MM/YYYY"

                                        className="inputForm"

                                    />

                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Part">
                                <Form.Item
                                    name="Part"
                                    rules={[{required: true, message: 'Type must be required'}]}
                                    style={{display: "block"}}
                                    hasFeedback
                                >
                                    <Select
                                        disabled={isLoading.isLoading === true}
                                        showSearch
                                        className="inputForm"
                                        style={{display: "block"}}
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children
                                                .toLowerCase()
                                                .localeCompare(optionB.children.toLowerCase())
                                        }
                                    >
                                        <Option value="BPS">Business Process Solution</Option>
                                        <Option value="SD">Software Development</Option>
                                    </Select>
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Type">
                                <Form.Item
                                    name="Type"
                                    rules={[{required: true, message: 'Type must be required'}]}
                                    hasFeedback
                                >
                                    <Cascader
                                        disabled={isLoading.isLoading === true}
                                        showSearch
                                        className="inputForm"
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                            option.children
                                                .toLowerCase()
                                                .indexOf(input.toLowerCase()) >= 0
                                        }
                                        filterSort={(optionA, optionB) =>
                                            optionA.children
                                                .toLowerCase()
                                                .localeCompare(optionB.children.toLowerCase())
                                        }
                                        options={options} onChange={onChange}
                                    
                                        
                                    />
                                </Form.Item>
                            </Form.Item>
                            

                            <Form.Item shouldUpdate >
                                {() => (
                                <Row style={{float: 'right'}}>
                                        < Button
                                            disabled={
                                                !form.isFieldsTouched(true) ||
                                                form.getFieldsError().filter(({errors}) => errors.length).length > 0
                                            }
                                            className="buttonSave"
                                            style={{background: "#e30c18", color: "white"}}
                                            loading={isLoading.isLoading} htmlType="submit" onClick={() => {
                                            setLoading({isLoading: true})
                                            setTimeout(() => {
                                                    setLoading({isLoading: false})
                                                }, 2000
                                            )
                                        }}
                                        >
                                            Save
                                        </Button>
                                    <Button
                                        className="buttonCancel"
                                        disabled={isLoading.isLoading === true} onClick={() => {
                                        navigate("/user");
                                    }}>
                                        Cancel
                                    </Button>

                                </Row>

                                )}
                            </Form.Item>
                        </Form>
                    </Row>
                </div>
            </Col>
        </Row>
    );
}
