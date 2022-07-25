import React, {useState} from "react";
import {Modal, Input, Button, Form} from "antd";
import {EyeOutlined, EyeInvisibleOutlined} from "@ant-design/icons";
import axios from "axios";
import "antd/dist/antd.css";
import "../changePassword/ChangePasswordForm.css";
import toast, { Toaster } from 'react-hot-toast';

export default function ChangePasswordFirstLogin(props) {
    console.log(props.isOpen);
    const config = {
        headers: { Authorization: `Bearer ${props.token}` }
    };
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
    const [isNotEmpty,setNotEmpty] = useState(true);
    const [Loading, setLoading] = useState({
        isLoading: false
    })
    const [password, setPassword] = useState({
        old_password: "",
        new_password: "",
    });
    const handleOk = () => {
        axios
            // .put(`${process.env.CHANGEPASSWORD_USERURL}`+ props.idAccount, password,config)
            .put("https://asset-assignment-be.azurewebsites.net/api/account/"+  props.idAccount, password,config)
            .then(function (response) {
                setIsModalVisible(false);
                let loginState = JSON.parse(localStorage.getItem('loginState'));
                localStorage.setItem(
                    "loginState",
                    JSON.stringify({
                        token: loginState.token,
                        isLogin: true,
                        role: loginState.roles,
                        username: loginState.username,
                        isfirstlogin: false,
                        id: loginState.id,
                    })
                );
            })
            .catch((error) => {
                toast.error(error.response.data.message);

                console.log(error.response.data.message)

            });
    };
    return (
        <>
            <Modal
                style={{positon: 'absolute', top: 200, right: -170}}
                title="Change Password"
                visible={isModalVisible}
                maskClosable={false}
                onOk={handleOk}
                footer={[
                    <Button
                        disabled={isNotEmpty}
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
                <p id="titleChangePassword" style={{fontFamily: "bold", fontSize: "16px"}}>
                    This is first time you logged in <br />
                    You have to change your password to continue.
                </p>
                <Form {...formItemLayout}>
                <Form.Item 
                            name="newPassword1st"
                            label="New password"
                            rules={[
                            { pattern: new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,15}$"), message: `Password must have uppercase,number,special character, length between 8 and 15` }
                            ]}
                        >
                    <Input.Password

                        type={isPaswordVisible ? "text" : "password"}
                        onChange={(newPass) => {
                                    setPassword({
                                        ...password,
                                        new_password: newPass.target.value,

                                    });
                                    setNotEmpty(false);
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

            <Toaster
                toastOptions={{
                    className: 'toast',
                    style: {
                        border: '1px solid #713200',
                        padding: '36px',
                        color: '#713200',

                    },
                }}
            />
        </>
    )
 }