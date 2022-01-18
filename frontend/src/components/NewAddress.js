import React from 'react'
import { Form,Button } from 'react-bootstrap'
import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';

export default function NewAddress(prop) {
    console.log("here is prop",prop)
    const [record,setRecord] = useState('')
    const [Address,setAddress] = useState({
        customer_id:'',
        address:'',
        city:'',
        state:'',
        pincode:'',
        country:''
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setAddress({
            ...Address,
            customer_id:record._id,
            [name]: value,
        })
        console.log(Address)
    }

    console.log(Address)

    useEffect(()=>{
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
    },[])

    const saveAddress = (e) =>{
        e.preventDefault()
        
        if(Address.address && Address.city && Address.state && Address.pincode && Address.country)
        {
                
                const token = localStorage.getItem('token')

                const options = {    
                    headers: {
                        'token': token,
                    }
                }
                
                console.log("Here is payload",Address)
                axios.post('http://localhost:8081/addAddress',Address, options).then(res => {
                    console.log(res.data.data)
                    if (res.data.statusCode === 201) {
                        toast.success(res.data.message)
    
                    } else {
                        toast.error(res.data.message)
                    }
                }).catch(err => {
                    console.log(err)
                    //toast.error(res.data.message)
                })
            

        }
        else
        {

        }
    }
    return (
        <>
        <Header />
        <Toaster />
        <div className='container'>
            <h4>Add New Address</h4>
            <hr />
            <div className='row'>
                <Form.Floating className="mb-3">
                    <div className='row'>
                        <div className='col-sm-6'>
                            <Form.Control
                                id="floatingInputCustom"
                                type="text"
                                placeholder="Address"
                                name="address"
                                value={Address.address}
                                onChange={handleChange}

                                
                                style={{ height: "70px" }}
                            />
                        </div>
                    </div>
                
                </Form.Floating>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            placeholder="City"
                            name="city"
                            value={Address.city}
                            onChange={handleChange}

                        />
                        <label htmlFor="floatingInputCustom">City</label>
                    </Form.Floating>
                </div>
                <div className="col-sm-4" >
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            placeholder="State"
                            name="state"
                            value={Address.state}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingInputCustom">State</label>
                    </Form.Floating>
                </div>
            </div>
            <div className='row'>
            <div className="col-sm-4" >
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            placeholder="Pin Code"
                            name="pincode"
                            value={Address.pincode}
                            onChange={handleChange}

                        />
                        <label htmlFor="floatingInputCustom">Pin Code</label>
                    </Form.Floating>
                </div>
            </div>
            <div className='row'>
            <div className="col-sm-4" >
                    <Form.Floating className="mb-3">
                        <Form.Control
                            id="floatingInputCustom"
                            type="text"
                            name="country"
                            value={Address.country}
                            placeholder="Country"
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingInputCustom">Country</label>
                    </Form.Floating>
                </div>
            </div>
            <div className="row">
                <div className='col-sm-2'><Button variant="secondary" className="fas fa-save mt-4 mb-2" href='/cart' onClick={saveAddress}>Save</Button></div>
                <div className='col-sm-2'></div>
                <div className='col-sm-2'><Button variant="secondary" className="mt-4 mb-2 fas fa-times-circle" href="/profile" >Cancel</Button></div>
            </div>
        </div>
        <Footer />
        </>
    )
}
