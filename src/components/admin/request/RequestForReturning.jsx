
import React, {useState, useEffect} from "react";
import './RequestForReturning.css'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilter, faPencilAlt, faSearch, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";
import {Row, Col, Form, Input, Select, Button, DatePicker, Radio, Cascader} from "antd";
import {Pagination} from "antd";
import "antd/dist/antd.css";
import {CalendarFilled, CloseCircleOutlined, ReloadOutlined} from "@ant-design/icons";
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import TableRequest  from "./tableRequest/TableRequest";
export default function RequestForReturning() {
    const checkList = ["All", "Completed", "Waiting for returning"];
    const [state, setState] = useState({
        current: 0,
    });

    const [nameSearch, setNameSearch] = useState("");

    let user = JSON.parse(localStorage.getItem('loginState'));
    const config = {
        headers: {Authorization: `Bearer ${user.token}`}
    };
    const [totalPage, setTotalPage] = useState(0);
    const [listRequest, setListRequest] = useState([]);


    const getListRequest = () => {
        axios
            .get("https://asset-assignment-be.azurewebsites.net/api/request", config)
            .then(function (response) {
                setListRequest(response.data)
            })
            .catch((error) => {
                setTotalPage(0)
            });
    };

    useEffect(() => {
        getListRequest();
    }, []);



    return (
        <>
            <div className="title">
                <h2 style={{color: "red", textAlign: "inherit", fontWeight: "700"}}>Assignment List</h2>
            </div>
            <div className="user-list-toolbar-wrapper">
                <div className="user-list-toolbar">
                    <div className="filter_component filter-section-assignemnt" style={{marginLeft: "25px"}}>
                        <div id="role-filter-section">
                            <div className="dropdown-toggle-state">
                                <div className="dropdown-header-state">
                                    <div className="dropdown-title-state"
                                         style={{textAlign: "left", marginLeft: "10px"}}>State
                                    </div>
                                    <div className="dropdown-icon-state" style={{paddingTop: "0.3rem"}}>
                                        <FontAwesomeIcon icon={faFilter}/>
                                    </div>
                                </div>
                                <div className="dropdown-content-assignment">
                                    <ul style={{listStyleType: "none"}}>
                                        {checkList.map((item, index) => (
                                            <li key={index}>
                                                <input value={item}
                                                       type="checkbox"
                                                       name="role"
                                                       id={index}
                                                       style={{marginTop: "12px"}}
                                                /><label htmlFor={index}
                                                         style={{
                                                             paddingLeft: "10px",
                                                             display: "flex"
                                                         }}> {item}</label>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="choice-date" style={{marginRight: "140px"}}>
                        <DatePicker
                            style={{
                                paddingTop: "0",
                                paddingBottom: "0",
                                paddingLeft: "10px",
                                color: "black",
                                border: "0.75px solid #B5B5B5",
                                borderRadius: " 0.2rem",
                                paddingRight: "10px"
                            }}
                            suffixIcon={<CalendarFilled
                                style={{color: "black", background: " #d9363e !important"}}/>}
                            format="DD/MM/YYYY"
                            placeholder={"Assigned Date"}
                            className="assignedform"
                        />

                    </div>
                    <div className="search-bar_create-btn_component search_bar-create_btn-wrapper">
                        <div id="create-btn-section">
                        </div>
                        <div id="search-section" style={{justifyContent: "left" }}>
                            <input
                                maxLength="50"
                                name="keyword"
                                value={nameSearch || ""}
                                id="search-query"
                                onChange={e => setNameSearch(e.target.value)}
                            />
                            <button type="button" className="button-search" >
                                <FontAwesomeIcon icon={faSearch}/></button>
                        </div>
                    </div>

                </div>
                <div>
                    <div>
                                 <TableRequest listRequest = {listRequest}/>
                    </div>

                                        <Pagination
                                            style={{marginTop: "20px", marginLeft: "70%"}}
                                            nextIcon={"Next"}
                                            prevIcon={"Previous"}
                                            current={1}
                                            total={30}
                                        />


                </div>
            </div>
        </>
    );
}