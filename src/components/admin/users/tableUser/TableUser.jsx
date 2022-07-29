import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle, faSortDown, faPencilAlt, faSortUp} from '@fortawesome/free-solid-svg-icons'
import "./TableUser.css"
import {
    FilterOutlined,
    EditFilled,
    CloseCircleOutlined,
    LoadingOutlined,
    CloseSquareOutlined
} from "@ant-design/icons";
import {Table} from "antd";
import ViewInformation from "../viewInformation/ViewInformation";
import moment from "moment"

function TableUser(props) {
    const [displayList, setDisplayList] = useState(props.listUser);
    // const [oder, setOder] = useState("ASC")
    const [oder, setOder] = useState({
        name:"ASC",
        ischecked:false
    })

    const [oder1, setOder1] = useState({
        name1:"DSC",
        ischecked1:false
    })
    const [oder2, setOder2] = useState("ASC")
    const [sortDay, setSortDay] = useState("ASC")

    const [loading, setLoading] = useState(false);
    const [dataUser, setDataUser] = useState(false)

    const [isModal, setModal] = useState({
        isOpen: false,
        isLoading: false,
    });
    const setIsOpen = () => {
        setModal({...isModal, isOpen: !isModal.isOpen})
    }

    useEffect(() => {
        if (props.listFilter === null) {
            setDisplayList([])
        } else {
            if (oder.ischecked) {
                if (oder.name === "ASC") {
                    const sorted = [...props.listUser].sort((a, b) =>
                        a["staffCode"].toLowerCase() < b["staffCode"].toLowerCase() ? 1 : -1
                    )
                    setDisplayList(sorted);
                }
                if (oder.name === "DSC") {
                    const sorted = [...props.listUser].sort((a, b) =>
                        a["staffCode"].toLowerCase() > b["staffCode"].toLowerCase() ? 1 : -1
                    )
                    setDisplayList(sorted);
                }
            }
            else if (!oder.ischecked && oder1.ischecked) {
                if (oder1.name1 === "ASC") {
                    const sorted = [...props.listUser].sort((a, b) =>
                        a["firstName"].toLowerCase() < b["firstName"].toLowerCase() ? 1 : -1
                    )
                    setDisplayList(sorted);
                }
                if (oder1.name1 === "DSC") {
                    const sorted = [...props.listUser].sort((a, b) =>
                        a["firstName"].toLowerCase() > b["firstName"].toLowerCase() ? 1 : -1
                    )
                    setDisplayList(sorted);
                }
            } else {
                const sorted = [...props.listUser].sort((a, b) =>
                    a["firstName"].toLowerCase() > b["firstName"].toLowerCase() ? 1 : -1
                )
                setDisplayList(sorted);

            }

        }


    }, [props.listUser])
    useEffect(() => {
        if (props.listFilter !== null) {
            if(oder.ischecked){
                if (oder.name === "ASC" ) {
                    const sorted = [...props.listFilter].sort((a, b) =>
                        a["staffCode"].toLowerCase() < b["staffCode"].toLowerCase() ? 1 : -1
                    )
                    setDisplayList(sorted);
                }
                if (oder.name === "DSC") {
                    const sorted = [...props.listFilter].sort((a, b) =>
                        a["staffCode"].toLowerCase() > b["staffCode"].toLowerCase() ? 1 : -1
                    )
                    setDisplayList(sorted);
                }
            }
            else{
                const sorted = [...props.listFilter].sort((a, b) =>
                    a["firstName"].toLowerCase() > b["firstName"].toLowerCase() ? 1 : -1
                )
                setDisplayList(sorted);
            }


        } else
            setDisplayList([])

    }, [props.listFilter])


    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2500);
    }, []);

    function formatDate(joinedDate) {
        let myArray = joinedDate.split("/");
        let DAYMMYYY = [0, 0, 0]
        for (let i = 0; i < 3; i++) {
            DAYMMYYY[i] = parseInt(myArray[i]);
        }
        let datecheck = (new Date(DAYMMYYY[2], DAYMMYYY[1], DAYMMYYY[0]))
        return datecheck;
    }

    function sort(rule) {
        switch (rule) {
            case 'id': {
                console.log("id")
                break;
            }
            case 'firstName': {
                console.log("firstName")

                break;
            }
            case 'joinDate': {
                console.log("joinDate")

                break;
            }
            case 'role': {
                console.log("role")
                break;
            }
            default:
                break;
        }
    }

    const sorting_staff = (col) => {
        if (oder.name === "ASC" ) {
            const sorted = [...displayList].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            )
            setDisplayList(sorted);
            setOder({...oder, name: "DSC",ischecked: true})

        }
        if (oder.name === "DSC") {
            const sorted = [...displayList].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            )
            setDisplayList(sorted);
            setOder({...oder, name: "ASC",ischecked: true})

        }
    }
    const sorting_fullname = (col) => {
        if (oder1.name1 === "ASC") {
            const sorted = [...displayList].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            )
            setDisplayList(sorted);
            setOder1({...oder1, name1: "DSC",ischecked1: true})
        }
        if (oder1.name1 === "DSC") {
            const sorted = [...displayList].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            )
            setDisplayList(sorted);
            setOder1({...oder1, name1: "ASC",ischecked1: true})

        }
    }

    const sorting_type = (col) => {
        if (oder2 === "ASC") {
            const sorted = [...displayList].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            )
            setDisplayList(sorted);
            setOder2("DSC")
        }
        if (oder2 === "DSC") {
            const sorted = [...displayList].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            )
            setDisplayList(sorted);
            setOder2("ASC")

        }
    }
    const sorting_day = (col) => {
        if (sortDay === "ASC") {
            const sorted = [...displayList].sort((a, b) =>
                formatDate(a[col]) > formatDate(b[col]) ? 1 : -1
            )
            setDisplayList(sorted);
            setSortDay("DSC")
        }
        if (sortDay === "DSC") {
            const sorted = [...displayList].sort((a, b) =>
                formatDate(a[col]) < formatDate(b[col]) ? 1 : -1
            )
            setDisplayList(sorted);
            setSortDay("ASC")

        }
    }
    function checkSortPage(){
        if(oder.ischecked){
            sorting_staff("staffCode")
        }
    }

    console.log("display" + isModal.isOpen)

    console.log("check search" + props.checkSearch)

    console.log("order search" + oder.ischecked +" name " + oder.name)


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
                                style={{fontSize: "60px", color: "red", textAlign: "center", marginTop:"70px"}}/>
                        </>

                    :
                    <>
                        <div className="results-section">
                            <div className="user_table">
                                {!loading ?
                                    <>
                                        <table>
                                            <thead>
                                            <tr>
                                                <th style={{width:"200px"}} className="col" onClick={() => {
                                                    sort('id')
                                                }}>
                                                    <p className="col_1 staff_code_col">Staff Code
                                                        {oder.name === "ASC" ?
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
                                                        {oder1.name === "ASC" ?
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
                                                                             onClick={() => sorting_day("joinedDate")}
                                                                             icon={faSortDown}></FontAwesomeIcon>
                                                            :
                                                            <FontAwesomeIcon style={{marginLeft: "0.3rem"}}
                                                                             onClick={() => sorting_day("joinedDate")}
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
                                                    return <tr key={index}>
                                                        <td className="col staff_code_col"
                                                            onClick={() => {
                                                                setModal({...isModal, isOpen: true});
                                                                setDataUser(item)

                                                            }}>
                                                            <p className="col staff_code_col">{item.staffCode}</p>
                                                        </td>
                                                        <td className="col full_name_col">
                                                            <p className="col full_name_col">{item.firstName + " " + item.lastName}</p>
                                                        </td>
                                                        <td className="col username_col">
                                                            <p className="col username_col">{item.userName}</p>
                                                        </td>
                                                        <td className="col joined_day_col">
                                                            <p className="col joined_day_col">{(item.joinedDate)}</p>
                                                        </td>
                                                        <td className="col type_col">
                                                            <p className="col type_col">{item.roleName}</p>
                                                        </td>
                                                        <td className="btn_col pencil">
                                                            <i className="fas fa-pencil-alt"></i>
                                                            <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
                                                        </td>
                                                        <td className="btn_col delete">
                                                            <FontAwesomeIcon icon={faTimesCircle}
                                                                             style={{color: "red"}}></FontAwesomeIcon>
                                                        </td>
                                                    </tr>
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </>

                                    :
                                    <LoadingOutlined
                                        style={{fontSize: "60px", color: "red", textAlign: "center"}}/>

                                }

                            </div>

                        </div>
                    </>
            }
            {isModal.isOpen ?
                <div>
                    <ViewInformation isVisible={setIsOpen} dataUser={dataUser}/>
                </div>

                :
                ""
            }

            {/*<ViewInformation isVisible ={viewInformation}/>*/}
        </>
    )
}


export default (TableUser)