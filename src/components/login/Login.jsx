import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Context } from "../../App";
import { Input, Spin, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import Header from "../header/Header";
import "./Login.css"
import toast, { Toaster } from 'react-hot-toast';




const LOGING = {
    LOADING: 'loading',
    FAIL: 'fail',
    SUCCESS: 'success',
    NONE: 'none'
}
const Login = () => {





    const [loginState, setLoginState] = useContext(Context);
    const [isLoging, setLoging] = useState(LOGING.NONE);
    const [error, setError] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object({
            username: Yup.string().required("Required !"),
            password: Yup.string()
                .min(8, "Must be at least 8 characters !")
                .required("Required !"),
        }),

        onSubmit: () => {
            setLoging(LOGING.LOADING)

            axios
                .post("https://asset-assignment-be.azurewebsites.net/api/login", {
                
                    username: formik.values.username,
                    password: formik.values.password,
                })
                .then((response) => {
                    setLoginState({
                        ...loginState,
                        token: response.data.token,
                        isLogin: true,
                        role: response.data.roles,
                        username: response.data.username,
                        isfirstlogin: response.data.first_login,
                        id: response.data.id,
                    });
                    localStorage.setItem(
                        "loginState",
                        JSON.stringify({
                            token: response.data.token,
                            isLogin: true,
                            role: response.data.roles,
                            username: response.data.username,
                            isfirstlogin: response.data.first_login,
                            id: response.data.id,
                        })
                    );

                  
                })

                .catch((error) => {
                    toast.error(error.response.data.message);
                    setLoging(LOGING.FAIL);
                    


                });
        },

    });

    
    const antIcon = <LoadingOutlined style={{ fontSize: "24px" }} spin />;
    return (
        <>
            <Header />

            <div className="formContainer">
                <div className="container">
                    <h2 style={{ color: "red", fontWeight: "bold" }}>Welcome to Online Asset Management</h2>
                </div>
                <form className="form" onSubmit={formik.handleSubmit}>
                   
                    <div className="inputGroup">
                        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
                        <label className="text__label" htmlFor="username" style={{ color: "#625e5f", fontWeight: "bold", display: "inline-flex", marginRight: "10px", }}>Username <p className="star_label" style={{ color: "red", fontSize: "12px" }}>*</p></label>
                        <Input
                            type="username"
                            
                            className="formInput"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                    </div>


                    <div className="validContainer">
                        {formik.touched.username && formik.errors.username ? (
                            <p className="validationText">{formik.errors.username}</p>
                        ) : null}
                    </div>

                    <div className="inputGroup1">
                        <label className="text__label" htmlFor="password" style={{ color: "#625e5f", fontWeight: "bold", display: "inline-flex", marginRight: "10px", }}>Password <p className="star_label" style={{ color: "red", fontSize: "12px" }}>*</p></label>
                        <Input
                            type={isPasswordVisible ? "text" : "password"}
                           
                            className="formInput"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            suffix={
                                isPasswordVisible ? (
                                    <EyeOutlined
                                        onClick={() => {
                                            setIsPasswordVisible(!isPasswordVisible);
                                        }}
                                    />
                                ) : (
                                    <EyeInvisibleOutlined
                                        onClick={() => {
                                            setIsPasswordVisible(!isPasswordVisible);
                                        }}
                                    />
                                )
                            }
                        />
                    </div>



                    <div className="validContainer">
                        {formik.touched.password && formik.errors.password ? (
                            <p className="validationText">{formik.errors.password}</p>
                        ) : null}
                    </div>

                    <Button disabled={isLoging === LOGING.LOADING} htmlType="submit" style={{ width: "100px", height: "40px", background: "#e30c18", color: "white", left: "90px", }}>
                        <span>
                            {isLoging === LOGING.LOADING ? <Spin indicator={antIcon} /> :
                                isLoging === LOGING.FAIL ? <div className="text-danger">Login</div> :
                                    "Login"}
                        </span>

                    </Button>
                </form>
            </div>
            
            <lord-icon
    src="https://cdn.lordicon.com/mrjuyheh.json"
    trigger="hover"
    style={{width:"250px",height:"250px"}}>
</lord-icon>

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
    );
};





export default Login;


