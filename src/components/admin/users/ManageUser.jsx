import React, {useState, useEffect} from "react";
import { Pagination} from "antd";

import {faSearch, faFilter} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "../../../styles/Styles.css";
import "antd/dist/antd.css";
import TableUser from "./tableUser/TableUser";
import "./ManagerUser.css"
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import 'antd/dist/antd.css';
import { useNavigate } from "react-router-dom";



export default function ManageUser() {
    const [listUser, setListUser] = useState([]);

    let user = JSON.parse(localStorage.getItem('loginState'));
    const [checked, setChecked] = useState([]);
    const checkList = ["All", "Admin", "Staff"];
    const [listUserFilter, setListUserFilter] = useState([]);
    const [checkFilter, setCheckFilter] = useState(false);

    const [totalPage, setTotalPage] = useState(0);
    const [state, setState] = useState({
        current: 0,
    });
    const [nameSearch, setNameSearch] = useState("");


    const navigate = useNavigate();

    const config = {
        headers: {Authorization: `Bearer ${user.token}`}
    };
    //get list User location admin and display list  user to page 1


    const getListUser = () => {
        axios
            .get("https://asset-assignment-be.azurewebsites.net/api/account?page="+ state.current, config)
            .then(function (response) {
                setListUser(response.data.content)
                setTotalPage(response.data.totalPages)

            })
            .catch((error) => {
                toast.error(error.response.data.message);
                setTotalPage(0)

            });
    };
    useEffect(() => {
        getListUser();
    }, []);

    // get list user when admin click type filter

    function getListUserFilter(name , page){
        axios
            .get("https://asset-assignment-be.azurewebsites.net/api/account?filter="+name+"&page="+page, config)
            .then(function (response) {
                if(page===0){
                    setListUserFilter(response.data.content)
                    setTotalPage(response.data.totalPages)
                }else {
                    setListUserFilter(response.data.content)
                    setTotalPage(response.data.totalPages)
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                setTotalPage(0)

            });
    }
    // check find list user when admin perform 3 operations at the same time ( search , type , page )
    function findListUserToSearch(page) {
        if (checked.length !== 0) {
            if (checked.length === 1) {
                if (checked[0] === "Admin") {
                    getListUserSearch("admin", nameSearch, page)
                } else if (checked[0] === "Staff") {
                    getListUserSearch("staff", nameSearch, page)
                } else if (checked[0] === "All") {
                    getListUserSearch("all", nameSearch, page)
                }
            } else {
                getListUserSearch("all", nameSearch, page)
            }
        } else {
            getListUserSearch("all", nameSearch, page)
        }
    }
    // check find list user when admin perform 2 operations at the same time ( type , page )
    function getListUserToPage(page) {
        setNameSearch("")
        if (checked.length !== 0) {
            if (checked.length === 1) {
                if (checked[0] === "Admin") {
                    getListUserFilter("admin", page)
                } else if (checked[0] === "Staff") {
                    getListUserFilter("staff", page)
                } else
                    getListUserPage(page);
            } else
                getListUserPage(page);
        } else {
            getListUserPage(page);
        }
    }
    // get list user when admin search

    function getListUserSearch(name , code,page){
        let link="";
        if(name === "all")
            link = "https://asset-assignment-be.azurewebsites.net/api/account?" + "code=" + code + "&page=" + page
        else
            link = "https://asset-assignment-be.azurewebsites.net/api/account?filter="+ name + "&code=" + code + "&page=" + page
        axios
            .get(link, config)
            .then(function (response) {
                setListUserFilter(response.data.content)
                setCheckFilter(true)
                setTotalPage(response.data.totalPages)

            })
            .catch((error) => {
                setListUserFilter([])
                setCheckFilter(true)
                setTotalPage(0)
            });
    }
    function getListUserPage(page){
        axios
            .get("https://asset-assignment-be.azurewebsites.net/api/account?page=" + page, config)
            .then(function (response) {
                setListUser(response.data.content)
                setTotalPage(response.data.totalPages)
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                setTotalPage(0)

            });
    }


    const handleCheck = (event) => {
        let updatedList = [...checked];
        if (event.target.checked) {
            checked.push(event.target.value)
            updatedList = [...checked]
        } else {
            checked.splice(checked.indexOf(event.target.value), 1);
            updatedList = [...checked]
        }
        setChecked(updatedList);
        setState({
            current: 0,
        });
        getListUserToPage(0)
    };
    const findListUserSearch = () => {
        if (nameSearch.length > 20)
            toast.error("Invalid input ");
        else {
            setState({
                current: 0,
            });
            findListUserToSearch(0)

        }
    }




    const handleChange = (page) => {
        setState({
            current: page,
        });
        let checkpage = 0;
        if (page > 0) {
            checkpage = page - 1;
        }
        if (nameSearch !== "") {
            findListUserToSearch(checkpage)
        } else {
            getListUserToPage(checkpage)
        }
    };





    return (
        <>

            <div className="title">
                <h2 style={{color: "red", textAlign: "inherit", fontWeight: "700"}}>User List</h2>
            </div>
            <div className="user-list-toolbar-wrapper">
                <div className="user-list-toolbar">
                    <div className="filter_component filter-section" style={{marginLeft: "25px"}}>
                        <div id="role-filter-section">
                            <div className="dropdown-toggle">
                                <div className="dropdown-header">
                                    <div className="dropdown-title"
                                         style={{textAlign: "left", marginLeft: "10px"}}>Type
                                    </div>
                                    <div className="dropdown-icon" style={{paddingTop: "0.3rem"}}>
                                        <FontAwesomeIcon icon={faFilter}/>
                                    </div>
                                </div>
                                <div className="dropdown-content">
                                    <ul style={{listStyleType: "none"}}>
                                        {checkList.map((item, index) => (
                                            <li key={index}>
                                                <input value={item} type="checkbox" name="role" id={index}
                                                       style={{marginTop: "12px"}}
                                                       onChange={handleCheck}/><label htmlFor={index}
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
                    <div className="search-bar_create-btn_component search_bar-create_btn-wrapper">
                        {
                            <div id="search-section">
                                <input
                                    maxLength="50"
                                    name="keyword"
                                    value={nameSearch || ""}
                                    id="search-query"
                                    onChange={e => setNameSearch(e.target.value)}
                                />

                                <button type="button" className="button-search" onClick={findListUserSearch}>
                                    <FontAwesomeIcon icon={faSearch}/></button>
                            </div>
                        }
                        <div id="create-btn-section">
                            <button className="btn-createUser" onClick={() => {
                                navigate("/createuser");
                            }}>
                                <p className="btn_create_text"> Create new user</p>
                            </button>
                        </div>
                    </div>
                </div>
                {
                    <div>
                        <TableUser listUser={listUser} listFilter={listUserFilter} checkSearch ={checkFilter}/>
                        {
                            totalPage === 0 ?
                                ""
                                :
                                <>
                                    {
                                        state.current === 0 ?
                                            <Pagination
                                                style={{marginTop: "20px", marginLeft: "70%"}}
                                                nextIcon={"Next"}
                                                prevIcon={"Previous"}
                                                current={state.current + 1}
                                                onChange={handleChange}
                                                total={totalPage * 10}
                                            />
                                            :
                                            <Pagination
                                                style={{marginTop: "20px", marginLeft: "70%"}}
                                                nextIcon={"Next"}
                                                prevIcon={"Previous"}
                                                current={state.current}
                                                onChange={handleChange}
                                                total={totalPage * 10}
                                            />
                                    }
                                </>
                        }

                    </div>
                }
            </div>
            <Toaster
                toastOptions={{
                    className: 'toast',
                    style: {
                        border: '1px solid #713200',
                        padding: '36px',
                        color: '#713200',

                    },
                }}
            />


        </>
    );
}