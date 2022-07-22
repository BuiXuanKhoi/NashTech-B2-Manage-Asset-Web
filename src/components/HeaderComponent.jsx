import React,{ useState } from "react";
import "antd/dist/antd.css";
import { DownOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Menu, Dropdown, Modal, Form, Input, Button } from "antd";
import { PageHeader } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import { useLocation } from "react-router-dom";
import { AppRoutes } from "../routes/AppRoutes";
import "../styles/Styles.css";
import ChangePasswordModal from './changePassword/ChangePasswordModal';
import ChangePasswordFirstLogin from "./changePassword/ChangePasswordFirstLogin";

export default function HeaderComponent(props) {
    
    const [isModal, setModal] = useState({
        isOpen: false,
        isLoading: false,
    });
    const setIsOpen = () => {
        setModal({...isModal, isOpen: !isModal.isOpen})
    }
    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
    });
    const [changeSuccess, setChangeSuccess] = useState(false);
    const [Footer, setFooter] = useState({});
    const [error, setError] = useState("");
    const [navTitle,setNavTitle] = useState('Home');
    let {pathname} = useLocation()
     
    const [firstLogin,setFirstLogin] = useState(false);

    React.useEffect(() => {
        AppRoutes.forEach(
            route=>{
                 if(route.path === pathname.replace(/\d+/g,':id')){
                     setNavTitle(route.title)
                 }
            }
        )
        // const loginState = JSON.parse(localStorage.getItem("loginState"));
        // setFirstLogin(loginState.isfirtlogin)
    })
// console.log(firstLogin);
    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 16,
            offset: 1,
        },
    };

    const handleConfirmLogout = () => {
        Modal.confirm({
           
            title: "Are you sure?",
            icon: <LogoutOutlined style={{ color: 'red' }} />,
            content: "Do you want to log out?",
            okText: "Logout",
            cancelText: "Cancel",
            okButtonProps:{style:{ background: "#e30c18", color: "white"}},
            
            onOk() {
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 5000);
                    localStorage.removeItem("loginState");
                    //axios.get(`${process.env.REACT_APP_UNSPLASH_LOGOUT}`);
                    //window.location.href = `${process.env.REACT_APP_UNSPLASH_BASEFEURL}`;
                    window.location.href = "https://asset-assignment-fe.azurewebsites.net/";
                })
            },
            onCancel() {
            },
            
        });
    };

    const dropdownuser = (
        <Menu>



            <Menu.Item
                key="change password"
                onClick={() => {
                    setModal({ ...isModal, isOpen: true });
                }}
            >
                <UserOutlined style={{color: 'red', fontWeight:"bold"}}/> Change Password
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item onClick={handleConfirmLogout} key="3">
               <LogoutOutlined style={{color: 'red', fontWeight: "bold"}} /> Logout
            </Menu.Item>
        </Menu>
    );

   

    return (
        <>
        
            <PageHeader
                className="site-page-header"
                
            >
                <span style={{ color:'white',float: 'left',marginLeft:'20px', fontSize: "16px", fontWeight:"bold" }} >{navTitle}</span>
                <Dropdown  overlay={dropdownuser} trigger={["click"]}>
                    <a
                        style={{
                            float: "right",
                            margin: "auto",
                            fontSize: "20px",
                            color: "white",
                            marginRight:'30px'
                        }}
                        onClick={(e) => e.preventDefault()}
                        href="/#"
                    >
                        {props.username} <DownOutlined />
                    </a>
                </Dropdown>
            </PageHeader>
            {console.log(props.isLogin)}
            <ChangePasswordFirstLogin isOpen={props.isLogin} idAccount={props.idAccount} token={props.token}/>
            {isModal.isOpen ? <ChangePasswordModal setIsOpen={setIsOpen}/> : ""}
        </>
    );
}
