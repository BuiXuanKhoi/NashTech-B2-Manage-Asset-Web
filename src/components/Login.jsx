import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Context } from "../App";
import { Input, Spin, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
// import "../../src/styles/Styles.css";
import Header from "../components/Header";
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
                .post(`https://asset-assignment-be.azurewebsites.net/api/login`, {
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

                    axios.defaults.headers.common["Authorization"] =
                        "Bearer " + response.data.token;
                })

                .catch((error) => {
                    toast.error(error.response.data.message);
                    setLoging(LOGING.FAIL);
                    axios.defaults.headers.common["Authorization"] = "";
                    // setError(error.response.data.message);
                    console.log(error.response.data);


                });
        },

    });

    const classes = styles();
    const antIcon = <LoadingOutlined style={{ fontSize: "24px" }} spin />;
    return (
        <>
            <Header />

            <div className={classes.formContainer}>
                <div className={classes.container}>
                    <h2 style={{ color: "red", fontWeight: "bold" }}>Welcome to Online Asset Management</h2>
                </div>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    {/* <img
                        alt="logo"
                        disabled
                        width={100}
                        src="https://assets-global.website-files.com/5da4969031ca1b26ebe008f7/602e42d8ec61635cd4859b25_Nash_Tech_Primary_Pos_sRGB.png"
                    /> */}
                    <div className={classes.inputGroup}>
                        <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
                        <label className="text__label" htmlFor="username" style={{ color: "#625e5f", fontWeight: "bold", display: "inline-flex", marginRight: "10px", }}>Username <p className="star_label" style={{ color: "red", fontSize: "12px" }}>*</p></label>
                        <Input
                            type="username"
                            // placeholder="Username"
                            className={classes.formInput}
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                    </div>


                    <div className={classes.validContainer}>
                        {formik.touched.username && formik.errors.username ? (
                            <p className={classes.validationText}>{formik.errors.username}</p>
                        ) : null}
                    </div>

                    <div className={classes.inputGroup1}>
                        <label className="text__label" htmlFor="password" style={{ color: "#625e5f", fontWeight: "bold", display: "inline-flex", marginRight: "10px", }}>Password <p className="star_label" style={{ color: "red", fontSize: "12px" }}>*</p></label>
                        <Input
                            type={isPasswordVisible ? "text" : "password"}
                            // placeholder="Password"
                            className={classes.formInput}
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



                    <div className={classes.validContainer}>
                        {formik.touched.password && formik.errors.password ? (
                            <p className={classes.validationText}>{formik.errors.password}</p>
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


const styles = makeStyles({

    form: {
        backgroundColor: "#FFF",
        padding: "24px 90px",
        borderBottomRightRadius: "6px",
        borderBottomLeftRadius: "6px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // boxShadow: "-10px 10px 10px -5px rgba(0,0,0,0.75)",
        color: "white",

        border: "1px solid gray",
    },
    formContainer: {
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },

    container: {


        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "#eff1f5",
        border: "1px solid #000000",
        borderRadius: "6px",
        height: "56px",
        paddingTop: "10px",
        padding: "0px 48px",



    },

    inputGroup: {
        display: "inline-flex",
        width: "100%",
        alignItems: "center",



    },

    text__label: {
        display: "inline-flex",


    },

    inputGroup1: {
        display: "flex",
        width: "100%",
        alignItems: "center",

    },

    formInput: {
        width: "100%",
        margin: "10px",
        height: "40px",
        borderRadius: "5px",
        border: "1px solid gray",
        padding: "5px",
        fontFamily: "'Roboto', sans-serif",
        color: "black",
        backgroundColor: "white",
    },
    formSubmit: {
        width: "50%",
        padding: "10px",
        borderRadius: "5px",
        color: "white !important",
        fontWeight: "bold",
        fontsize: "30px",
        background: "red",
        border: "2px solid red",
        fontFamily: "'Roboto', sans-serif",
        cursor: "pointer",

    },
    formMarketing: {
        display: "flex",
        margin: "20px",
        alignItems: "center",
    },
    validationText: {
        margin: "0px",
        fontSize: "1em",
        color: "red",
    },
    validContainer: {
        height: "20px",
    },


});


export default Login;


