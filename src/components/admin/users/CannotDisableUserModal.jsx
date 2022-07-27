import { Button, Modal } from "antd";
import React from "react";
import { useState } from "react";
import "../Modal.css"
import axios from "axios";
export default function CannotDisableUserModal(props){
    const [modal, setModal] = useState({
        isOpen: true,
        isLoading: false,
    });
    
    return (
        <Modal
        className = "modalInformation"
            
                title="Can not disable user"
                visible={modal.isOpen}
                width={400}
                closable={true}
                onCancel = {()=> {setModal({ ...modal, isOpen: false });
                                        props.setIsOpen();
                                    }}
                footer={[]}
                
                
                
            >
                <p>There are valid assignments belonging to this user. Please close all assignments before disabling user.</p>
                <br/>
            </Modal>
    );
}