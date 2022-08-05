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
    const [listAssetFilter, setListAssetFilter] = useState([]);

    const [totalPage, setTotalPage] = useState(0);
    const [listCategory, setListCategory] = useState([])
    const [sort, setSort] = useState({
        name: "",
    });
    const [checked, setChecked] = useState([]);
    const [checkedCategory, setCheckedCategory] = useState([]);
    const [checkFilter, setCheckFilter] = useState(false);


    const [nameSearch, setNameSearch] = useState("");

    const [listAsset, setListAsset] = useState([]);
    const [state, setState] = useState({
        current: 0,
    });
    const navigate = useNavigate();
    const config = {
        headers: {Authorization: `Bearer ${user.token}`}
    };
    let indexplus = 6
    const getListCategory = () => {
        axios
            .get("https://asset-assignment-be.azurewebsites.net/api/category", config)
            .then(function (response) {
                console.log(response.data)
                setListCategory(response.data)
                setNameSearch("");

            })
            .catch((error) => {
                toast.error(error.response.data.message);
            });
    };
    const getListAsset = () => {
        axios
            .get("https://asset-assignment-be.azurewebsites.net/api/asset?state=AVAILABLE UNAVAILABLE", config)
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
    function getListAssetFilterSortSearch( sort ,page,  nameSearch) {
        if(nameSearch === undefined)
            nameSearch= "";
        let link = "";
        let state = "";
        let category = "";
        if(checked.length !== 0){
            for (let i=0;i<checked.length;i++){
                if(checked[i]==="All"){
                    state="ASSIGNED AVAILABLE UNAVAILABLE WAITING_FOR_RECYCLE RECYCLED"
                    break;
                }
                if(checked[i] === "Not available")
                    state = state + "UNAVAILABLE ";
                if(checked[i] === "Waiting for recycling")
                    state = state + "WAITING_FOR_RECYCLE ";
                if(checked[i] === "Assigned")
                    state = state + "ASSIGNED ";
                if(checked[i] === "Recycled")
                    state = state + "RECYCLED ";
                if(checked[i] === "Available")
                    state = state + "AVAILABLE ";
            }
        }
        else{
            state = "AVAILABLE UNAVAILABLE";
        }
        if(checkedCategory.length !== 0){
            for (let i=0;i<checkedCategory.length;i++){
                listCategory.map(item=>{
                    if(item.categoryName === checkedCategory[i]){
                        category = category + item.categoryId + " ";
                    }
                })
            }
        }

        console.log(state)

        link = "https://asset-assignment-be.azurewebsites.net/api/asset?"+ "&sort=" + sort+ "&page=" + page + "&code=" + nameSearch + "&state="+ state +"&category="+category
        axios
            .get(link, config)
            .then(function (response) {
                if (page === 0) {
                    setListAsset(response.data.content)
                    setTotalPage(response.data.totalPages)
                } else {
                    setListAsset(response.data.content)
                    setTotalPage(response.data.totalPages)
                }
            })
            .catch((error) => {
                setListAsset([])
                setTotalPage(0)
            });
    }
    function getListAssetFilterState(checked, page, sort, nameSearch) {
        console.log("hehee")
        let link = "";
        let state = "";
        let category ="";
        if(checked.length !== 0){
            for (let i=0;i<checked.length;i++){
                if(checked[i]==="All"){
                    state="ASSIGNED AVAILABLE UNAVAILABLE WAITING_FOR_RECYCLE RECYCLED"
                    break;
                }
                if(checked[i] === "Not available")
                    state = state + "UNAVAILABLE ";
                if(checked[i] === "Waiting for recycling")
                    state = state + "WAITING_FOR_RECYCLE ";
                if(checked[i] === "Assigned")
                    state = state + "ASSIGNED ";
                if(checked[i] === "Recycled")
                    state = state + "RECYCLED ";
                if(checked[i] === "Available")
                    state = state + "AVAILABLE ";
            }
        }
        else{
            state = "AVAILABLE UNAVAILABLE";
        }
        if(checkedCategory.length !== 0){
            for (let i=0;i<checkedCategory.length;i++){
                listCategory.map(item=>{
                    if(item.categoryName === checkedCategory[i]){
                        category = category + item.categoryId + " ";
                    }
                })
            }
        }
        console.log(state)


        link = "https://asset-assignment-be.azurewebsites.net/api/asset?state=" +state+"&sort=" + sort+ "&page=" + page + "&code=" + nameSearch +"&category="+category
        axios
            .get(link, config)
            .then(function (response) {
                if (page === 0) {
                    setListAssetFilter(response.data.content)
                    setTotalPage(response.data.totalPages)
                } else {
                    setListAssetFilter(response.data.content)
                    setTotalPage(response.data.totalPages)
                }
            })
            .catch((error) => {
                console.log("hihih")
                setListAssetFilter([])
                setTotalPage(0)
            });
    }
    const getListAssetSort = (col) => {
        setState({
            current: 0,
        });
        switch (col) {
            case 'ca': {
                setSort({...sort, name: "ca"})
                getListAssetFilterSortSearch("ca", 0,nameSearch);
                break;
            }
            case 'cd': {
                setSort({...sort, name: "cd"})
                getListAssetFilterSortSearch("cd",  0, nameSearch);
                break;
            }
            case 'na': {
                setSort({...sort, name: "na"})
                getListAssetFilterSortSearch("na",  0,nameSearch);
                break;
            }
            case 'nd': {
                setSort({...sort, name: "nd"})
                getListAssetFilterSortSearch("nd", 0, nameSearch);
                break;
            }
            case 'ed': {
                setSort({...sort, name: "ed"})
                getListAssetFilterSortSearch("ed", 0, nameSearch);
                break;
            }
            case 'ea': {
                setSort({...sort, name: "ea"})
                getListAssetFilterSortSearch("ea", 0, nameSearch);
                break;
            }
            case 'sd': {
                setSort({...sort, name: "sd"})
                getListAssetFilterSortSearch("sd",  0,nameSearch);
                break;
            }
            case 'sa': {
                setSort({...sort, name: "sa"})
                getListAssetFilterSortSearch("sa", 0, nameSearch);
                break;
            }
            default:
                break;
        }
    }


    useEffect(() => {
        getListCategory();
        getListAsset();
    }, []);



    const handleChange = (page) => {
        setCheckFilter(true)
        setState({
            current: page,
        });
        let checkpage = 0;
        if (page > 0) {
            checkpage = page - 1;
        }
        getListAssetFilterSortSearch(sort.name,checkpage,nameSearch);
    };
    function getListAssetToPage(page,nameSearch) {
        if (checked.length !== 0 || checkedCategory.length !== 0) {
            getListAssetFilterState(checked, page, sort.name, nameSearch)
        } else {
            getListAssetFilterSortSearch(sort.name, 0, nameSearch);
        }
    }

    const handleCheck = (event) => {
        setCheckFilter(true)

        setNameSearch("")
        let updatedList = [...checked];
        if (event.target.checked) {
            checked.push(event.target.value)
            updatedList = [...checked]
        } else {
            checked.splice(checked.indexOf(event.target.value), 1);
            updatedList = [...checked]
        }
        console.log(checked);
        setState({
            current: 0,
        });
        getListAssetToPage(0,nameSearch)
    };

    const findListAsset= () => {
        if (nameSearch.length > 20)
            toast.error("Invalid input ");
        else {
            setState({
                current: 0,
            });
            setCheckFilter(true)
            if (checked.length !== 0 || checkedCategory.length !== 0) {
                getListAssetFilterState(checked, 0, sort.name, nameSearch)
            } else {
                getListAssetFilterSortSearch(sort.name, 0, nameSearch);
            }
        }
    }
    const handleCheckCategory = (event) => {
        setCheckFilter(true)

        setNameSearch("")
        let updatedList = [...checked];
        if (event.target.checked) {
            checkedCategory.push(event.target.value)
            updatedList = [...checkedCategory]
        } else {
            {
                checkedCategory.splice(checkedCategory.indexOf(event.target.value), 1);
                updatedList = [...checkedCategory]
            }
        }
        console.log( checkedCategory);
        setState({
            current: 0,
        });
        getListAssetToPage(0,nameSearch)
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
                                                    <input value={item} type="checkbox"
                                                           name="role1" id={index}
                                                           style={{marginTop: "12px"}}
                                                           onChange={handleCheck}
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
                                    <div className="dropdown-content-category">
                                        <ul style={{listStyleType: "none"}}>

                                            {listCategory.map((item, i) => (

                                                <li key={i+6}>
                                                    <input value={item.categoryName} type="checkbox" name="role" id={i+6}
                                                           style={{marginTop: "12px"}}
                                                           onChange={handleCheckCategory}
                                                    />
                                                    <label htmlFor={i+6}
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
                                        value={nameSearch || ""}
                                        id="search-query"
                                        onChange={e => setNameSearch(e.target.value)}
                                    />

                                    <button type="button" className="button-search" onClick={findListAsset}>
                                        <FontAwesomeIcon icon={faSearch}/></button>
                                </div>
                            }
                            <div id="create-btn-section">
                                <button className="btn-createUser" onClick={() => {
                                navigate("/createAsset")}}>
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
                                        {
                                            totalPage === 0 ?
                                                ""
                                                :
                                                <thead>
                                                <tr>
                                                    <th  className="col_asset col_assetCode_asset">
                                                        <p className="col_1 assetCode_asset_col">Asset Code
                                                            {
                                                                sort.name === "cd" ?
                                                                    <FontAwesomeIcon
                                                                        id="up_No"
                                                                        onClick={() => getListAssetSort("ca")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortUp}>`
                                                                    </FontAwesomeIcon>
                                                                    :
                                                                    <FontAwesomeIcon
                                                                        id="down_No"
                                                                        onClick={() => getListAssetSort("cd")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortDown}>`
                                                                    </FontAwesomeIcon>

                                                            }
                                                        </p>
                                                    </th>
                                                    <th className="col_asset col_assetName">
                                                        <p className=" col_1 assetName_col">Asset Name
                                                            {
                                                                sort.name === "nd" ?
                                                                    <FontAwesomeIcon
                                                                        id="up_No"
                                                                        onClick={() => getListAssetSort("na")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortUp}>`
                                                                    </FontAwesomeIcon>
                                                                    :
                                                                    <FontAwesomeIcon
                                                                        id="down_No"
                                                                        onClick={() => getListAssetSort("nd")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortDown}>`
                                                                    </FontAwesomeIcon>

                                                            }
                                                        </p>
                                                    </th>
                                                    <th className="col_asset col_assetCategory">
                                                        <p className="col_1 assetCategory_col">Category
                                                            {
                                                                sort.name === "ed" ?
                                                                    <FontAwesomeIcon
                                                                        id="up_No"
                                                                        onClick={() => getListAssetSort("ea")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortUp}>`
                                                                    </FontAwesomeIcon>
                                                                    :
                                                                    <FontAwesomeIcon
                                                                        id="down_No"
                                                                        onClick={() => getListAssetSort("ed")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortDown}>`
                                                                    </FontAwesomeIcon>

                                                            }
                                                        </p>
                                                    </th>
                                                    <th className="col_asset col_state">
                                                        <p className="col_1 state_col">State
                                                            {
                                                                sort.name === "sd" ?
                                                                    <FontAwesomeIcon
                                                                        id="up_No"
                                                                        onClick={() => getListAssetSort("sa")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortUp}>`
                                                                    </FontAwesomeIcon>
                                                                    :
                                                                    <FontAwesomeIcon
                                                                        id="down_No"
                                                                        onClick={() => getListAssetSort("sd")}
                                                                        style={{marginLeft: "0.3rem"}}
                                                                        icon={faSortDown}>`
                                                                    </FontAwesomeIcon>

                                                            }
                                                        </p>
                                                    </th>
                                                </tr>
                                                </thead>
                                        }
                                        <TableAssets listAsset = {listAsset} listFilterState = {listAssetFilter}
                                                     checkSearch ={checkFilter}
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