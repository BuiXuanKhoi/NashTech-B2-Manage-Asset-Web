import React, {useState, useEffect} from "react";
import {Pagination} from "antd";

import {faSearch, faFilter, faSortDown, faSortUp} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "../../../styles/Styles.css";
import "antd/dist/antd.css";
import TableAssets from "./tableAssets/TableAssets";
import "./ManageAsset.css"
import axios from "axios";
import toast, {Toaster} from "react-hot-toast";
import 'antd/dist/antd.css';
import {useNavigate} from "react-router-dom";


export default function ManageAsset() {
    let user = JSON.parse(localStorage.getItem('loginState'));
    const listState = ["All", "Assigned", "Available", "Not available", "Waiting for recycling", "Recycled"];
    // const listCategory = ["All", "Assigned", "Available", "Not available", "Waiting for recycling", "Recycled"];
    const [totalPage, setTotalPage] = useState(0);
    const [listCategory, setListCategory] = useState([])
    const [listAsset, setListAsset] = useState([]);
    const [state, setState] = useState({
        current: 0,
    });

    const config = {
        headers: {Authorization: `Bearer ${user.token}`}
    };
    const getListCategory = () => {
        axios
            .get("http://localhost:8080/api/category", config)
            .then(function (response) {
                console.log(response.data)
                setListCategory(response.data)

            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };
    const getListAsset = () => {
        axios
            // .get("https://asset-assignment-be.azurewebsites.net/api/account?page="+ state.current, config)
            .get("http://localhost:8080/api/asset", config)
            .then(function (response) {
                console.log(response.data)
                setListAsset(response.data.content)
                console.log("Page "+ response.data.totalPages)
                setTotalPage(response.data.totalPages)

            })
            .catch((error) => {
                toast.error(error.response.data.message);
                setTotalPage(0)

            });
    };


    useEffect(() => {
        getListCategory();
        getListAsset();
    }, []);
    function getListAssetPageNoFilter(page,sort){
        axios
            // .get("https://asset-assignment-be.azurewebsites.net/api/account?page=" + page, config)
            .get("http://localhost:8080/api/asset?page=" + page  , config)
            .then(function (response) {
                setListAsset(response.data.content)
                console.log("Page " + page +" length "+ response.data)
                setTotalPage(response.data.totalPages)
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                setTotalPage(0)

            });
    }

    function getListAssetToPage(page) {
        getListAssetPageNoFilter(page);
    }

    const handleChange = (page) => {
        setState({
            current: page,
        });
        let checkpage = 0;
        if (page > 0) {
            checkpage = page - 1;
        }
        getListAssetToPage(checkpage)
        // console.log("is page: " + listUser.length)
    };


    return (
        <>
            <div>
                <div className="title">
                    <h2 style={{color: "red", textAlign: "inherit", fontWeight: "700"}}>Asset List</h2>
                </div>
                <div className="user-list-toolbar-wrapper">
                    <div className="user-list-toolbar">
                        <div className="filter_component filter-section-asset" style={{marginLeft: "25px"}}>
                            <div id="role-filter-section">
                                <div className="dropdown-toggle">
                                    <div className="dropdown-header">
                                        <div className="dropdown-title"
                                             style={{textAlign: "left", marginLeft: "10px"}}>State
                                        </div>
                                        <div className="dropdown-icon" style={{paddingTop: "0.3rem"}}>
                                            <FontAwesomeIcon icon={faFilter}/>
                                        </div>
                                    </div>
                                    <div className="dropdown-content-asset">
                                        <ul style={{listStyleType: "none"}}>
                                            {listState.map((item, index) => (
                                                <li key={index}>
                                                    <input value={item} type="checkbox" name="role" id={index}
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

                        <div className="filter_component filter-section-category" style={{marginRight: "80px"}}>
                            <div id="role-filter-section">
                                <div className="dropdown-toggle">
                                    <div className="dropdown-header">
                                        <div className="dropdown-title"
                                             style={{textAlign: "left", marginLeft: "10px"}}>Category
                                        </div>
                                        <div className="dropdown-icon" style={{paddingTop: "0.3rem"}}>
                                            <FontAwesomeIcon icon={faFilter}/>
                                        </div>
                                    </div>
                                    <div className="dropdown-content-asset">
                                        <ul style={{listStyleType: "none"}}>
                                            {listCategory.map((item, index) => (
                                                <li key={index}>
                                                    <input value={item} type="checkbox" name="role" id={index}
                                                           style={{marginTop: "12px"}}
                                                    /><label htmlFor={index}
                                                             style={{
                                                                 paddingLeft: "10px",
                                                                 display: "flex"
                                                             }}> {item.categoryName}</label>
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
                                        id="search-query"
                                    />

                                    <button type="button" className="button-search">
                                        <FontAwesomeIcon icon={faSearch}/></button>
                                </div>
                            }
                            <div id="create-btn-section">
                                <button className="btn-createUser">
                                    <p className="btn_create_text"> Create new asset</p>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="results-section">
                            <div className="Asset_table">
                                <>
                                    <table>
                                        <thead>
                                        <tr>
                                            <th  className="col_asset col_assetCode_asset">
                                                <p className="col_1 assetCode_asset_col">Asset Code
                                                    <FontAwesomeIcon
                                                        id="up_Staff"
                                                        style={{marginLeft: "0.3rem"}}
                                                        icon={faSortDown}>`
                                                    </FontAwesomeIcon>
                                                </p>
                                            </th>
                                            <th className="col_asset col_assetName">
                                                <p className=" col_1 assetName_col">Asset Name
                                                    <FontAwesomeIcon
                                                        id="up_Staff"
                                                        style={{marginLeft: "0.3rem"}}
                                                        icon={faSortDown}>`
                                                    </FontAwesomeIcon>
                                                </p>
                                            </th>
                                            <th className="col_asset col_assetCategory">
                                                <p className="col_1 assetCategory_col">Category
                                                    <FontAwesomeIcon
                                                        id="up_Staff"
                                                        style={{marginLeft: "0.3rem"}}
                                                        icon={faSortDown}>`
                                                    </FontAwesomeIcon>
                                                </p>
                                            </th>
                                            <th className="col_asset col_state">
                                                <p className="col_1 state_col">State

                                                    <FontAwesomeIcon
                                                        id="up_Staff"
                                                        style={{marginLeft: "0.3rem"}}
                                                        icon={faSortDown}>`
                                                    </FontAwesomeIcon>
                                                </p>
                                            </th>
                                        </tr>
                                        </thead>
                                        <TableAssets listAsset = {listAsset} />
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
                </div>

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