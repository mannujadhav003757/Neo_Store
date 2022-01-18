import React from 'react'
import { ListGroup, Table } from 'react-bootstrap'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Button, CloseButton, Form } from 'react-bootstrap'
import toast, { Toaster } from 'react-hot-toast';
import Header from './Header'
import Footer from './Footer'
import '../index.css';
import NewAddress from './NewAddress'
import { useNavigate,Outlet } from 'react-router-dom'
//import IconButton from '@mui/material'
//import CloseIcon from '@material-ui/core';
import Order from './Order'
export default function Profile() {
    const navigate = useNavigate()
    const [record, setRecord] = useState("")
    //const [user,setUser] = useState({})
    const [showProfile, setShowProfile] = useState(true)
    const [showOrders, setShowOrders] = useState(false)
    const [showAddress, setShowAddress] = useState(false)
    const [showPasswordModule, setShowPasswordModule] = useState(false)
    const [showAddForm, setShowAddForm] = useState(true)
    const [showForm,setShowForm] = useState(false)


    localStorage.setItem('userName',record.fname)

    const navProfile = () => {
        setShowProfile(true)
        //setShowProfile(false)
        setShowOrders(false)
        setShowAddress(false)
        setShowPasswordModule(false)
    }
    const navOrder = () => {
        setShowProfile(false)
        setShowPasswordModule(false)
        setShowOrders(true)
    }
    const navAddress = () => {
        setShowProfile(false)
        setShowOrders(false)
        setShowPasswordModule(false)
        setShowAddress(true)
    }
    const navPasswordModule = () => {
        setShowProfile(false)
        setShowOrders(false)
        setShowAddress(false)
        setShowPasswordModule(true)
    }

    const navNewAddress = (e) =>{
        e.preventDefault();
        setShowAddress(false)
        navigate('/newAddress')
    }
    useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token')

            const options = {
                headers: {
                    'token': token
                }
            }

            axios.get('http://localhost:8081/profileDetails', options).then(res => {
                console.log(res.data.data)
                setRecord(res.data.data)
            }).catch(err => {
                console.log(err)

            })
        }
        console.log('e')
    }, []);

    const [showPassErr, setShowPassErr] = useState("false")
    const [showResPassErr, setShowResPassErr] = useState("false")
    const [showConfPassErr, setShowConfPassErr] = useState("false")
    const [user, setUser] = useState({
        email: "",
        password: "",
        resPass: "",
        confPass: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({
            ...user,
            email: record.email,
            [name]: value,
        })
    }
    console.log(user)

    const changePassword = (e) => {
        e.preventDefault()
        //const pwdRegex=/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/

        if (user.password && user.resPass && user.confPass) {
            const input = {
                email: user.email,
                password: user.password
            }
            const token = localStorage.getItem('token')

            const options = {    
                headers: {
                    'token': token,
                }
            }

            axios.put('http://localhost:8081/changePassword', input,options, { validateStatus: false }).then((res) => {
                //alert(res.data.message)
                if (res.data.statusCode === 200) {
                    toast.success(res.data.message)
                    // localStorage.setItem(res.data.data)

                } else {
                    toast.error(res.data.message)
                }
            }).catch((err) => {
                toast.error(err)
            })
        }
        else {
            toast.error('please fill all the fields with proper input')
        }
    }

    const id = record._id

    console.log("here is id" , id)

    return (
        <>
            <Header user={record.fname} />
            <div className="container mt-4 mb-4">
                <Toaster />
                <h3 className="mb-4">My Account</h3>
                <hr />
                <div className="container">
                    <div className="row" style={{ border: "solid thin" }}>
                        <div className="col-sm-4">
                            <img src="./image/sofa1.jpeg" className="mt-4" style={{ height: "250px", width: "250px" }} />
                            <br />
                            <h5 className="ml-4">{record.fname} {record.lname}</h5>
                            <ListGroup className="mb-4">
                                <ListGroup.Item className="list1" onClick={navOrder} style={{ cursor: "pointer" }}>Order</ListGroup.Item>
                                <ListGroup.Item className="list1" onClick={navProfile} style={{ cursor: "pointer" }}>Profile</ListGroup.Item>
                                <ListGroup.Item className="list1" onClick={navAddress} style={{ cursor: "pointer" }}>Address</ListGroup.Item>
                                <ListGroup.Item className="list1" onClick={navPasswordModule} style={{ cursor: "pointer" }}>Change Password</ListGroup.Item>
                            </ListGroup>
                        </div>
                        {showProfile ? <div className="col-sm-7 mt-4 mb-4" style={{ border: "solid thin grey", borderRadius: "5px", boxShadow: "5px 10px 8px 10px #888888" }}>
                            <div className="row mt-5 mb-5">
                                <div className="col-sm-4">
                                    <b>First Name : </b>
                                </div>
                                <div className="col-sm-8">
                                    <span>{record.fname}</span>
                                </div>
                            </div>

                            <div className="row mt-5 mb-5">
                                <div className="col-sm-4">
                                    <b>Last Name : </b>
                                </div>
                                <div className="col-sm-8">
                                    <span>{record.lname}</span>
                                </div>
                            </div>
                            <div className="row mt-5 mb-5">
                                <div className="col-sm-4">
                                    <b>Gender : </b>
                                </div>
                                <div className="col-sm-8">
                                    <span>{record.gender}</span>
                                </div>
                            </div>
                            <div className="row mt-5 mb-5">
                                <div className="col-sm-4">
                                    <b>Email : </b>
                                </div>
                                <div className="col-sm-8">
                                    <span>{record.email}</span>
                                </div>
                            </div>
                            <div className="row mt-5 mb-5">
                                <div className="col-sm-4">
                                    <b>Mobile No : </b>
                                </div>
                                <div className="col-sm-8">
                                    <span>{record.mobile}</span>
                                </div>
                            </div>
                        </div> : false}

                        {/* Order module */}
                        {showOrders ? <div className="col-sm-7 mt-4 mb-4" style={{ border: "solid thin grey", borderRadius: "5px", boxShadow: "5px 10px 8px 10px #888888" }}>
                            {/* <h1>Here is Order</h1> */}
                            <div className="container mt-2" style={{ border: "solid thin grey", borderRadius: "5px", boxShadow: "5px 10px 8px #888888" }}>
                                <div className="row mb-2" style={{ borderBottom: "solid thin grey" }}>
                                    <p> <span style={{ color: "gold", fontSize: "large" }}><b>Transit</b></span> Order By:</p>
                                    <p>Placed on: 26/09/2021 /<span style={{ color: "green" }}> Rs. 690/- </span></p>
                                </div>
                                <div className="row pb-2 mb-2" style={{ borderBottom: "solid thin grey" }}>
                                    <img src="./image/sofa1.jpeg" style={{ height: "80px", width: "100px" }} />
                                </div>
                                <div className="row pb-2">
                                    <Button variant="secondary">Download Invoice As PDF</Button>
                                </div>
                            </div>
                        </div> : false}
                        {/* Address Module */}
                        {showAddress ? <div className="col-sm-7 mt-4 mb-4" style={{ border: "solid thin grey", borderRadius: "5px", boxShadow: "5px 10px 8px 10px #888888" }}>
                            {showAddForm ? <div>
                                <h4>Addressess</h4>
                                <hr />
                                <div className="container" style={{ border: "solid thin grey", borderRadius: "5px", boxShadow: "5px 10px 8px 10px #888888" }}>
                                    <div className="row mb-2" style={{ borderBottom: "solid thin grey" }}>
                                        <span className="mt-2 col-sm-11">302 Abhishek Avenue</span>
                                        <div className=" btn-sm mt-2 col-sm-1 ">
                                            <CloseButton variant="danger" className="btn-sm  " />
                                        </div>
                                        <span>Indore -413512</span>
                                        <span>India</span>
                                        <Button className="col-sm-2 btn-sm mt-4 mb-2" >Edit</Button>
                                    </div>
                                    <div className="row mb-2">
                                        <Button className="col-sm-2 btn-sm" onClick={navNewAddress}>Add Address</Button>
                                    </div>
                                </div>
                            </div> : false}
                            <Outlet />
                        </div> : false}

                        {/* Change Password Module */}
                        {showPasswordModule ? <div className="col-sm-7 mt-4 mb-4" style={{ border: "solid thin grey", borderRadius: "5px", boxShadow: "5px 10px 8px 10px #888888" }}>
                            <h4 className="mt-3">Change Password</h4>
                            <hr />
                            <Form style={{ paddingTop: "20px" }}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Old Password:</Form.Label>
                                    <Form.Control type="text" placeholder="Old password" name='password' value={user.password} onChange={handleChange} />
                                    {showPassErr ? <Form.Text className="text-muted">

                                    </Form.Text> : false}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>New Password:</Form.Label>
                                    <Form.Control type="password" placeholder="New Password" name="resPass" value={user.resPass} onChange={handleChange} />
                                    <Form.Text className="text-muted">

                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Confirm Password:</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm Password" name="confPass" value={user.confPass} onChange={handleChange} />
                                    <Form.Text className="text-muted">

                                    </Form.Text>
                                </Form.Group>
                                <Button variant="primary" type="button" style={{ marginLeft: "45%" }} onClick={changePassword} >
                                    Submit
                                </Button>
                            </Form>
                        </div> : false}

                    </div>
                </div>
            </div>
        {showForm ? <NewAddress value={id} /> : true }
            {/* <NewAddress /> */}
            <Footer />
        </>
    )
}
