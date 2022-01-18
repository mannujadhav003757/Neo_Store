import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Carousel, Card, Button } from 'react-bootstrap'
import axios from 'axios'
import { useState } from 'react'
import {useEffect} from 'react'
export default function Dashboard(props) {
    console.log('props',props)
    const [record,setRecord] = useState([])
    useEffect(() =>{
        axios.get('http://localhost:8081/commonProducts').then(res => {
        console.log('here is data',res.data.data)
        setRecord(res.data.data)
    }).catch(err => {
        console.log(err)
    })
    },[])
    
    return (
        <>
            <Header />
            <div className="container-fluid mb-4">
                <Carousel style={{ height: "20%", width: "100%" }}>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./image/carsofa.jpg"
                            alt="First slide"
                            style={{ height: "20%", width: "100%" }}
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./image/carsofa2.jpg"
                            alt="Second slide"
                            style={{ height: "20%", width: "100%" }}
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="./image/carsofa5.jpg"
                            alt="Third slide"
                            style={{ height: "20%", width: "100%" }}
                        />

                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            <h5 className="App mt-4">Popular Products</h5>
            <p className="App mb-4"><b>View all</b></p>

            <div className="container mb-4">
                <div className="row mb-4 mt-4">
                { record.map((item) =>       <div className="col-sm-4 ml-2 mb-4 ">
                        
                        <Card style={{ width: '18rem' }} style={{border:"solid grey thin",borderRadius: "5px", boxShadow: "5px 10px 8px 10px #888888"}}>
                        <Card.Img variant="top" src={item.product_image} style={{height:"200px",width:"100%"}} />
                        <Card.Body>
                            <Card.Title className="App">{item.product_name}</Card.Title>
                            <Card.Text className="App">
                                <b>Rs. {item.product_cost} /-</b>
                            </Card.Text>
                            <div className="App">
                                <Button variant="danger">Add to Cart</Button>
                            </div>
                            <div className="App mt-2">
                            <span class="fa fa-star checked"> </span>
                            <span class="fa fa-star checked"> </span>
                            <span class="fa fa-star checked"> </span>
                            <span class="fa fa-star"> </span>
                            <span class="fa fa-star"> </span>
                            </div>
                        </Card.Body>
                    </Card>
                        
                       
                    </div>)}
                    
                </div>
            </div>

            <Footer />
        </>
    )
}
