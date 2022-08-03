import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle, faSortDown, faPencilAlt, faSortUp} from '@fortawesome/free-solid-svg-icons';
import "antd/dist/antd.css";
import "./TableAssets.css"
import {ReloadOutlined, CloseCircleOutlined, LoadingOutlined} from "@ant-design/icons";


function TableAsset(props) {
    const [displayList, setDisplayList] = useState(props.listAsset);


    useEffect(() => {
        setDisplayList(props.listAsset);
    }, [props.listAsset])


    return (
        <>
            {

                displayList.length === 0 ?
                    <>
                        <LoadingOutlined
                            style={{fontSize: "60px", color: "red", textAlign: "center", marginTop: "70px"}}/>
                    </>
                    :
                    <>

                        <tbody>
                        {

                            displayList.map((item, index) => {
                                return <tr key={index}>
                                    <td className="col_asset col_assetCode_asset">
                                        <p className="col  assetCode_asset_col">{item.assetCode}
                                        </p>
                                    </td>
                                    <td className="col_asset col_assetName">
                                        <p className="col assetName_col">{item.assetName}
                                        </p>
                                    </td>
                                    <td className="col_asset col_assetCategory">
                                        <p className="col assetCategory_col">{item.categoryName}
                                        </p>
                                    </td>
                                    <td className="col_asset col_state">
                                        <p className="col state_col">{item.state}</p>
                                    </td>
                                    {
                                        item.state === "ASSIGNED" ?
                                            <>
                                                <td className="btn_col_assignment edit ant-pagination-disabled">
                                                    <i className="fas fa-pencil-alt"></i>
                                                    <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
                                                </td>
                                                <td className="btn_col_assignment delete ant-pagination-disabled">
                                                    <CloseCircleOutlined style={{color: "#F3AAAA"}}/>
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

                                            </>

                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </>
            }
        </>
    )
}


export default (TableAsset)