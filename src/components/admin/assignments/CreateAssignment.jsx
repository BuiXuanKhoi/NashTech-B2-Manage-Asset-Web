import {Row,Col,Form,Input,Button,DatePicker, Modal, Table,} from "antd";
import {SearchOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
import moment from "moment";

export default function CreateAssignment() {
    const loginState = JSON.parse(localStorage.getItem("loginState"));
    const config = {
        headers: { Authorization: `Bearer ${loginState.token}` }
    };
    const [isLoading, setLoading] = useState({isLoading: false});
    const navigate = useNavigate();
    const [submitData, setSubmitData] = useState({
        assetName: "",
        assetId: -1,
        fullName: "",
        assignToId: -1,
        assignedDate: "",
        note: ""
    });

    const [userInputValue, setUserInputValue] = useState(
        ''
    )
    const [assetInputValue, setAssetInputValue] = useState(
        ''
    )
    const [searchText, setSearchText] = useState("");
    const [userData, setUserData] = useState([]);
    const [assetData, setAssetData] = useState([]);
    const [userModal, setUserModal] = useState({
        isOpen: false,
        isLoading: false
    });
    const [assetModal, setAssetModal] = useState({
        isOpen: false,
        isLoading: false
    });
    const [form] = Form.useForm();
    const [disabledSubmit, setDisabledSubmit] = useState(true)


    const formItemLayout = {
        labelCol: {
            span: 7,
        },
        wrapperCol: {
            span: 15,
            offset: 1,
        },
    };

    const fetchData = (url, method, data) => {
        return axios({
            method: method,
            url: url,
            data: data,
        });
    };

    useEffect(() => {
        axios
            .get(`https://asset-assignment-be.azurewebsites.net/api/information/all`,config)
            .then(response => {
                let respData = response.data
                respData.forEach((element) => {
                    element.fullName = element.firstName + " " + element.lastName;
                })
                setUserData(respData);
            })
            .catch(() => {

            })

    }, []);

    const finalUserData =
        searchText === ""
            ? userData
            : userData.filter(
                (u) =>
                    (u.fullName.toLowerCase()).replace(/\s+/g, '').includes(searchText.toLowerCase().replace(/\s+/g, '')) ||
                    u.staffCode.toLowerCase().includes(searchText.toLowerCase())
            );

    const assetByState = assetData.filter((u) => u.state === "AVAILABLE")
    const finalAssetData =
        searchText === ""
            ? assetByState :
            assetByState.filter(
                (u) =>
                    u.assetName.toLowerCase().includes(searchText.toLowerCase()) ||
                    u.assetCode.toLowerCase().includes(searchText.toLowerCase()) ||
                    u.categoryCategoryname.toLowerCase().includes(searchText.toLowerCase())
            );

    useEffect(() => {
        axios
            .get(`https://asset-assignment-be.azurewebsites.net/api/asset/all`, config)
            .then(response => {
                    let respData = response.data
                    setAssetData(respData);
                }
            )
            .catch(() => {

            })
    }, [])

    const handleNoteChange = (name) => {

        setSubmitData({
            ...submitData,
            note: name.target.value,
        });
    };
    const handleAssignedDateChange = (name, Datestring) => {

        setSubmitData({
            ...submitData,
            assignedDate: Datestring,
        });
    };

    const handleCreate = (fieldsValue) => {

        
        const values = {
            ...fieldsValue,
            assignedDate: fieldsValue["assignedDate"].format("YYYY-MM-DD"),
        };
        fetchData(`${process.env.REACT_APP_UNSPLASH_ASSIGNMENT}`, "POST", {
            ...submitData,
            assignedDate: values.assignedDate
        })
            .then(() => {
                setSubmitData({
                    assetId: "",
                    assignToId: "",
                    assignedDate: "",
                    note: "",
                    assetName: "",
                    fullName: "",
                });
                navigate("/assignment");
            })
            .catch((err) => {

            });
    };
    const userColumns = [
        {
            title: "Staff code",
            dataIndex: "staffCode",
            key: "staffCode",

            sorter: (a, b) => {
                if (a.staffCode > b.staffCode) {
                    return -1;
                }
                if (b.staffCode > a.staffCode) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Full Name",
            dataIndex: "fullName",
            key: "fullName",
            sorter: (a, b) => {
                if (a.fullName > b.fullName) {
                    return -1;
                }
                if (b.fullName > a.fullName) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Type",
            dataIndex: "accountsRoleRolename",
            key: "accountsRoleRolename",
            sorter: (a, b) => {
                if (a.roleName > b.roleName) {
                    return -1;
                }
                if (b.roleName > a.roleName) {
                    return 1;
                }
                return 0;
            },
        }]
    const assetColumns = [
        {
            title: "Asset code",
            dataIndex: "assetCode",
            key: "assetCode",

            sorter: (a, b) => {
                if (a.assetCode > b.assetCode) {
                    return -1;
                }
                if (b.assetCode > a.assetCode) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Asset Name",
            dataIndex: "assetName",
            key: "assetName",
            sorter: (a, b) => {
                if (a.assetName > b.assetName) {
                    return -1;
                }
                if (b.assetName > a.assetName) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Category",
            dataIndex: "categoryCategoryname",
            key: "categoryCategoryname",
            sorter: (a, b) => {
                if (a.category > b.category) {
                    return -1;
                }
                if (b.category > a.category) {
                    return 1;
                }
                return 0;
            },
        }]

    const UserRowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

            setDisabledSubmit(false)
            setSubmitData({
                ...submitData,
                fullName: selectedRows[0].fullName,
                accountId: selectedRows[0].accountId,
            })

        },
    };
// console.log(submitData);
    const AssetRowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {

            setDisabledSubmit(false)
            setSubmitData({
                ...submitData,
                assetName: selectedRows[0].assetName,
                assetId: selectedRows[0].id,
            })

        },

    };
console.log(assetData)
    return (
        <Row>
            <Modal visible={userModal.isOpen}
            style={{position: "absolute",top: "18%", left: "48%"}}
            mask={false}
                   title="Select User"
                   footer={[

                       <Button
                           className="buttonSave"
                           // style={{ background: "#e30c18", color: "white"}}
                           disabled={disabledSubmit} loading={userModal.isLoading} key="ok" onClick={() => {
                           setUserModal({...userModal, isLoading: true});
                           setTimeout(() => {
                               setUserModal({...userModal, isLoading: false, isOpen: false})
                           }, 1000)

                           setUserInputValue({...userInputValue, userInputValue: submitData.fullName});


                           form.setFieldsValue({fullName: submitData.fullName});
                       }}>Save</Button>,
                       <Button className="buttonCancel" disabled={userModal.isLoading === true} key="back"
                               onClick={() => {
                                   setSearchText('');
                                   setUserModal({...userModal, isOpen: false});
                                   navigate("/createAssignment");
                               }}>Cancel</Button>,


                   ]}
                   closable={false}
            >
                <Input.Search
                    maxLength={255}
                    allowClear
                    onSearch={(e) => {
                        setSearchText(e.replace(/ /g, ''))
                    }}
                    onEnter={(e) => {
                        setSearchText(e.replace(/ /g, ''))
                    }}

                />
                <Table
                    rowSelection={{
                        type: "radio",
                        ...UserRowSelection,
                    }}
                    columns={userColumns}
                    dataSource={finalUserData}
                    rowKey="staffCode"
                    pagination={{
                        defaultPageSize: 5,
                        pageSizeOptions: [2, 4, 6, 8, 10]
                    }}
                />
            </Modal>

            <Modal
                visible={assetModal.isOpen}
                mask={false}
                style={{position: "absolute",top: "24%", left: "48%"}}
                   title="Select Asset"
                   footer={[
                       <Button
                           className="buttonSave"
                           disabled={disabledSubmit} loading={assetModal.isLoading} key="ok" onClick={() => {
                           setAssetModal({...assetModal, isLoading: true});
                           setTimeout(() => {
                               setAssetModal({...assetModal, isLoading: false, isOpen: false})
                           }, 1000)
                           setAssetInputValue({...assetInputValue, assetInputValue: submitData.assetName});

                           form.setFieldsValue({assetName: submitData.assetName});


                       }}>Save</Button>,
                       <Button
                           className="buttonCancel"
                           disabled={userModal.isLoading === true} key="back" onClick={() => {
                           setSearchText('');
                           setAssetModal({...assetModal, isOpen: false});
                           navigate("/createAssignment");
                       }}>Cancel</Button>
                   ]}
                   closable={false}

            >
                <Input.Search
                    maxLength={255}
                    allowClear
                    onSearch={(e) => {
                        setSearchText(e.replace(/ /g, ''))
                    }}
                    onEnter={(e) => {
                        setSearchText(e.replace(/ /g, ''))
                    }}
                />
                <Table
                    rowSelection={{
                        type: "radio",
                        ...AssetRowSelection,
                    }}
                    columns={assetColumns}
                    dataSource={finalAssetData}
                    rowKey="assetCode"
                    pagination={{
                        defaultPageSize: 5,
                        pageSizeOptions: [2, 4, 6, 8, 10]
                    }}
                />
            </Modal>
            <Col span={12} offset={4}>
                <div className="content">
                    <Row style={{marginBottom: "10px"}} className="fontHeaderContent">
                        Create New Assignment
                    </Row>
                    <Row
                        style={{marginTop: "10px", marginLeft: "5px", display: "block"}}
                    >
                        <Form
                            name="complex-form"
                            {...formItemLayout}
                            onFinish={handleCreate}
                            labelAlign="left"
                            form={form}
                        >
                            <Form.Item label="User" style={{marginBottom: 0}}>
                                <Form.Item
                                    name="fullName"
                                    // rules={[{ required: true, message: "Username must be required" },
                                    // { whitespace: true, message: 'Username can not be empty' },
                                    // { max: 50, message: 'Username must be less than 50 characters long' }
                                    // ]}
                                    style={{display: "block"}}
                                    hasFeedback
                                >

                                    <Input
                                        readOnly
                                        disabled={isLoading.isLoading === true}
                                        className="inputForm"
                                        value={userInputValue}
                                        maxLength={51}
                                        list="fullName"
                                        suffix={<span onClick={() => {
                                            setUserModal({...userModal, isOpen: true})
                                        }
                                        }><SearchOutlined/></span>}
                                    >

                                    </Input>

                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Asset" style={{marginBottom: 0}}>
                                <Form.Item
                                    name="assetName"
                                    // rules={[{ required: true, message: "Asset name must be required" },
                                    // { whitespace: true, message: 'Asset can not be empty' },
                                    // { max: 50, message: 'Asset must be less than 50 characters long' }
                                    // ]}
                                    style={{display: "block"}}
                                    hasFeedback
                                >
                                    <Input
                                        readOnly={true}
                                        disabled={isLoading.isLoading === true}
                                        className="inputForm"
                                        value={assetInputValue}
                                        maxLength={51}
                                        list="assetName"
                                        suffix={<span onClick={() => {
                                            setAssetModal({...assetModal, isOpen: true})
                                        }
                                        }><SearchOutlined/></span>}
                                        onClick={() => {
                                            setAssetModal({...assetModal, isOpen: true})
                                        }}
                                    />
                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="Assigned Date" style={{marginBottom: 0}}>
                                <Form.Item
                                    name="assignedDate"
                                    rules={[{required: true, message: 'Assigned Date must be required'},
                                        (fieldvalue) => ({
                                            validator(_, value) {

                                                if (moment(new Date().getDate(), "DD-MM-YYYY").isSameOrAfter(value._d, "DD-MM-YYYY")) {
                                                    return Promise.reject('Assigned Date can not be in the past')
                                                } else {
                                                    return Promise.resolve()
                                                }

                                            }
                                        })
                                    ]}
                                    style={{display: "block"}}
                                    hasFeedback
                                >
                                    <DatePicker
                                        disabled={isLoading.isLoading === true}
                                        style={{display: "block"}}
                                        popupStyle={{width: "25%", textAlign: "center"}}
                                        className="inputForm"
                                        format="DD-MM-YYYY"
                                        value={submitData.assignedDate}
                                        onChange={handleAssignedDateChange}

                                    />
                                </Form.Item>
                            </Form.Item>

                            <Form.Item label="Note" >
                                <Form.Item
                                    name="note"
                                    rules={[
                                        {whitespace: true, message: 'Note can not be empty'},
                                        {max: 500, message: 'Note must be less than 500 characters long'}
                                    ]}
                                    hasFeedback
                                >
                                    <Input.TextArea
                                        disabled={isLoading.isLoading === true}
                                        className="inputForm"
                                        value={submitData.note}
                                        onChange={handleNoteChange}
                                    />
                                </Form.Item>
                            </Form.Item>

                            <Form.Item shouldUpdate >
                                {()=>(
                                <Row style={{float: "right"}}>
                                        <Button
                                            disabled={
                                                !form.isFieldsTouched(true) ||
                                                form.getFieldsError().filter(({errors}) => errors.length).length > 0
                                            }
                                            className='buttonSave'
                                            // style={{width :"40px"}}
                                            loading={isLoading.isLoading}
                                            htmlType="submit"
                                            onClick={() => {
                                                setLoading({isLoading: true});
                                                setTimeout(() => {
                                                    setLoading({isLoading: false})
                                                }, 1000)
                                                handleCreate()
                                            }}
                                        >
                                            Save
                                        </Button>


                                        <Button
                                            className="buttonCancel"
                                            style={{width: "40px" }}
                                            disabled={isLoading.isLoading === true}
                                            onClick={() => {
                                                navigate("/assignment");
                                            }}
                                        >
                                            Cancel
                                        </Button>

                                </Row>
                                )}
                            </Form.Item>
                        </Form>
                    </Row>
                </div>
            </Col>
        </Row>
    )
}