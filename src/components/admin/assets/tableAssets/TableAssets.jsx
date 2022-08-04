import React, {useState, useEffect} from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTimesCircle, faSortDown, faPencilAlt, faSortUp} from '@fortawesome/free-solid-svg-icons';
import "antd/dist/antd.css";
import "./TableAssets.css"
import {ReloadOutlined, CloseCircleOutlined, LoadingOutlined} from "@ant-design/icons";
import { Modal, Button } from 'antd';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

import toast, {Toaster} from "react-hot-toast";


function TableAsset(props) {
    
    const loginState = JSON.parse(localStorage.getItem("loginState"));
    const [displayList, setDisplayList] = useState(props.listAsset);
    const navigate = useNavigate();
    const [modalConfirmDelete, setModalConfirmDelete] = useState({
        isOpen: false,
        isLoading: false,
    });
    const config = {
        headers: { Authorization: `Bearer ${loginState.token}` }
    };
    
    const [modalCannotDelete, setModalCannotDelete] = useState(false);
    const [id,setId] = useState(0);
    const [assetName, setAssetName]=useState('');
    const handleDelete = ()=>{
        console.log(id);
        axios.delete(`https://asset-assignment-be.azurewebsites.net/api/asset/`+id, config)
            .then(
           (response) => {
            setModalConfirmDelete({ ...modalConfirmDelete, isOpen: false })
            toast.success("Delete "+assetName+" successfully");
            window.location.reload();
            }).catch((error) => {
                console.log(error)
                setModalConfirmDelete({ ...modalConfirmDelete, isOpen: false })
                if(error.response.data.statusCode === 404){
                    toast.error("This asset has been deleted before")
                    window.location.reload();
                }
                else if(error.response.data.statusCode === 405){
                    setModalCannotDelete({...modalCannotDelete, isOpen: true})
                }
                else{
                    toast.error("Delete "+assetName+" failed")
                    window.location.reload();
                }
            })
        }
   

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
                                                <td className="btn_col_assignment edit" onClick={() => {
                                        navigate("/editAsset/" + item.assetId)}}>
                                                    <i className="fas fa-pencil-alt"></i>
                                                    <FontAwesomeIcon icon={faPencilAlt}></FontAwesomeIcon>
                                                </td>
                                                <td className="btn_col_assignment delete" onClick={()=>{
                                                    setId(item.assetId);
                                                    setAssetName(item.assetName)
                                                    console.log(id);
                                                    setModalConfirmDelete({ ...modalConfirmDelete, isOpen: true })
                                                }}>
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
            
            <Modal
        className = "modalConfirm"
                title="Are you sure?"
                visible={modalConfirmDelete.isOpen}
                width={400}
                closable={false}
                onOk={handleDelete}
                onCancel = {()=> {setModalConfirmDelete({ ...modalConfirmDelete, isOpen: false })}}
                footer={[
                    <Button key="submit" className="buttonSave" onClick={handleDelete}>
                     Delete
                    </Button>,
                    <Button key="cancel" className = "buttonCancel" onClick={()=> {setModalConfirmDelete({ ...modalConfirmDelete, isOpen: false })}}>
                      Cancel
                    </Button>
                  ]}
                
            >
                <p>Do you want to delete this asset?</p>
                <br/>
            </Modal>
            <Modal
                className="modalInformation"
                title="Cannot delete asset"
                visible={modalCannotDelete.isOpen}
                width={400}
                closable={true}
                onCancel={() => {
                    setModalCannotDelete({...modalCannotDelete, isOpen: false});
                }}
                footer={[]}
            >
                <p>Cannot delete the asset because it belongs to one or more historical assignments.
If the asset is not able to be used anymore, please update its state in <Button type="link" onClick={()=>{navigate("/editAsset/"+id)}}><u>Edit Asset page</u></Button></p>
                <br/>
            </Modal>
            
        </>
    )
}


export default (TableAsset)