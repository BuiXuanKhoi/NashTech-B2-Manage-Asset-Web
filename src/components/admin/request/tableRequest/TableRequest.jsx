import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle, faSortDown, faPencilAlt, faSortUp} from '@fortawesome/free-solid-svg-icons';
import "antd/dist/antd.css";
import {ReloadOutlined, CloseCircleOutlined, LoadingOutlined, CloseOutlined, CheckOutlined} from "@ant-design/icons";

import "./TableRequest.css"
import {Pagination} from "antd";
import _ from "lodash";
function TableRequest(props) {
    const [displayList, setDisplayList] = useState(props.listRequest);
    const [sort, setSort] = useState({
        name: "",
    });
    const [total , setTotal] = useState(0)
    const[paginatedPosts, setPaginatedPosts] = useState();
    const [state, setState] = useState({
        current: 0,
    });
    function  setTotalPage(s){
        let totalPage ;
        if(Math.floor(s/20) ===0   && s%20 >0)
            totalPage = 1;
        if(Math.floor(s/20) > 0 && s%20 > 0)
            totalPage = Math.floor(s/2) +1;
        if(Math.floor(s/20) > 0 && s%20=== 0)
            totalPage = Math.floor(s/20);
        setTotal(totalPage)
    }
    useEffect(() => {
        if (props.listRequestFilter === null) {
            setDisplayList([])
        } else {
                setDisplayList(props.listRequest);
                setPaginatedPosts(_(props.listRequest).slice(0).take(20).value())
                setTotalPage(props.listRequest.length)
        }
    }, [props.listRequest ])

    useEffect(() => {
        if (props.listRequestFilter !== null) {
                setDisplayList(props.listRequestFilter);
                setPaginatedPosts(_(props.listRequestFilter).slice(0).take(20).value())
                setTotalPage(props.listRequestFilter.length)
        } else
            setDisplayList([])

    }, [props.listRequestFilter ])

    {
        displayList.map(item =>(
            console.log(item)
        ))
    }
    const getListAssignmentSort = (col , list) => {
        setState({
            current: 0,
        });
        switch (col) {
            case 'aa': {
                setSort({...sort, name: "aa"})
                const sorted =[...displayList].sort((a,b)=>
                    parseInt( a["requestId"]) > parseInt(b["requestId"]) ?1:-1
                )
                setDisplayList(sorted);

                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'ad': {
                setSort({...sort, name: "ad"})
                const sorted =[...displayList].sort((a,b)=>
                    parseInt( a["requestId"]) < parseInt(b["requestId"]) ?1:-1
                )
                setDisplayList(sorted);

                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'ca': {
                setSort({...sort, name: "ca"})
                const sorted =[...displayList].sort((a,b)=>
                    a["assetCode"].toLowerCase()> b["assetCode"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'cd': {
                setSort({...sort, name: "cd"})
                const sorted =[...displayList].sort((a,b)=>
                    a["assetCode"].toLowerCase() < b["assetCode"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'nd': {
                setSort({...sort, name: "nd"})
                const sorted =[...displayList].sort((a,b)=>
                    a["assetName"].toLowerCase()> b["assetName"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'na': {
                setSort({...sort, name: "na"})
                const sorted =[...displayList].sort((a,b)=>
                    a["assetName"].toLowerCase() < b["assetName"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'td': {
                setSort({...sort, name: "td"})
                const sorted =[...displayList].sort((a,b)=>
                    a["requestedBy"].toLowerCase()> b["requestedBy"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'ta': {
                setSort({...sort, name: "ta"})
                const sorted =[...displayList].sort((a,b)=>
                    a["requestedBy"].toLowerCase()< b["requestedBy"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'bd': {
                setSort({...sort, name: "bd"})
                const sorted =[...displayList].sort((a,b)=>
                    a["acceptedBy"].toLowerCase()  > b["acceptedBy"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'ba': {
                setSort({...sort, name: "ba"})
                const sorted =[...displayList].sort((a,b)=>
                    a["acceptedBy"].toLowerCase() < b["acceptedBy"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'dd': {
                setSort({...sort, name: "dd"})
                const sorted =[...displayList].sort((a,b)=>
                    a["assignedDate"] > b["assignedDate"] ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'da': {
                setSort({...sort, name: "da"})
                const sorted =[...displayList].sort((a,b)=>
                    a["assignedDate"] < b["assignedDate"] ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'rd': {
                setSort({...sort, name: "rd"})
                const sorted =[...displayList].sort((a,b)=>

                    a["returnedDate"] > b["returnedDate"] ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'ra': {
                setSort({...sort, name: "ra"})
                const sorted =[...displayList].sort((a,b)=>
                    a["returnedDate"] < b["returnedDate"] ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'sd': {
                setSort({...sort, name: "sd"})
                const sorted =[...displayList].sort((a,b)=>

                    a["state"].toLowerCase() > b["state"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            case 'sa': {
                setSort({...sort, name: "sa"})
                const sorted =[...displayList].sort((a,b)=>
                    a["state"].toLowerCase() < b["state"].toLowerCase() ?1:-1
                )
                setDisplayList(sorted);
                setPaginatedPosts(_(sorted).slice(0 ).take(20).value())

                break;
            }
            default:
                break;
        }
    }
    const handleChange = (page) => {
        setState({
            current: page,
        });
        let checkpage = 0;
        setPaginatedPosts(_(displayList).slice(0).take(20).value())
        if (page > 0) {
            checkpage = page - 1;
            if(checkpage===0){
                setPaginatedPosts(_(displayList).slice(checkpage).take(20).value())
            }
            else if(checkpage > 0){
                setPaginatedPosts(_(displayList).slice(checkpage+1).take(20).value())

            }
            console.log(checkpage)

        }

    };

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
                                            paginatedPosts.map(item => (
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

                        {
                            state.current === 0 ?
                                <Pagination
                                    style={{marginTop: "20px", marginLeft: "70%"}}
                                    nextIcon={"Next"}
                                    prevIcon={"Previous"}
                                    current={state.current + 1}
                                    onChange={handleChange}
                                    total={total * 10}
                                />
                                :
                                <Pagination
                                    style={{marginTop: "20px", marginLeft: "70%"}}
                                    nextIcon={"Next"}
                                    prevIcon={"Previous"}
                                    current={state.current}
                                    onChange={handleChange}
                                    total={total * 10}
                                />
                        }

                    </>


            }

        </>
    )
}


export default (TableRequest)