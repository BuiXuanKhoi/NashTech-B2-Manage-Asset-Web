import React,{ useEffect, useState} from "react";
import "antd/dist/antd.css";
import axios from "axios";
import "antd/dist/antd.css";
import { Modal, Form, Input, Button } from "antd";
import "../changePassword/ChangePasswordForm.css";
import toast, { Toaster } from 'react-hot-toast';
export default function ChangePasswordModal(props) {

    const loginState = JSON.parse(localStorage.getItem("loginState"));
    const [error, setError] = useState("");
    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
            offset: 1,
        },
    };
    const [modal, setModal] = useState({
        isOpen: true,
        isLoading: false,
    });
    const [password, setPassword] = useState({
        old_password: "",
        new_password: "",
    });
    const [changeSuccess, setChangeSuccess] = useState(false);
    const [Footer, setFooter] = useState({});
    const [oldEmpty,setOldEmpty] = useState(false);
    const [newEmpty,setNewEmpty] = useState(false);
    const config = {
        headers: { Authorization: `Bearer ${loginState.token}` }
    };

    const checkPassword = (callback) => {
        if(error == ""){
            callback();
            return;
        }
        callback("Password is incorrect");
    }
    return (
        <>
            <Modal
                style={{positon: 'absolute', top: 200, right: -170}}
                closable={false}
                cancelText='Cancel'
                okText='Save'
                maskClosable={false}
                okButtonProps={{style:{ background: "#e30c18", color: "white"}}}

                visible={modal.isOpen}
                footer={[
                    <Button
                        disabled={(oldEmpty && newEmpty) ? false : true}
                        className = "buttonSaveChangePassword"
                        loading={modal.isLoading} key="save" onClick={() => {
                        setModal({ ...modal, isLoading: true })
                        setTimeout(() => {
                            setModal({ ...modal, isLoading: false })
                        }, 3000)
                        axios
                            // .put(`${process.env.CHANGEPASSWORD_USERURL}`+ loginState.id, password,config)
                            .put("https://asset-assignment-be.azurewebsites.net/api/account/"+ loginState.id, password,config)
                            .then(() => {

                                setChangeSuccess(true);

                                setFooter({
                                    footer: (
                                        <Button
                                            className = "buttonSaveChangePassword"
                                            onClick={() => {
                                                setFooter({});
                                                setChangeSuccess(false);
                                                setModal({ ...modal, isOpen: false });
                                                props.setIsOpen();
                                            }}
                                        >
                                            Close
                                        </Button>
                                    ),
                                });
                            })
                            .catch((error) => {
                                console.log(error.response.data.message);
                                setModal({ ...modal, isOpen: true });
                                    setError(error.response.data.message);
                            })
                    }
                    }>Save</Button>,
                    <Button
                        className = "buttonCancelChangePassword"
                        disabled={modal.isLoading === true} key="cancel" onClick={() => {
                        setModal({ ...modal, isOpen: false });
                        props.setIsOpen();
                    }
                    }>Cancel</Button>
                ]}
                onOk={() => {
                    axios
                        // .put(`${process.env.CHANGEPASSWORD_USERURL}`+ loginState.id, password,config)
                        .put("https://asset-assignment-be.azurewebsites.net/api/account/"+ loginState.id, password,config)

                        .then((response) => {

                            setChangeSuccess(true);

                            setFooter({
                                footer: (
                                    <Button
                                        className = "buttonCancelChangePassword"
                                        onClick={() => {
                                            setFooter({});
                                            setChangeSuccess(false);
                                            setModal(false);
                                            props.setIsOpen();
                                        }}
                                    >
                                        Close
                                    </Button>
                                ),
                            });
                        })
                        .catch((error) => {
                            console.log(error.response.data.message)

                            if (!error.response.data.title) {

                                setModal(true);
                                setError(error.response.data.message);
                            } else {
                                setModal(true);
                                setError(error.response.data.title);
                            }
                        });
                }}
                onCancel={() => {
                    setModal(false);
                }}
                destroyOnClose={true}
                title="Change Password"
                {...Footer}
            >
                {changeSuccess === false ? (
                    <Form {...formItemLayout} className="formChangePassword">
                        <Form.Item
                            name="oldPassword"
                            label="Old password"
                            rules={[
                            { pattern: new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,15}$"), message: `Password must have uppercase,number,special character, length between 8 and 15` }
                            ]}
                        >
                            <Input.Password
                                status={(error != "") ? "error" : ""}
                                disabled={modal.isLoading === true}
                                className="inputForm"
                                onChange={(old) => {
                                    setPassword({ ...password, old_password: old.target.value });
                                    setOldEmpty(old.target.value !== "" ? true : false);
                                    setError("");
                                }}
                            />
                            
                        </Form.Item>
                        <Form.Item
                        style={{marginLeft: 125,color: "red"}}
                         name="errorIncorrectPassword">
                        {/* <p id="errorOldPassword"> */}
                        {error}
                        {/* </p> */}
                        </Form.Item>
                        <Form.Item
                        style={{marginBottom: 20 }}
                            name="newPassword"
                            label="New password"
                            rules={[
                            { pattern: new RegExp("^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,15}$"), message: `Password must have uppercase,number,special character, length between 8 and 15` }
                            ]}
                        >
                            <Input.Password
                                disabled={modal.isLoading === true}
                                className="inputForm"
                                onChange={(newPass) => {
                                    setPassword({
                                        ...password,
                                        new_password: newPass.target.value,

                                    });
                                    setNewEmpty(newPass.target.value !== "" ? true : false);
                                    setError("");
                                }}
                            />
                        </Form.Item>
                    </Form>
                ) : (
                    <p>Your password has been changed successfully!</p>
                )}
            </Modal>
            {/* <Toaster
                toastOptions={{
                    className: 'toast',
                    style: {
                        border: '1px solid #713200',
                        padding: '36px',
                        color: '#713200',

                    },
                }}
            /> */}
        </>
    );
}