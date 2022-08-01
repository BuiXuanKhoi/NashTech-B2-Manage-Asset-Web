import React, {useState, useEffect} from "react";
import { Pagination} from "antd";

import {faSearch, faFilter, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
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
    const [checkSortType, setCheckSort] = useState(false);
    const [listUserSort, setListUserSort] = useState([]);
    const [sort, setSort] = useState({
        name: "",
    });
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
            // .get("https://asset-assignment-be.azurewebsites.net/api/account?page="+ state.current, config)
            .get("http://localhost:8080/api/account?page=" + state.current , config)
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

    function getListUserFilter(name, page,sort) {
        let link ="";
        if(sort === "")
            link = "http://localhost:8080/api/account?filter=" + name + "&page=" + page
        else
            link = "http://localhost:8080/api/account?filter=" + name + "&page=" + page + "&sort=" + sort
        axios
            // .get("https://asset-assignment-be.azurewebsites.net/api/account?filter="+name+"&page="+page, config)
            .get(link, config)
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
                    getListUserSearch("admin", nameSearch, page,sort.name)
                } else if (checked[0] === "Staff") {
                    getListUserSearch("staff", nameSearch, page,sort.name)
                } else if (checked[0] === "All") {
                    getListUserSearch("all", nameSearch, page,sort.name)
                }
            } else {
                getListUserSearch("all", nameSearch, page,sort.name)
            }
        } else {
            getListUserSearch("all", nameSearch, page,sort.name)
        }
    }
    // check find list user when admin perform 2 operations at the same time ( type , page )
    function getListUserToPage(page) {
        setNameSearch("")
        if (checked.length !== 0) {
            if (checked.length === 1) {
                if (checked[0] === "Admin") {
                    getListUserFilter("admin", page,sort.name)
                } else if (checked[0] === "Staff") {
                    getListUserFilter("staff", page,sort.name)
                } else
                    getListUserPage(page,sort.name);
            } else
                getListUserPage(page,sort.name);
        } else {
            getListUserPage(page,sort.name);
        }
    }
    function listCheckSortColumn(name,search_name){
        setState({
            current: 0,
        });
        if(search_name !== ""){
            if (checked.length !== 0) {
                if (checked.length === 1) {
                    if (checked[0] === "Admin") {
                        findListUserToSort(0, name, "admin",search_name)
                    } else if (checked[0] === "Staff") {
                        findListUserToSort(0, name, "staff",search_name)
                    } else if (checked[0] === "All") {
                        findListUserToSort(0, name, "all",search_name)
                    }
                } else {
                    findListUserToSort(0, name, "all",search_name)
                }
            } else {
                findListUserToSort(0, name, null,search_name)
            }
        }
        else{
            if (checked.length !== 0) {
                if (checked.length === 1) {
                    if (checked[0] === "Admin") {
                        findListUserToSort(0, name, "admin",null)
                    } else if (checked[0] === "Staff") {
                        console.log("heheheeee")
                        findListUserToSort(0, name, "staff",null)
                    } else if (checked[0] === "All") {
                        findListUserToSort(0, name, "all",null)
                    }
                } else {
                    findListUserToSort(0, name, "all",null)
                }
            } else {
                findListUserToSort(0, name,null,null)
            }
        }

    }
    const getListUserSort = (col) => {
        switch (col) {
            case 'sa': {
                setSort({...sort, name: "sa"})
                listCheckSortColumn("sa",nameSearch);
                break;
            }
            case 'sd': {
                setSort({...sort, name: "sd"})
                listCheckSortColumn("sd",nameSearch);
                break;
            }
            case 'ua': {
                setSort({...sort, name: "ua"})
                listCheckSortColumn("ua",nameSearch);
                break;
            }
            case 'ud': {
                setSort({...sort, name: "ud"})
                listCheckSortColumn("ud",nameSearch);
                break;
            }
            case 'fd': {
                setSort({...sort, name: "fd"})
                listCheckSortColumn("fd",nameSearch);
                break;
            }
            case 'fa': {
                setSort({...sort, name: "fa"})
                listCheckSortColumn("fa",nameSearch);
                break;
            }
            case 'ja': {
                setSort({...sort, name: "ja"})
                listCheckSortColumn("ja",nameSearch);
                break;
            }
            case 'jd': {
                setSort({...sort, name: "jd"})
                listCheckSortColumn("jd",nameSearch);
                break;
            }
            default:
                break;
        }
    }
    function findListUserToSort(page,sort,type,namesearch) {
        console.log("findListUserToSort" + type + "  "+namesearch)
        let link = "";
        if(type !== null && namesearch === null)
            link = "http://localhost:8080/api/account?sort="+sort+"&page="+page + "&filter=" + type
        else if(namesearch !== null && type === null)
            link = "http://localhost:8080/api/account?sort="+sort+"&page="+page + "&code=" + namesearch
        else if(type !== null && namesearch !== null)
            link = "http://localhost:8080/api/account?sort="+sort+"&page="+page + "&filter=" + type + "&code="+namesearch
        else
            link = "http://localhost:8080/api/account?sort="+sort+"&page="+page
        axios
            .get(link, config)
            .then(function (response) {
                setListUserSort(response.data.content)
                setCheckSort(true)
                setTotalPage(response.data.totalPages)
            })
            .catch((error) => {
                setListUserSort([])
                setCheckSort(true)
                setTotalPage(0)
            });
    }

    // get list user when admin search

    function getListUserSearch(name , code,page,sort){
        // let link="";
        // if(name === "all")
        //     link = "https://asset-assignment-be.azurewebsites.net/api/account?" + "code=" + code + "&page=" + page
        // else
        //     link = "https://asset-assignment-be.azurewebsites.net/api/account?filter="+ name + "&code=" + code + "&page=" + page
        let link = "";
        if (name === "all")
            link = "http://localhost:8080/api/account?" + "code=" + code + "&page=" + page +"&sort=" + sort
        else
            link = "http://localhost:8080/api/account?filter=" + name + "&code=" + code + "&page=" + page +"&sort=" + sort

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
    function getListUserPage(page,sort){
        axios
            // .get("https://asset-assignment-be.azurewebsites.net/api/account?page=" + page, config)
            .get("http://localhost:8080/api/account?page=" + page +"&sort="+sort , config)
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
        getListUserToPage(0,"")
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
        console.log("is page: " + listUser.length)
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
                        <div className="results-section">
                            <div className="user_table">
                                <>
                                    <table>
                                        {
                                            totalPage === 0 ?
                                                ""
                                                :
                                                <thead>
                                                <tr>
                                                    <th style={{width:"200px"}} className="col" >
                                                        <p className="col_1 staff_code_col">Staff Code
                                                            {
                                                                sort.name === "sa"?
                                                                    <FontAwesomeIcon
                                                                        id="up_Staff"
                                                                        onClick={()=>getListUserSort("sd")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortUp}>`
                                                                    </FontAwesomeIcon>
                                                                    :
                                                                    <FontAwesomeIcon
                                                                        id="down_Staff"
                                                                        onClick={()=>getListUserSort("sa")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortDown}>`
                                                                    </FontAwesomeIcon>

                                                            }
                                                        </p>
                                                    </th>
                                                    <th className="col" >
                                                        <p className=" col_1 full_name_col">Full Name
                                                            {
                                                                sort.name === "fa"?
                                                                    <FontAwesomeIcon
                                                                        id="up_Fullname"
                                                                        onClick={()=>getListUserSort("fd")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortUp}>`
                                                                    </FontAwesomeIcon>
                                                                    :
                                                                    <FontAwesomeIcon
                                                                        id="down_Fullname"
                                                                        onClick={()=>getListUserSort("fa")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortDown}>`
                                                                    </FontAwesomeIcon>

                                                            }
                                                        </p>
                                                    </th>
                                                    <th className="col">
                                                        <p className="col_1 username_col">Username</p>
                                                    </th>
                                                    <th className="col" >
                                                        <p className="col_1 joined_day_col">Joined Date

                                                            {
                                                                sort.name === "ja"?
                                                                    <FontAwesomeIcon
                                                                        id="up_JoinedDate"
                                                                        onClick={()=>getListUserSort("jd")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortUp}>`
                                                                    </FontAwesomeIcon>
                                                                    :
                                                                    <FontAwesomeIcon
                                                                        id="down_JoinedDate"
                                                                        onClick={()=>getListUserSort("ja")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortDown}>`
                                                                    </FontAwesomeIcon>

                                                            }
                                                        </p>
                                                    </th>
                                                    <th className="col" >
                                                        <p className="col_1 type_col">Type
                                                            {
                                                                sort.name === "ua"?
                                                                    <FontAwesomeIcon
                                                                        id="up_Type"
                                                                        onClick={()=>getListUserSort("ud")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortUp}>`
                                                                    </FontAwesomeIcon>
                                                                    :
                                                                    <FontAwesomeIcon
                                                                        id="down_Type"
                                                                        onClick={()=>getListUserSort("ua")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortDown}>`
                                                                    </FontAwesomeIcon>

                                                            }
                                                        </p>
                                                    </th>
                                                </tr>
                                                </thead>
                                        }
                                        <TableUser
                                            listUser={listUser}
                                            listFilter={listUserFilter}
                                            checkSearch ={checkFilter}
                                            listSort ={listUserSort}
                                            checkSort ={checkSortType}
                                        />
                                    </table>
                                </>
                            </div>

                        </div>
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