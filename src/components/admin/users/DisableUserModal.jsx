import { Button, Modal } from "antd";
import React from "react";
import { useState } from "react";
import "../Modal.css"
import axios from "axios";
export default function DisableUserModal(props){
    const loginState = JSON.parse(localStorage.getItem("loginState"));
    const [modal, setModal] = useState({
        isOpen: true,
        isLoading: false,
    });
    const config = {
        headers: { Authorization: `Bearer ${loginState.token}` }
    };
    const [id, setId] = useState(props.id);
    const handleDisable = () => {
        console.log(props.id);
        axios.delete(`http://localhost:8080/api/account/`+id, config)
            .then(
           () => {
                setModal({ ...modal, isOpen: false })
                window.location.reload();
            }).catch(() => {

                // setDeleteModal({
                //     ...deleteModal, isOpen: true
                //     , footer: null
                //     , title: 'Can not disable user'
                //     , content: (<p>
                //         There are valid assignments belonging to this user. Please Close all assignments before disabling user.
                //     </p>),
    
                // })
            })
        }
    
    
    return (
        <Modal
        className = "modalConfirm"
            
                title="Are you sure?"
                visible={modal.isOpen}
                width={400}
                closable={false}
                onOk={handleDisable}
                onCancel = {()=> {setModal({ ...modal, isOpen: false });
                                        props.setIsOpen();
            }}
                
                footer={[
                    <Button key="submit" className="buttonSave" onClick={handleDisable}>
                     Disable
                    </Button>,
                    <Button key="cancel" className = "buttonCancel" onClick={()=> {setModal({ ...modal, isOpen: false });
                    props.setIsOpen();}}>
                      Cancel
                    </Button>
                  ]}
                
            >
                <p>Do you want to disable this user?</p>
                <br/>
            </Modal>
    );
}