import React,{ useEffect, useState} from "react";
import "antd/dist/antd.css";
import { PageHeader } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Modal, Form, Input, Button } from "antd";
import "./ChangePasswordForm";
export default function ChangePasswordModal() {
    
    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
            offset: 1,
        },
    };
    const [model, setModal] = useState({
        isOpen: true,
        isLoading: false,
    });
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
    });
    const [changeSuccess, setChangeSuccess] = useState(false);
    const [Footer, setFooter] = useState({});
    const [error, setError] = useState("");
    const [navTitle,setNavTitle] = useState('Home');
    
    


    return (
        <>
            <Modal
                afterClose={() => {
                    setError("");
                }}
                closable={false}
                cancelText='Cancel'
                okText='Save'
               okButtonProps={{style:{ background: "#e30c18", color: "white"}}}

                visible={model.isOpen}
                footer={[
                    <Button
                        className = "buttonSave"
                        loading={model.isLoading} key="save" onClick={() => {
                        setModal({ ...model, isLoading: true })
                        setTimeout(() => {
                            setModal({ ...model, isLoading: false })
                        }, 3000)
                        }
                    }>Save</Button>,
                    <Button
                        className = "buttonCancel"
                        disabled={model.isLoading === true} key="cancel" onClick={() => {
                        setModal({ ...model, isOpen: false });
                        setError("");
                    }
                    }>Cancel</Button>
                ]}
                onOk={() => {
                    axios
                        .put(`${process.env.REACT_APP_UNSPLASH_CHANGEPW_USER}`, password)
                        .then((response) => {

                            setChangeSuccess(true);

                            setFooter({
                                footer: (
                                    <Button
                                        className = "buttonCancel"
                                        onClick={() => {
                                            setFooter({});
                                            setChangeSuccess(false);
                                            setModal(false);
                                        }}
                                    >
                                        Close
                                    </Button>
                                ),
                            });
                        })
                        .catch((error) => {

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
                    setError("");
                }}
                destroyOnClose={true}
                title="Change Password"
                {...Footer}
            >
                {changeSuccess === false ? (
                    <Form {...formItemLayout}>
                        <Form.Item
                            name="Old Password"
                            style={{ marginTop: "20px" }}
                            label="Old Password"
                            rules={[{ required: true, min: 8,max: 15, }
                                , { pattern: new RegExp("^[a-zA-Z0-9]+$"), message: `Password can't have special characters` }
                            ]}
                        >
                            <Input.Password
                                disabled={model.isLoading === true}
                                className="inputForm"
                                onChange={(old) => {
                                    setPassword({ ...password, oldPassword: old.target.value });
                                }}
                            />
                            <p style={{ color: "red" }}>{error}</p>
                        </Form.Item>
                        
                        <Form.Item
                            name="New Password"
                            label="New Password"
                            rules={[{ required: true, min: 8, max: 15 },
                            { pattern: new RegExp("^[a-zA-Z0-9]+$"), message: `Password can't have special characters` }
                            ]}
                        >
                            <Input.Password
                                disabled={model.isLoading === true}
                                className="inputForm"
                                onChange={(newPass) => {
                                    setPassword({
                                        ...password,
                                        newPassword: newPass.target.value,

                                    });
                                }}
                            />
                        </Form.Item>
                    </Form>
                ) : (
                    <p>Your password has been changed successfully!</p>
                )}
            </Modal>
        </>
    );
}