import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faSortDown, faPencilAlt ,faSortUp} from '@fortawesome/free-solid-svg-icons'
import "./TableUser.css"
import {
    FilterOutlined,
    EditFilled,
    CloseCircleOutlined,
    LoadingOutlined,
    CloseSquareOutlined
} from "@ant-design/icons";
import axios from 'axios';
import ViewInformation from "../viewInformation/ViewInformation";
import DisableUserModal from '../DisableUserModal';
import Modal from 'antd/lib/modal/Modal';
import { useNavigate } from "react-router-dom";


function TableUser(props) {
    const navigate = useNavigate();
    const [displayList, setDisplayList] = useState(props.listUser);
    const[oder,setOder] = useState("ASC")
    const[oder1,setOder1] = useState("ASC")
    const[oder2,setOder2] = useState("ASC")
    const[sortDay,setSortDay] = useState("ASC")

    const [loading, setLoading] = useState(false);
    const[dataUser, setDataUser] = useState(false)
    const [idAccount, setId] = useState(0);
    const [isModal, setModal] = useState({
        isOpen: false,
        isLoading: false,
    });
    const [modalCanNotDisable, setModalNotDisable] = useState(false);
    const [modalConfirmDisable, setModalConfirmDisable] = useState({
        isOpen: false,
        isLoading: false,
    });
    const setIsOpen = () => {
        setModal({...isModal, isOpen: !isModal.isOpen})
    }
    const setIsOpenConfirm = () => {
        setModalConfirmDisable({...modalConfirmDisable, isOpen: !modalConfirmDisable.isOpen})
    }
    const loginState = JSON.parse(localStorage.getItem("loginState"));
    
    useEffect(() => {
        if(props.listFilter === null) {
            setDisplayList([])
        }
        else
            setDisplayList(props.listUser);


    },[props.listUser]  )
    useEffect(() => {
        if(props.listFilter !== null)
            setDisplayList(props.listFilter);
        else
            setDisplayList([])

    },[props.listFilter]  )




    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2500);
    }, []);


    function formatDate(joinedDate) {
        let date = new Date(joinedDate);
        return date.toLocaleDateString("vi-Vi");
    }


    function sort(rule) {
        switch (rule) {
            case 'id':
            {
                console.log("id")
                break;
            }
            case 'firstName':
            {
                console.log("firstName")

                break;
            }
            case 'joinDate':
            {
                console.log("joinDate")

                break;
            }
            case 'role':
            {
               console.log("role")
                break;
            }
            default:
                break;
        }
    }
    const sorting_staff = (col) =>{
        if(oder ==="ASC"){
            const sorted =[...displayList].sort((a,b)=>
                a[col].toLowerCase() > b[col].toLowerCase() ?1:-1
            )
            setDisplayList(sorted);
            setOder("DSC")
        }
        if(oder ==="DSC"){
            const sorted =[...displayList].sort((a,b)=>
                a[col].toLowerCase() < b[col].toLowerCase() ?1:-1
            )
            setDisplayList(sorted);
            setOder("ASC")

        }
    }
    const sorting_fullname = (col) =>{
        if(oder1 ==="ASC"){
            const sorted =[...displayList].sort((a,b)=>
                a[col].toLowerCase() > b[col].toLowerCase() ?1:-1
            )
            setDisplayList(sorted);
            setOder1("DSC")
        }
        if(oder1 ==="DSC"){
            const sorted =[...displayList].sort((a,b)=>
                a[col].toLowerCase() < b[col].toLowerCase() ?1:-1
            )
            setDisplayList(sorted);
            setOder1("ASC")

        }
    }
    const sorting_type = (col) =>{
        if(oder2 ==="ASC"){
            const sorted =[...displayList].sort((a,b)=>
                a[col].toLowerCase() > b[col].toLowerCase() ?1:-1
            )
            setDisplayList(sorted);
            setOder2("DSC")
        }
        if(oder2 ==="DSC"){
            const sorted =[...displayList].sort((a,b)=>
                a[col].toLowerCase() < b[col].toLowerCase() ?1:-1
            )
            setDisplayList(sorted);
            setOder2("ASC")

        }
    }
    const sorting_day = (col) =>{
        if(sortDay ==="ASC"){
            const sorted =[...displayList].sort((a,b)=>
                a[col].getTime() > b[col].getTime() ?1:-1
            )
            setDisplayList(sorted);
            setSortDay("DSC")
        }
        if(sortDay ==="DSC"){
            const sorted =[...displayList].sort((a,b)=>
                a[col].getTime() < b[col].getTime() ?1:-1
            )
            setDisplayList(sorted);
            setSortDay("ASC")

        }
    }
    console.log("display" + isModal.isOpen)
    const onDisable = (id) => {
        setId(id);
        console.log(idAccount)
        axios.get(`https://asset-assignment-be.azurewebsites.net/api/assignment/`,{ headers: { Authorization: `Bearer ${loginState.token}` },
        params: { account: id }})
            .then(
           (response) => {
            console.log(response.data.message)
            setModalConfirmDisable({ ...modalConfirmDisable, isOpen: true });
            }).catch((error) => {
                if(error.response.data.message === "User not detected"){
                    //toast.error(error.response.data.message);
                }
                else{
                    console.log(error)
                    setModalNotDisable({ ...modalCanNotDisable, isOpen: true })
                }
            })
    }



    return (
        <>
        {
            displayList.length === 0 ?
                <>
                    <h2>No data</h2>
                </>
                :
                <div className="results-section">
                    <div className="user_table">
                        {!loading ?
                            <table>
                                <thead>
                                <tr>
                                    <th className="col" onClick={() => {
                                        sort('id')
                                    }}>
                                        <p className="col_1 staff_code_col">Staff Code
                                            {oder === "ASC" ?
                                                <FontAwesomeIcon style={{marginLeft: "0.3rem"}}
                                                                 onClick={() => sorting_staff("staffCode")}
                                                                 icon={faSortDown}></FontAwesomeIcon>
                                                :
                                                <FontAwesomeIcon style={{marginLeft: "0.3rem"}}
                                                                 onClick={() => sorting_staff("staffCode")}
                                                                 icon={faSortDown}></FontAwesomeIcon>
                                            }
                                        </p>
                                    </th>
                                    <th className="col" onClick={() => {
                                        sort('firstName')
                                    }}>
                                        <p className=" col_1 full_name_col">Full Name
                                            {oder1 === "ASC" ?
                                                <FontAwesomeIcon style={{marginLeft: "0.3rem"}}
                                                                 onClick={() => sorting_fullname("firstName")}
                                                                 icon={faSortDown}></FontAwesomeIcon>
                                                :
                                                <FontAwesomeIcon style={{marginLeft: "0.3rem"}}
                                                                 onClick={() => sorting_fullname("firstName")}
                                                                 icon={faSortDown}></FontAwesomeIcon>
                                            }
                                        </p>
                                    </th>
                                    <th className="col">
                                        <p className="col_1 username_col">Username</p>
                                    </th>
                                    <th className="col" onClick={() => {
                                        sort('joinDate')
                                    }}>
                                        <p className="col_1 joined_day_col">Joined Date

                                            {sortDay === "ASC" ?
                                                <FontAwesomeIcon style={{marginLeft: "0.3rem"}}
                                                                 onClick={() => sorting_fullname("firstName")}
                                                                 icon={faSortDown}></FontAwesomeIcon>
                                                :
                                                <FontAwesomeIcon style={{marginLeft: "0.3rem"}}
                                                                 onClick={() => sorting_fullname("firstName")}
                                                                 icon={faSortDown}></FontAwesomeIcon>
                                            }
                                        </p>
                                    </th>
                                    <th className="col" onClick={() => {
                                        sort('role')
                                    }}>
                                        <p className="col_1 type_col">Type
                                            {oder2 === "ASC" ?
                                                <FontAwesomeIcon style={{marginLeft: "0.3rem"}}
                                                                 onClick={() => sorting_type("roleName")}
                                                                 icon={faSortDown}></FontAwesomeIcon>
                                                :
                                                <FontAwesomeIcon style={{marginLeft: "0.3rem"}}
                                                                 onClick={() => sorting_type("roleName")}
                                                                 icon={faSortDown}></FontAwesomeIcon>
                                            }
                                        </p>
                                    </th>
                                </tr>
                                </thead>

                                <tbody>
                                {
                                    displayList.map((item, index) => {
                                        return <tr key={index} >
                                            <td className="col staff_code_col"
                                                onClick={() => {
                                                    setModal({ ...isModal, isOpen: true });
                                                    setDataUser(item)

                                                }}                                            >
                                                <p className="col staff_code_col">{item.staffCode}</p>
                                            </td>
                                            <td className="col full_name_col">
                                                <p className="col full_name_col">{item.firstName + " " + item.lastName}</p>
                                            </td>
                                            <td className="col username_col">
                                                <p className="col username_col">{item.userName}</p>
                                            </td>
                                            <td className="col joined_day_col">
                                                <p className="col joined_day_col">{formatDate(item.joinedDate)}</p>
                                            </td>
                                            <td className="col type_col">
                                                <p className="col type_col">{item.roleName}</p>
                                            </td>
                                            <td className="btn_col pencil" onClick={() => {
                                                navigate("/editUser/"+ item.accountId);
                                            }}>
                                                <i className="fas fa-pencil-alt"></i>
                                                <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
                                            </td>
                                            <td className="btn_col delete">
                                                <FontAwesomeIcon icon={faTimesCircle}
                                                                 style={{color: "red"}} onClick = {()=>onDisable(item.accountId)}></FontAwesomeIcon>
                                            </td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>
                            :
                            <LoadingOutlined
                                style={{fontSize: "60px", color: "red", textAlign: "center"}}/>

                        }

                    </div>

                </div>
        }
            {isModal.isOpen ?
                <div>
                    <ViewInformation isVisible={setIsOpen} dataUser={dataUser}/>
                </div>

                :
                ""
            }
            <Modal
                className = "modalInformation"
                title="Can not disable user"
                visible={modalCanNotDisable.isOpen}
                width={400}
                closable={true}
                onCancel = {()=> {setModalNotDisable({ ...modalCanNotDisable, isOpen: false });
                                    }}
                footer={[]}
            >
                <p>There are valid assignments belonging to this user. Please close all assignments before disabling user.</p>
                <br/>
            </Modal>
            {modalConfirmDisable.isOpen ? <DisableUserModal setIsOpen={setIsOpenConfirm} id = {idAccount}/> : ""}
            {/*<ViewInformation isVisible ={viewInformation}/>*/}
        </>
    )
}



export default (TableUser)