import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import { Button, Modal } from 'antd';
import "./ViewInfo.css"
import {CloseSquareOutlined} from "@ant-design/icons";

export default function ViewInformationAssignment(props){
    const [isModalVisible, setIsModalVisible] = useState(true);
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
                   title="Detailed Assignment Information"
                   visible={isModalVisible}
                   style={{left:"190px" , marginTop:"10px"}}
                   closeIcon={<CloseSquareOutlined />}
            >
                <div className="asset-code">
                    <p className="text-view-information">Asset Code</p>
                    <p className="text-view-information" id="data-asset-code">{props.dataUser.assetCode}</p>
                </div>
                <div className="asset-name">
                    <p className="text-view-information" >Asset Name</p>
                    <p className="text-view-information" id="data-asset-name" style={{paddingLeft:"55px"}}>{props.dataUser.assetName}</p>
                </div>
                <div className="specification">
                    <p className="text-view-information">Specification</p>
                    <p className="text-view-information" id="data-specification" style={{paddingLeft:"50px"}} >{props.dataUser.note}</p>
                </div>
                <div className="assigned-to">
                    <p className="text-view-information">Assigned to</p>
                    <p className="text-view-information" id="data-assigned-to" style={{paddingLeft:"55px"}}>{props.dataUser.assignedTo}</p>
                </div>
                <div className="assigned-by">
                    <p className="text-view-information">Assigned by</p>
                    <p className="text-view-information" id="data-assigned-by" style={{paddingLeft:"54px"}}>{props.dataUser.assignedBy}</p>
                </div>
                <div className="assigned-date">
                    <p className="text-view-information">Assigned Date</p>
                    <p className="text-view-information" id="data-assigned-date" style={{paddingLeft:"40px"}}>{props.dataUser.assignedDate}</p>
                </div>
                <div className="state">
                    <p className="text-view-information">State</p>
                    <p className="text-view-information" id="data-state" style={{paddingLeft:"97px"}}>{props.dataUser.state}</p>
                </div>
                <div className="note" style={{marginBottom:"30px"}}>
                    <p className="text-view-information">Note</p>
                    <p className="text-view-information" id="data-note" style={{paddingLeft:"97px" }}>{props.dataUser.note}</p>
                </div>

            </Modal>

        </>
    )
}
