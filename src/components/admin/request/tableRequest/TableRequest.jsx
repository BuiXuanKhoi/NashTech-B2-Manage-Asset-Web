import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle, faSortDown, faPencilAlt, faSortUp} from '@fortawesome/free-solid-svg-icons';
import "antd/dist/antd.css";
import {ReloadOutlined, CloseCircleOutlined, LoadingOutlined, CloseOutlined, CheckOutlined} from "@ant-design/icons";

import "./TableRequest.css"
function TableRequest(props) {
    const [displayList, setDisplayList] = useState(props.listRequest);
    const[oder,setOder] = useState("ASC")
    const[oder1,setOder1] = useState("ASC")
    const[oder2,setOder2] = useState("ASC")
    const [sort, setSort] = useState({
        name: "",
    });



    useEffect(() => {
        setDisplayList(props.listRequest);
    }, [props.listRequest])

    // const sorting_ASC = (col) =>{
    //     const sorted =[...displayList].sort((a,b)=>
    //         a[col] > b[col] ?1:-1
    //     )
    //     setDisplayList(sorted);
    // }
    // const sorting_DSC = (col) =>{
    //     const sorted =[...displayList].sort((a,b)=>
    //         parseInt( a[col]) > parseInt(b[col]) ?1:-1
    //     )
    //     setDisplayList(sorted);
    // }
    const getListAssignmentSort = (col) => {
        switch (col) {
            case 'aa': {
                setSort({...sort, name: "aa"})
                const sorted =[...displayList].sort((a,b)=>
                    parseInt( a["requestId"]) > parseInt(b["requestId"]) ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'ad': {
                setSort({...sort, name: "ad"})
                const sorted =[...displayList].sort((a,b)=>
                    parseInt( a["requestId"]) < parseInt(b["requestId"]) ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'ca': {
                setSort({...sort, name: "ca"})
                const sorted =[...displayList].sort((a,b)=>
                    a["assetCode"].toLowerCase()> b["assetCode"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'cd': {
                setSort({...sort, name: "cd"})
                const sorted =[...displayList].sort((a,b)=>
                    a["assetCode"].toLowerCase() < b["assetCode"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'nd': {
                setSort({...sort, name: "nd"})
                const sorted =[...displayList].sort((a,b)=>
                    a["assetName"].toLowerCase()> b["assetName"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'na': {
                setSort({...sort, name: "na"})
                const sorted =[...displayList].sort((a,b)=>
                    a["assetName"].toLowerCase() < b["assetName"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'td': {
                setSort({...sort, name: "td"})
                const sorted =[...displayList].sort((a,b)=>
                    a["requestedBy"].toLowerCase()> b["requestedBy"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'ta': {
                setSort({...sort, name: "ta"})
                const sorted =[...displayList].sort((a,b)=>
                    a["requestedBy"].toLowerCase()< b["requestedBy"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'bd': {
                setSort({...sort, name: "bd"})
                const sorted =[...displayList].sort((a,b)=>
                    a["acceptedBy"].toLowerCase()  > b["acceptedBy"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'ba': {
                setSort({...sort, name: "ba"})
                const sorted =[...displayList].sort((a,b)=>
                    a["acceptedBy"].toLowerCase() < b["acceptedBy"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'dd': {
                setSort({...sort, name: "dd"})
                const sorted =[...displayList].sort((a,b)=>
                    a["assignedDate"] > b["assignedDate"] ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'da': {
                setSort({...sort, name: "da"})
                const sorted =[...displayList].sort((a,b)=>
                    a["assignedDate"] < b["assignedDate"] ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'rd': {
                setSort({...sort, name: "rd"})
                const sorted =[...displayList].sort((a,b)=>

                    a["returnedDate"] > b["returnedDate"] ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'ra': {
                setSort({...sort, name: "ra"})
                const sorted =[...displayList].sort((a,b)=>
                    a["returnedDate"] < b["returnedDate"] ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'sd': {
                setSort({...sort, name: "sd"})
                const sorted =[...displayList].sort((a,b)=>

                    a["state"].toLowerCase() > b["state"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            case 'sa': {
                setSort({...sort, name: "sa"})
                const sorted =[...displayList].sort((a,b)=>
                    a["state"].toLowerCase() < b["state"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                break;
            }
            default:
                break;
        }
    }




    console.log(displayList)


    return (
        <>


            <div className="results-section">
                <div className="Assignment_table">
                    <>
                        <table>
                            <thead>
                            <tr>
                                <th className="col_assignment col_no">
                                    <p className="col_1 no_col">No
                                        {
                                            sort.name === "ad" ?
                                                <FontAwesomeIcon
                                                    id="up_No"
                                                    onClick={() => getListAssignmentSort("aa")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortUp}>`
                                                </FontAwesomeIcon>
                                                :
                                                <FontAwesomeIcon
                                                    id="down_No"
                                                    onClick={() => getListAssignmentSort("ad")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortDown}>`
                                                </FontAwesomeIcon>

                                        }
                                    </p>
                                </th>
                                <th className="col_assignment col_assetCode">
                                    <p className="col_1 asset_code_col">Asset Code
                                        {
                                            sort.name === "cd" ?
                                                <FontAwesomeIcon
                                                    id="up_Assetcode"
                                                    onClick={() => getListAssignmentSort("ca")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortUp}>`
                                                </FontAwesomeIcon>
                                                :
                                                <FontAwesomeIcon
                                                    id="down_Assetcode"
                                                    onClick={() => getListAssignmentSort("cd")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortDown}>`
                                                </FontAwesomeIcon>

                                        }
                                    </p>
                                </th>
                                <th className="col_assignment col_assetName_request">
                                    <p className="asset_name_col">Asset Name
                                        {
                                            sort.name === "nd" ?
                                                <FontAwesomeIcon
                                                    id="up_Assetname"
                                                    onClick={() => getListAssignmentSort("na")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortUp}>`
                                                </FontAwesomeIcon>
                                                :
                                                <FontAwesomeIcon
                                                    id="down_Assetname"
                                                    onClick={() => getListAssignmentSort("nd")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortDown}>`
                                                </FontAwesomeIcon>

                                        }

                                    </p>
                                </th>
                                <th className="col_assignment col_requestBy">
                                    <p className="request_by_col">Requested by
                                        {
                                            sort.name === "td" ?
                                                <FontAwesomeIcon
                                                    id="up_Assignedto"
                                                    onClick={() => getListAssignmentSort("ta")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortUp}>`
                                                </FontAwesomeIcon>
                                                :
                                                <FontAwesomeIcon
                                                    id="down_Assignedto"
                                                    onClick={() => getListAssignmentSort("td")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortDown}>`
                                                </FontAwesomeIcon>

                                        }
                                    </p>
                                </th>
                                <th className="col_assignment col_assignedDate">
                                    <p className="assigned_Date_col">Assigned Date
                                        {
                                            sort.name === "dd" ?
                                                <FontAwesomeIcon
                                                    id="up_AssignedDate"
                                                    onClick={() => getListAssignmentSort("da")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortUp}>`
                                                </FontAwesomeIcon>
                                                :
                                                <FontAwesomeIcon
                                                    id="down_AssignedDate"
                                                    onClick={() => getListAssignmentSort("dd")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortDown}>`
                                                </FontAwesomeIcon>

                                        }
                                    </p>
                                </th>
                                <th className="col_assignment col_assignmentDate">
                                    <p className="assigned_date_col">Accepted by
                                        {
                                            sort.name === "bd" ?
                                                <FontAwesomeIcon
                                                    id="up_Assignedby"
                                                    onClick={() => getListAssignmentSort("ba")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortUp}>`
                                                </FontAwesomeIcon>
                                                :
                                                <FontAwesomeIcon
                                                    id="down_Assignedby"
                                                    onClick={() => getListAssignmentSort("bd")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortDown}>`
                                                </FontAwesomeIcon>

                                        }
                                    </p>
                                </th>
                                <th className="col_assignment col_assignmentDate">
                                    <p className="assigned_date_col">Returned Date
                                        {
                                            sort.name === "rd" ?
                                                <FontAwesomeIcon
                                                    id="up_Assignedby"
                                                    onClick={() => getListAssignmentSort("ra")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortUp}>`
                                                </FontAwesomeIcon>
                                                :
                                                <FontAwesomeIcon
                                                    id="down_Assignedby"
                                                    onClick={() => getListAssignmentSort("rd")}
                                                    style={{marginLeft: "0.3rem"}}
                                                    icon={faSortDown}>`
                                                </FontAwesomeIcon>

                                        }
                                    </p>
                                </th>
                                <th className="col_assignment col_state">
                                        <p className="state_col">State
                                            {
                                                sort.name === "sd" ?
                                                    <FontAwesomeIcon
                                                        id="up_Assignedby"
                                                        onClick={() => getListAssignmentSort("sa")}
                                                        style={{marginLeft: "0.3rem"}}
                                                        icon={faSortUp}>`
                                                    </FontAwesomeIcon>
                                                    :
                                                    <FontAwesomeIcon
                                                        id="down_Assignedby"
                                                        onClick={() => getListAssignmentSort("sd")}
                                                        style={{marginLeft: "0.3rem"}}
                                                        icon={faSortDown}>`
                                                    </FontAwesomeIcon>

                                            }

                                        </p>
                                </th>
                            </tr>
                            </thead>

                            <tbody>
                            {
                                displayList.map(item => (
                                    <tr>
                                        <td className="col_assignment col_no"
                                        >
                                            <p className="col no_col">{item.requestId}
                                            </p>
                                        </td>
                                        <td className="col_assignment col_assetCode">
                                            <p className="col assetCode_col">{item.assetCode}
                                            </p>
                                        </td>
                                        <td className="col_assignment col_assetName_request" >
                                            <p className="col assetName_col">{item.assetName}
                                            </p>
                                        </td>
                                        <td className="col_assignment col_requested_by">
                                            <p className="col requested_by_col">{item.requestedBy}</p>
                                        </td>
                                        <td className="col_assignment  col_assignmentDate">
                                            <p className="col asignmentDate_col">{item.assignedDate}
                                            </p>
                                        </td>
                                        {
                                            item.acceptedBy === " " ?
                                                <td className="col_assignment col_returned_date">
                                                    <p className="col returneddate_col"><br/></p>
                                                </td>
                                                :
                                                <td className="col_assignment col_returned_date">
                                                    <p className="col returneddate_col"> {item.acceptedBy}</p>
                                                </td>
                                        }

                                        {
                                            item.returnedDate === "01/01/1000" ?
                                                <td className="col_assignment col_returned_date">
                                                    <p className="col returneddate_col"><br/></p>
                                                </td>
                                                :
                                                <td className="col_assignment col_returned_date">
                                                    <p className="col returneddate_col">{item.returnedDate} </p>
                                                </td>
                                        }

                                        {
                                            item.state === "WAITING_FOR_RETURNING" ?
                                                <>
                                                    <td className="col_assignment col_state"
                                                        style={{width: "17% !importance"}}>
                                                        <p className="col state_col">WAITING FOR RETURNING</p>
                                                    </td>
                                                </>
                                                :
                                                <>
                                                    <td className="col_assignment col_state">
                                                        <p className="col state_col">{item.state} </p>
                                                    </td>

                                                </>
                                        }

                                        <td className="btn_col_assignment edit ant-pagination-disabled">
                                            <i className="fas fa-pencil-alt"></i>

                                            <CheckOutlined style={{color: "red"}}/>

                                        </td>
                                        <td className="btn_col_assignment delete ant-pagination-disabled">
                                            {/* eslint-disable-next-line react/jsx-no-undef */}
                                            <CloseOutlined style={{color: "black"}}/>
                                        </td>
                                    </tr>
                                ))
                            }

                            </tbody>

                        </table>

                    </>
                </div>
            </div>
        </>
    )
}


export default (TableRequest)