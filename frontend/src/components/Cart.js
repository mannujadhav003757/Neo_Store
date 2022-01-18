import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { ListGroup, Button, Table, Dropdown, DropdownButton,Form } from 'react-bootstrap'
import StepProgressBar from 'react-step-progress'
import 'react-step-progress/dist/index.css';
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate,Outlet } from 'react-router-dom'
export default function Cart() {
    const navigate = useNavigate()

    //defining states
    const [data, setData] = useState([])
    const [subTotal, setSubTotal] = useState(0)
    const [gst, setGst] = useState(0)
    const [orderTotal, setOrderTotal] = useState(0)
    const [address, setAddress] = useState([])
    const [showAddress, setShowAddress] = useState({})
    const [showCart, setShowCart] = useState(true)
    const [showPayment,setShowPayment] = useState(false)
    const [checkAddres,setCheckAddress] =useState()

    console.log(data)
    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('cartDetails')))

        const token = localStorage.getItem('token')

        axios.get('http://localhost:8081/getAddress', { headers: { token: token } }).then(res => {
            console.log("Here is response", res.data.data)
            setAddress(res.data.data)



        }).catch(err => {
            console.log(err)

        })


    }, [])


    console.log("Address is here", address)

    //function of less quantity button
    const onLessQuantity = (item) => {
        const index = data.indexOf(item)

        if (index > -1) {
            const temp = data
            if (temp[index].quantity >= 1) {
                temp[index].quantity--
                if (temp[index].quantity === 0) {
                    temp.splice(index, 1);
                    localStorage.setItem('cartDetails', JSON.stringify(temp))
                    setData(JSON.parse(localStorage.getItem('cartDetails')))
                } else {
                    localStorage.setItem('cartDetails', JSON.stringify(temp))
                    setData(JSON.parse(localStorage.getItem('cartDetails')))
                }

            }

        }
    }

    //function for increase quantity button
    const onAddQuantity = (item) => {
        const index = data.indexOf(item)

        if (index > -1) {
            const temp = data
            temp[index].quantity++

            localStorage.setItem('cartDetails', JSON.stringify(temp))
            setData(JSON.parse(localStorage.getItem('cartDetails')))

        }

    }

    //function for delete product from the list
    const deleteProduct = (item) => {
        const index = data.indexOf(item)

        if (index > -1) {
            const temp = data
            temp.splice(index, 1);
            localStorage.setItem('cartDetails', JSON.stringify(temp))
            setData(JSON.parse(localStorage.getItem('cartDetails')))
        }
    }

    //function for calculate overall cart expenses
    const calculateExpenses = () => {
    
        let totalNumber = 0;
        for (let i = 0, l = data.length; i < l; i++) {
            setSubTotal(totalNumber += data[i].total_productCost * data[i].quantity)
        }
        setGst(5)
        const tempTotal = (subTotal * gst) / 100
        console.log("****************************")
        console.log(subTotal)
        setOrderTotal(subTotal + tempTotal)
        console.log(orderTotal)
        
    }
    
    console.log("here is Data", data)

    //function for fetching address in cart for order
    const fetchAddress = (item, index) => {
        //alert("function calling")
        setShowAddress(item)
        setCheckAddress(item)
        console.log("here is fectched address", item)
        console.log("here is fetched state", showAddress)
    }
  
    //function for place order
    const addToOrderPlace = (e) => {
        e.preventDefault()
        //alert("function calling")
        const token = localStorage.getItem('token')

        const found = address.find(element => element === address.customer_id);

        console.log("here is founded element", data)
        const tempProduct = []


        data.forEach(el => {
            let obj = {
                product_id: el._id,
                quantity: el.quantity,
                product_cost: el.product_cost,
                total_productCost: el.total_productCost
            }

            tempProduct.push(obj)
        })
        const orderData = {
            customer_id: showAddress.customer_id,
            deliveryAddress: showAddress._id,
            total_cartCost: orderTotal,
            flag: "checkout",
            product_details: tempProduct,
        }

        console.log("here is orderData", orderData)

        axios.post('http://localhost:8081/addProductToCartCheckout', orderData, { headers: { token: token } }, { validateStatus: false }).then(res => {
            console.log("Here is response", res.data)
            setAddress(res.data.data)
            alert("order placed")
            localStorage.removeItem('myCart')
            navigate('/greeting')
           
        }).catch(err => {
            console.log(err)

        })
    }

    //function for navigate cart to payment submodule
    const navPayment = () =>{
        if(showAddress.address)
        {
            setShowCart(false)
        setShowPayment(true)
        }
        else{
        
        }
    }
 
    //defining states for payments input 
    const [cardNumber,setCardNumber] = useState('')
    const [cardExpiry,setCardExpiry] = useState('')
    const [cardCvv,setCardCvv] = useState('')
    const [showCardErr,setShowCardErr] = useState(false)
    const [showExpiryErr,setExpiryErr] = useState(false)
    const [showCvvErr,setShowCvvErr] = useState(false)


    console.log(cardNumber,cardExpiry,cardCvv)

    return (
        <>
            <Header />

            {showCart ? <div className='container-fluid mb-4'>
                {data.length === 0 ? <h3>Cart Empty, Please Add product <a href='/product'>Goto Product</a></h3> : <div className='row'>
                    <div className='col-sm-9 mt-4 ml-2 mt-2' style={{ border: "solid thin grey" }}>
                        <div className='row mb-2'>
                            <div className='col-sm-5 mt-2'>
                                <b>Product</b>
                            </div>
                            <div className='col-sm-2  mt-2'>
                                <b>Quantity</b>
                            </div>
                            <div className='col-sm-2  mt-2'>
                                <b>Price</b>
                            </div>
                            <div className='col-sm-2  mt-2'>
                                <b>Total</b>
                            </div>
                            <div className='col-sm-1  mt-2'>
                                <b>#</b>
                            </div>
                        </div>

                        {data.map((item, index) => <div className='row mb-2' style={{ borderBottom: "solid thin grey" }}>
                            <div className='col-sm-5 row mt-2 mb-2'>
                                <img src={item.product_image} style={{ height: "60px", width: "60px" }} className="col-sm-4" />
                                <p className='col-sm-8'>{item.product_name}<br />
                                    By {item.product_producer}.<br />
                                    Status: In stocks <b>{item.product_stock}</b>available
                                </p>
                            </div>
                            <div className='col-sm-2  mt-2 '>
                                <button onClick={() => onLessQuantity(item)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => onAddQuantity(item)}>+</button>
                                {/* <input type="number" className="col-sm-8" name="quantity" value={item.quantity} onChange={() => onQuantityChange(item)}/> */}
                            </div>
                            <div className='col-sm-2  mt-2'>
                                <span>{item.product_cost}</span>
                            </div>
                            <div className='col-sm-2  mt-2'>
                                <span>{item.product_cost * item.quantity}</span>
                            </div>
                            <div className='col-sm-1  mt-2'>
                                <i class="fa fa-trash" onClick={() => deleteProduct(item)}></i>
                            </div>
                        </div>)}
                        <Button className="col-sm-12 mb-2" onClick={calculateExpenses}>Calculate Expences</Button>
                    </div>
                    <div className="col-sm-3 mt-4 mb-4 ">
                        <ListGroup as="ul" style={{ borderLeft: "solid thin grey" }}>
                            <ListGroup.Item as="li" >
                                <h4>Review Order</h4>
                            </ListGroup.Item>
                            <ListGroup.Item as="li"><b>Subtotal :{subTotal} </b></ListGroup.Item>
                            <ListGroup.Item as="li" >
                                <b> GST : {gst} %</b>
                            </ListGroup.Item>
                            <ListGroup.Item as="li"><b>Order Total :{orderTotal}</b></ListGroup.Item>
                            <ListGroup.Item as="li">
                                <b>Delivery Address:</b>
                                <div className='col-sm-11' style={{ border: "solid thin grey", paddingLeft: "10px" }}> {showAddress.address} <br /> {showAddress.city} {showAddress.state}<br />- {showAddress.pincode}<br />{showAddress.country}</div>
                                <b>Select Delivery Address:</b>
                                {address.map((item, index) => <ListGroup.Item as="li" onClick={() => fetchAddress(item, index)}>{item.address} , {item.city} , {item.state} , {item.pincode} , {item.country}</ListGroup.Item>)}
                            </ListGroup.Item>
                            <ListGroup.Item as="li"><Button className="col-sm-12" href='/newAddress'>Go to add Address</Button></ListGroup.Item>
                            <ListGroup.Item as="li"><Button className="col-sm-12" onClick={navPayment}>Proceed To Buy</Button></ListGroup.Item>
                        </ListGroup>

                    </div>
                </div>}

            </div> : true}

   {   showPayment ?      <div className="container">
                <h1 className='App'>Make Payment:</h1>
                <hr />
                <Form className="col-sm-8 mb-4" style={{border:"solid thin grey",background:"grey"}}>
                    <div className='ml-4 mb-2 ' style={{color:"white"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" className="col-sm-5">
                        <Form.Label>Card Number:</Form.Label>
                        <Form.Control type="text" placeholder="Card Number" className="col-sm-4" name="cardNumber"  onChange={(e) =>{setCardNumber(e.target.value)
                        //const regexCardNumber = "^4[0-9]{12}(?:[0-9]{3})?$"
                        if(cardNumber==="" || cardNumber.length==12)
                        {
                            setShowCardErr(true)
                        }
                        else{
                            setShowCardErr(false)
                        }
                        }} />
                        {showCardErr ? <p>Invalid Card Detail Please Give 12 digit card Number</p>:false}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" className="col-sm-1" >
                        <Form.Label>Expiry:</Form.Label>
                        <Form.Control type="text" placeholder="Expiry " className="col-sm-1" name="cardExpiry"  onChange={(e) =>{setCardExpiry(e.target.value)
                         if(cardExpiry==="" || cardExpiry.length==5)
                         {
                             setExpiryErr(true)
                         }
                         else{
                             setExpiryErr(false)
                         }
                        }} />
                        {showExpiryErr ? <p>Invalid Card Expiry please Enter MM/YY format</p>:false}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" className="col-sm-1" >
                        <Form.Label>CVV</Form.Label>
                        <Form.Control type="text" placeholder="Enter Cvv" className="col-sm-1" name="cardCvv"  onChange={(e) =>{setCardCvv(e.target.value)
                         if(cardCvv==="" || cardCvv.length==3)
                         {
                             setShowCvvErr(true)
                         }
                         else{
                             setShowCvvErr(false)
                         }
                        }} />
                        {showExpiryErr ? <p>Invalid pattern of cvv please enter only three characters </p>:false}
 
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" className="mt-2">
                        <Button  onClick={addToOrderPlace}>Place Order</Button>
                    </Form.Group>
                   </div> 
                </Form>
            </div> :true   }
            <Footer />
        </>
    )
}



