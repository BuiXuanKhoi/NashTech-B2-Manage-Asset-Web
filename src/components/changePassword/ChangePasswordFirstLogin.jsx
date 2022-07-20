import React, {useState} from "react";
import {Modal, Input, Button, Form} from "antd";
import {EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons";
// import axios from "axios";
import "antd/dist/antd.css";
import "../changePassword/ChangePasswordForm.css";

export default function ChangePasswordFirstLogin(props) {
    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
            offset: 1,
        },
    };
    const [isPaswordVisible, setIsPaswordVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(props.isOpen);
    const [NewPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [Loading, setLoading] = useState({
        isLoading: false
    })
    const handleOk = () => {
    };
    return (
        <>
            <Modal
                title="Change Password"
                visible={isModalVisible}
                maskClosable={false}
                onOk={handleOk}
                footer={[
                    <Button
                        className="buttonSave"
                         loading={Loading.isLoading} key="submit"
                        onClick={() => {
                            setLoading({...Loading, isLoading: true});
                            setTimeout(() => {
                                setLoading({...Loading, isLoading: false})
                            }, 2000)
                            handleOk();
                        }}>
                        Save
                    </Button>,
                ]}
                closable={false}
            >
                <p style={{fontFamily: "bold", fontSize: "16px"}}>
                    This is first time you logged in <br />
                    You have to change your password to continue.
                </p>
                <Form {...formItemLayout}>
                <Form.Item 
                            name="New Password"
                            label="New Password"
                            rules={[{ required: true, min: 8, max: 15 },
                            { pattern: new RegExp("^[a-zA-Z0-9]+$"), message: `Password can't have special characters` }
                            ]}
                        >
                    <Input.Password

                        type={isPaswordVisible ? "text" : "password"}
                        onChange={(evt) => {
                            setNewPassword(evt.target.value);

                        }}
                        suffix={
                            isPaswordVisible ? (
                                <EyeOutlined
                                    onClick={() => {
                                        setIsPaswordVisible(!isPaswordVisible);
                                    }}
                                />
                            ) : (
                                <EyeInvisibleOutlined
                                    onClick={() => {
                                        setIsPaswordVisible(!isPaswordVisible);
                                    }}
                                />
                            )
                        }
                    />
                </Form.Item>
                </Form>
            </Modal>
        </>
    )
 }