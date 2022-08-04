import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle, faSortDown, faPencilAlt, faSortUp} from '@fortawesome/free-solid-svg-icons';
import "antd/dist/antd.css";
import {Row, Col, Form, Input, Select, Button, DatePicker, Radio, Cascader} from "antd";
import {Pagination} from "antd";
import "./TableAssignment.css"
import _ from "lodash";
import {ReloadOutlined, CloseCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import ViewInformation from "../../users/viewInformation/ViewInformation";
import ViewInformationAssignment from "../viewAssignments/ViewInforAssignment";
import { useNavigate } from "react-router-dom";


function TableAssignment(props) {
    const [displayList, setDisplayList] = useState(props.listAssignment);
    const [isModal, setModal] = useState({
        isOpen: false,
        isLoading: false,
    });
    const setIsOpen = () => {
        setModal({...isModal, isOpen: !isModal.isOpen})
    }
    const navigate = useNavigate();
    const [dataUser, setDataUser] = useState(false)
    const assignment = JSON.parse(localStorage.getItem("assignment"));
    const [wating,setWaiting] = useState("WAITING FOR ACCEPTANCE")



    useEffect(() => {
        if (props.listSort === null ) {
            setDisplayList([])
        } else {
            setDisplayList(props.listAssignment);
        }
    }, [props.listAssignment])

    useEffect(() => {
        if (props.listFilter !== null ) {
            setDisplayList(props.listFilter);
        } else
            setDisplayList([])

    }, [props.listFilter])

    useEffect(() => {
        if (props.listSort !== null) {
            setDisplayList(props.listSort);
        } else
            setDisplayList([])

    }, [props.listSort])


    return (
        <>
            {

                displayList.length === 0 ?
                        props.checkSearch ?
                            <>
                                <div className="data-notfound">
                                    <img style={{height: "260px", width: "260px"}}
                                         src={process.env.PUBLIC_URL + '/nodataload.png'}/>
                                    <p className="name-notfound">No Result Found</p>
                                    <p className="name-notfound-child">Please try again with another</p>
                                    <p className="name-notfound-child">keywords or maybe use generic term</p>
                                </div>

                            </>

                            :
                            <>
                                <LoadingOutlined
                                    style={{fontSize: "60px", color: "red", textAlign: "center", marginTop: "70px"}}/>
                            </>

                    :
                    <>

                        <tbody>
                            {
                                assignment === null ?
                                <></>
                                :
                                <>
                                {localStorage.removeItem('assignment')}
                                <tr >
                                    <td className="col_assignment col_no"   onClick={() => {
                                        setModal({...isModal, isOpen: true});
                                        setDataUser(assignment)

                                    }}
                                    >
                                        <p className="col no_col">{assignment.assignmentId}
                                        </p>
                                    </td>
                                    <td className="col_assignment col_assetCode" onClick={() => {
                                        setModal({...isModal, isOpen: true});
                                        setDataUser(assignment)

                                    }}>
                                        <p className="col assetCode_col">{assignment.assetCode}
                                        </p>
                                    </td>
                                    <td className="col_assignment col_assetName" onClick={() => {
                                        setModal({...isModal, isOpen: true});
                                        setDataUser(assignment)

                                    }}>
                                        <p className="col assetName_col">{assignment.assetName}
                                        </p>
                                    </td>
                                    <td className="col_assignment col_assignedTo" onClick={() => {
                                        setModal({...isModal, isOpen: true});
                                        setDataUser(assignment)

                                    }}>
                                        <p className="col assignedTo_col">{assignment.assignedTo}</p>
                                    </td>
                                    <td className="col_assignment col_assignmentBy" onClick={() => {
                                        setModal({...isModal, isOpen: true});
                                        setDataUser(assignment)

                                    }}>
                                        <p className="col assignmentBy_col">{assignment.assignedBy}
                                        </p>
                                    </td>
                                    <td className="col_assignment col_assignmentDate" onClick={() => {
                                        setModal({...isModal, isOpen: true});
                                        setDataUser(assignment)

                                    }}>
                                        <p className="col ssignmentDate_col"> {(assignment.assignedDate)}
                                        </p>
                                    </td>
                                    {
                                        assignment.state === "WAITING_FOR_ACCEPTANCE" ?
                                            <>
                                                <td className="col_assignment col_state" style={{width:"17% !importance"}} onClick={() => {
                                                    setModal({...isModal, isOpen: true});
                                                    setDataUser(assignment)

                                                }}>
                                                    <p className="col state_col">WAITING FOR ACCEPTANCE</p>
                                                </td>
                                            </>
                                            :
                                            <>
                                                <td className="col_assignment col_state" onClick={() => {
                                                    setModal({...isModal, isOpen: true});
                                                    setDataUser(assignment)

                                                }}>
                                                    <p className="col state_col">{assignment.state} </p>
                                                </td>

                                            </>

                                    }



                                    {
                                        assignment.state === "WAITING_FOR_ACCEPTANCE" ?
                                            <>
                                                <td className="btn_col_assignment edit " onClick={() => {
                                                        navigate("/editAssignment/" + assignment.assignmentId);
                                                    }}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                    <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
                                                </td>
                                                <td className="btn_col_assignment delete ">
                                                    <CloseCircleOutlined style={{color: "#F3AAAA"}}/>
                                                </td>
                                                <td className="btn_col_assignment reload ">
                                                    <ReloadOutlined style={{color: "black"}}/>
                                                </td>

                                            </>
                                            :
                                            <>
                                                <td className="btn_col_assignment edit">
                                                    <i className="fas fa-pencil-alt"></i>
                                                    <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
                                                </td>
                                                <td className="btn_col_assignment delete">
                                                    <CloseCircleOutlined style={{color: "red"}}/>
                                                </td>
                                                <td className="btn_col_assignment reload">
                                                    <ReloadOutlined style={{color: "blue"}}/>
                                                </td>

                                            </>

                                    }
                                </tr>
                                </>
                            }
                        {

                            displayList.map((item, index) => {
                                return <tr key={index}>
                                    <td className="col_assignment col_no"   onClick={() => {
                                        setModal({...isModal, isOpen: true});
                                        setDataUser(item)

                                    }}
                                    >
                                        <p className="col no_col">{item.assignmentId}
                                        </p>
                                    </td>
                                    <td className="col_assignment col_assetCode" onClick={() => {
                                        setModal({...isModal, isOpen: true});
                                        setDataUser(item)

                                    }}>
                                        <p className="col assetCode_col">{item.assetCode}
                                        </p>
                                    </td>
                                    <td className="col_assignment col_assetName" onClick={() => {
                                        setModal({...isModal, isOpen: true});
                                        setDataUser(item)

                                    }}>
                                        <p className="col assetName_col">{item.assetName}
                                        </p>
                                    </td>
                                    <td className="col_assignment col_assignedTo" onClick={() => {
                                        setModal({...isModal, isOpen: true});
                                        setDataUser(item)

                                    }}>
                                        <p className="col assignedTo_col">{item.assignedTo}</p>
                                    </td>
                                    <td className="col_assignment col_assignmentBy" onClick={() => {
                                        setModal({...isModal, isOpen: true});
                                        setDataUser(item)

                                    }}>
                                        <p className="col assignmentBy_col">{item.assignedBy}
                                        </p>
                                    </td>
                                    <td className="col_assignment col_assignmentDate" onClick={() => {
                                        setModal({...isModal, isOpen: true});
                                        setDataUser(item)

                                    }}>
                                        <p className="col ssignmentDate_col"> {(item.assignedDate)}
                                        </p>
                                    </td>
                                    {
                                        item.state === "WAITING_FOR_ACCEPTANCE" ?
                                            <>
                                                <td className="col_assignment col_state" style={{width:"17% !importance"}} onClick={() => {
                                                    setModal({...isModal, isOpen: true});
                                                    setDataUser(item)

                                                }}>
                                                    <p className="col state_col">WAITING FOR ACCEPTANCE</p>
                                                </td>
                                            </>
                                            :
                                            <>
                                                <td className="col_assignment col_state" onClick={() => {
                                                    setModal({...isModal, isOpen: true});
                                                    setDataUser(item)

                                                }}>
                                                    <p className="col state_col">{item.state} </p>
                                                </td>

                                            </>

                                    }



                                    {
                                        item.state === "WAITING_FOR_ACCEPTANCE" ?
                                            <>
                                                <td className="btn_col_assignment edit " onClick={() => {
                                                        navigate("/editAssignment/" + item.assignmentId);
                                                    }}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                    <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
                                                </td>
                                                <td className="btn_col_assignment delete ">
                                                    <CloseCircleOutlined style={{color: "#F3AAAA"}}/>
                                                </td>
                                                <td className="btn_col_assignment reload ">
                                                    <ReloadOutlined style={{color: "black"}}/>
                                                </td>

                                            </>
                                            :
                                            <>
                                                <td className="btn_col_assignment edit">
                                                    <i className="fas fa-pencil-alt"></i>
                                                    <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
                                                </td>
                                                <td className="btn_col_assignment delete">
                                                    <CloseCircleOutlined style={{color: "red"}}/>
                                                </td>
                                                <td className="btn_col_assignment reload">
                                                    <ReloadOutlined style={{color: "blue"}}/>
                                                </td>

                                            </>

                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </>
            }
            {isModal.isOpen ?
                <div>
                    <ViewInformationAssignment isVisible={setIsOpen} dataUser={dataUser}/>
                </div>

                :
                ""
            }
        </>
    )
}


export default (TableAssignment)