import React from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import Header from './Header'
import Footer from './Footer'
import { Form,Button } from 'react-bootstrap'
import { useState } from 'react'
import { useEffect } from 'react'
export default function ProductDetail() {
    const [record,setRecord] =useState([])
    const data =  localStorage.getItem('productDetail')
    const item=JSON.parse(data)
    console.log('-------------------',item)
    useEffect(()=>
    {
     setRecord(item)
     console.log("======================",record)
    },[])
    
    return (
        <>
            <Header />
            <div className="container mt-4 mb-4" style={{
                border: "solid thin",
                borderRadius: "4px",
                boxShadow: " 5px 10px 8px #888888"
            }}>
                <div className="row mt-4 mb-4 ">
                    <div className="App col-sm-6" style={{ borderRight: "solid thin" }}>
                        <img src={record.product_image} />
                        <div className="row">
                 { record.subImages_id.product_subImages.map( (key) => <div className="col-sm-4">
                                <img src={key} style={{height:"150px",width:'150px'}} />             
                            </div>)}
                        </div>
                    </div>
                    <div className="col-sm-6" >
                        <h4 className="App">{record.product_name}</h4>
                        <div className=" App mt-4">
                            <span class="fa fa-star checked"> </span>
                            <span class="fa fa-star checked"> </span>
                            <span class="fa fa-star checked"> </span>
                            <span class="fa fa-star"> </span>
                            <span class="fa fa-star"> </span>
                        </div>
                        <p><b>Ratings: </b> {record.product_rating}</p>
                        <hr />
                        <p><b>Price: </b> {record.product_cost} /-</p>
                        <span className="col-sm-1"><b>Color:</b> </span>
                        <Form.Control
                            type="color"
                            id="exampleColorInput"
                            defaultValue= {record.color_id.color_code}
                            title="Choose your color"
                            className="col-sm-2"
                        />
                        <p className='mt-4'>Share:  &nbsp;&nbsp;&nbsp; <i class="fa fa-share-alt"></i></p>
                        <hr/>
                        <div className='row mb-4'>
                        <i class="fa fa-facebook col-sm-1 ml-4" style={{fontSize:"30px",color:"blue"}}></i>
                        <i class="fa fa-google-plus-g col-sm-1"  style={{fontSize:"30px",color:"coral"}}></i>
                        <i class="fa fa-whatsapp col-sm-1  ml-4" style={{fontSize:"30px",color:"green"}}></i>
                        <i class="fa fa-twitter col-sm-1 ml-2" style={{fontSize:"30px",color:"DodgerBlue"}}></i>
                        <i class="fa fa-pinterest col-sm-1 ml-2"style={{fontSize:"30px",color:"red"}}></i>
                        </div>
                        <Button className='ml-4 mt-4 col-sm-5' style={{background:"DodgerBlue"}}>Add to cart</Button>
                        <Button className='ml-4 mt-4 col-sm-5' style={{background:"Sienna",marginLeft:"20px"}}>Rate Product</Button>
                    </div>
                    <div className="container mt-4">
                        <Tabs
                            defaultActiveKey="description"
                            transition={false}
                            id="noanim-tab-example"
                            className="mb-3"
                        >
                            <Tab eventKey="description" title="Description">
                                <p>
                                    {record.product_desc}
                                </p>
                            </Tab>
                            <Tab eventKey="feature" title="Feature">
                                <p>
                                    {record.product_material}
                                </p>
                            </Tab>
                        </Tabs>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
