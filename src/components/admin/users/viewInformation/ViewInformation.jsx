import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import axios from "axios";
import toast from "react-hot-toast";
import "./ViewInformation.css"
import {CloseSquareOutlined} from "@ant-design/icons";
import TableUser from "../tableUser/TableUser";

function CloseOutlined() {
    return null;
}

export default function ViewInformation(props){
    console.log("check " + props.isVisible)
    console.log(props.dataUser)


    const [isModalVisible, setIsModalVisible] = useState(true);
    const [checkhide, setCheckHide] = useState(false);


    // useEffect(() => {
    //     setIsModalVisible(props.isVisible)
    // }, []);

    console.log("check is "+isModalVisible)

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        props.isVisible();
    };

    useEffect(() => {
        console.log(isModalVisible);
    }, []);



    return (
        <>
            <Modal className="view-information"
                   closable={true}
                   onCancel={handleCancel}
                   footer={null}
                   maskStyle={{opacity:0.1 }}
                   title="Detailed User Information"
                   visible={isModalVisible}
                   style={{left:"190px" , marginTop:"10px"}}
                   closeIcon={<CloseSquareOutlined />}
                >
                <div className="satff-code">
                    <p className="text-view-information">Staff Code</p>
                    <p className="text-view-information" id="data-staff">{props.dataUser.staffCode}</p>
                </div>
                <div className="full-name">
                    <p className="text-view-information">Full Name</p>
                    <p className="text-view-information" id="data-fullname">{props.dataUser.lastName+" " + props.dataUser.firstName}</p>
                </div>
                <div className="username">
                    <p className="text-view-information">Username</p>
                    <p className="text-view-information" id="data-username">{props.dataUser.userName}</p>
                </div>
                <div className="day-of-birth">
                    <p className="text-view-information">Day of birth</p>
                    <p className="text-view-information" id="data-dayofbirth" style={{paddingLeft:"43px"}}>{props.dataUser.dateOfBirth}</p>
                </div>
                <div className="gender">
                    <p className="text-view-information">Gender</p>
                    <p className="text-view-information" id="data-gender" style={{paddingLeft:"82px"}}>{props.dataUser.gender}</p>
                </div>
                <div className="join-date">
                    <p className="text-view-information">Joint Date</p>
                    <p className="text-view-information" id="data-joindate">{props.dataUser.joinedDate}</p>
                </div>
                <div className="type">
                    <p className="text-view-information">Type</p>
                    <p className="text-view-information" id="data-type" style={{paddingLeft:"102px"}}>{props.dataUser.roleName}</p>
                </div>
                <div className="location" style={{marginBottom:"30px"}}>
                    <p className="text-view-information">Location</p>
                    <p className="text-view-information" id="data-location" style={{paddingLeft:"70px" }}>{props.dataUser.locations}</p>
                </div>

            </Modal>

        </>
    )
}
