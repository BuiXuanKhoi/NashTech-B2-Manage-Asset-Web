import React from "react";
import "antd/dist/antd.css";
import "../users/CreateUser.css";
import { useState } from "react";
import {Row, Col, Form, Input, Select, Button, DatePicker, Radio, Divider} from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
export default function CreateAsset(){

    const [isLoading, setLoading] = useState(false);
    const loginState = JSON.parse(localStorage.getItem("loginState"));
    const navigate = useNavigate();
    const [listCategory, setListCategory] = useState([{}]);
    let newCategory ={
        categoryName : '',
        key: '',
    }
    const {Option} = Select;
    const [form] = Form.useForm();
    const config = {
        headers: { Authorization: `Bearer ${loginState.token}` }
    };
    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 18,
            offset: 1,
        },
    };
    const addItem = () => {
        if(newCategory.categoryName.trim().length===0 || newCategory.key.trim().length===0){
            console.log(newCategory);
            toast.error("Category and Prefix must be required");
            return;
        }
       
        axios
            .post(`https://asset-assignment-be.azurewebsites.net/api/category`, {
                ...newCategory
            }, config)
            .then((response) => {
                setTimeout(() => {
                    setLoading({isLoading: false});
                }, 2000)
                console.log(response.data);
                getCategories();
                toast.success("Create new category successfully");
                setElementCategory(
                    <Button type="link" onClick= {onAddCategory}><u>Add new category</u></Button>
                )
                newCategory = {
                    categoryName: '',
                    key: '',
                }
            })
            .catch((error) => {
                toast.error(error.response.data.message);
                console.log(error)
            });
        
    }
    const cancelItem = () => {
        newCategory = {
            categoryName: '',
            key: '',
        }
        setElementCategory(
            <Button type="link" onClick= {onAddCategory}><u>Add new category</u></Button>
        )
    }
    const onAddCategory = ()=>{
        newCategory = {
            categoryName: '',
            key: '',
        }
        setElementCategory(
            <>
            <Row>
            <Input.Group compact>
                <Input className="categoryName"
                    enterKeyHint="Category"
                    placeholder="Category"
                    onChange={(e)=> {newCategory = {...newCategory, categoryName: e.target.value}}}
                    
                />
                <Input className="prefix"
                    enterKeyHint="Prefix"
                    placeholder="Prefix"
                    onChange={(e)=> {newCategory = {...newCategory, key: e.target.value}}}
                />
                </Input.Group>
                <FontAwesomeIcon 
                    className="addIcon" 
                    onClick={addItem}
                    icon={faCheck} />
                <FontAwesomeIcon 
                    className="cancelIcon" 
                    onClick={cancelItem}
                    icon={faXmark} />
                </Row>
                </>
        )
    }
    const [elementCategory, setElementCategory] = useState(
        <Button type="link" onClick= {onAddCategory}><u>Add new category</u></Button>
    )
    
    const getCategories = () =>{
        axios.get('https://asset-assignment-be.azurewebsites.net/api/category', config)
            .then((response) =>{
                setTimeout(() => {
                    setLoading({isLoading: false});
                }, 2000)
                setListCategory(response.data);
            }).catch((errors) =>{
             console.log(errors);
            // localStorage.removeItem("loginState");
            //     window.location.href = "https://mango-tree-0d1b58810.1.azurestaticapps.net/";
        });
    };
    

    useEffect(() =>{
        getCategories();
    }, [])


    const onFinish = (fieldsValue) => {
        const values = {
            ...fieldsValue,
            InstalledDate: fieldsValue["InstalledDate"].format("DD/MM/YYYY"),
        };
        console.log(values);
        axios
            .post(`https://asset-assignment-be.azurewebsites.net/api/asset`, {
                prefix: values.Category,
                specification: values.Specification,
                install: values.InstalledDate,
                status:values.State,
                name:values.Name
            }, config)
            .then((response) => {
                setTimeout(() => {
                    setLoading({isLoading: false});
                }, 2000)
                toast.success("Create a new asset successfully");
                console.log(response.data);
                navigate("/asset");

            })
            .catch((error) => {
                toast.error("Create new asset failed");
                console.log(error)
                console.log(error.response.data.message);
                // localStorage.removeItem("loginState");
                // window.location.href = "https://mango-tree-0d1b58810.1.azurestaticapps.net/";
            });
    }



    return (<>
        <Row>
            <Col span={12} offset={6}>
                <div className="content">
                    <Row className= "fontHeaderContent">
                        Create New Asset
                    </Row>
                    <Row className="formCreate">
                        <Form
                            form={form}
                            name="complex-form"
                            onFinish={onFinish}
                            {...formItemLayout}
                            labelAlign="left"
                            initialValues={{
                                State: 'Available'
                              }}
                        >
                            <Form.Item className="labelCreate" label="Name" >
                                <Form.Item
                                    name="Name"
                                    rules={[
                                        () => ({
                                            validator(_, value) {
                                                if ((value.trim())==='') {
                                                    return Promise.reject("Name must be required")
                                                }
                                                return Promise.resolve();
                                            }
                                        })
                                    ]}
                                    hasFeedback
                                >
                                    <Input disabled={isLoading.isLoading === true}
                                           className="inputForm"/>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item label="Category">
                                <Form.Item
                                    name="Category"
                                    rules={[{required: true, message: 'You must choose a category for this asset'}]}
                                    hasFeedback
                                >
                                    <Select
                                        disabled={isLoading===true}
                                        showSearch 
                                        className="inputForm"
                                        optionFilterProp="children"
                                        dropdownRender={(menu) => (
                                          <>
                                            {menu}
                                            <Divider
                                              
                                            />
                                            {elementCategory}
                                          </>
                                        )}
                                 >


                                        {listCategory.map((item,index) =>(
                                            <Option
                                                value={item.key}
                                                key={item.categoryId}
                                            >{item.categoryName}</Option>
                                        ))};
                                    </Select>
                                </Form.Item>
                            </Form.Item>

                            <Form.Item label="Specification" 
                            >
                                <Form.Item
                                    name="Specification"
                                    rules={[
                                        () => ({
                                            validator(_, value) {
                                                if ((value.trim())==='') {
                                                    return Promise.reject("Specification must be required")
                                                }
                                                return Promise.resolve();
                                            }
                                        })
                                    ]}
                                    hasFeedback
                                >
                                <TextArea 
                                          className="largeInput"
                                          rows="5" cols="20"
                                >

                                </TextArea>
                                </Form.Item>

                            </Form.Item>

                            <Form.Item label="Installed Date" >
                                <Form.Item
                                    name="InstalledDate"
                                    rules={[{required: true, message: 'Installed date must be required',},
                                        () => ({
                                            validator(_, value) {

                                                if (value === null || value === "") {
                                                    return Promise.resolve()
                                                }else if ((new Date() - value._d) < 0) {
                                                    return Promise.reject("Asset has not installed. Please select a different date")
                                                }
                                                 else {
                                                    return Promise.resolve()
                                                }
                                            }
                                        })
                                        
                                    ]}
                                    hasFeedback
                                >

                                    <DatePicker
                                        disabled={isLoading.isLoading === true}
                                        format="DD/MM/YYYY"

                                        className="inputForm"
                                    />

                                </Form.Item>
                            </Form.Item>
                            <Form.Item label="State">
                                <Form.Item name="State" rules={[{required:true, message:"State is required"}]}>

                                    <Radio.Group disabled={isLoading.isLoading === true}>
                                        <Radio value="Available" >Available</Radio>
                                        <br/>
                                        <br/>
                                        <Radio value="UnAvailable" >Not Available</Radio>
                                    </Radio.Group>

                                </Form.Item>

                            </Form.Item >

                            <Form.Item shouldUpdate > 
                                {() => (
                                    <Row style={{float: 'right'}}>
                                        < Button
                                            disabled={
                                                !form.isFieldTouched("Category") || !form.isFieldTouched("Specification")
                                                || !form.isFieldTouched("InstalledDate") || !form.isFieldTouched("Name") 
                                                ||form.getFieldsError().filter(({errors}) => errors.length).length > 0
                                            }
                                            className="buttonSave"
                                            loading={isLoading.isLoading} htmlType="submit" onClick={() => {
                                            setLoading({isLoading: true})
                                            setTimeout(() => {
                                                    setLoading({isLoading: false})
                                                }, 2000
                                            )
                                        }}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            className="buttonCancel"
                                            disabled={isLoading.isLoading === true} onClick={() => {
                                                navigate("/asset");}}>
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
    </>);


// 

  
}
