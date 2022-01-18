import React from 'react'
import { Navbar, Nav, Container, InputGroup, FormControl, Button,DropdownButton,Dropdown } from 'react-bootstrap'
//import { useNavigate,Outlet } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

import { useNavigate,Outlet } from 'react-router-dom'

export default function Header(prop) {
    // const navigate = useNavigate()
    const [show,setShow] = useState(false)
    let [count, setCount] = useState(0)
    let [searchText, setSearch] =useState('')

    const userName=localStorage.getItem('userName')
    const demoString = "Welcome "

    const token = localStorage.getItem('token')
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('cartDetails'))

        setCount(localData.length)

        if(localStorage.getItem('token'))
        {
            setShow(true)
        }
        else
        {
            setShow(false)
        }

    })

    const logOut = () =>{
        alert("function called")
        localStorage.removeItem("token");
        localStorage.removeItem('userName')
        localStorage.removeItem("cartDetails");
        setShow(false)
    }



   
    
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><b>Neo<span style={{ color: "red" }}>STORE</span></b></Navbar.Brand>
                    <Nav className=" ml-4">
                        <b> <Nav.Link href="/" className="ml-4" style={{marginLeft:"100px"}}>Home</Nav.Link></b>
                        <b><Nav.Link href="/product" style={{ marginLeft: "40px" }} className="ml-4">Products</Nav.Link></b>
                        <b><Nav.Link href="#pricing" style={{ marginLeft: "40px" }} className="ml-4">Order</Nav.Link></b>

                        <a href="/cart" className="btn btn-primary ml-4 w-50" >
                        <span className='fa fa-shopping-cart fa-shopping-cart'></span>&nbsp;&nbsp;
                        <span>Cart</span>&nbsp;&nbsp;
                        <span class="badge badge-secondary bg-dark">{count}</span>
                        </a>
                        {/* <Button variant="secondary"style={{ marginLeft: "80px" }}  className=" fa fa-shopping-cart fa-shopping-cart ml-4" href="/cart">Cart</Button> */}

                        <DropdownButton
                            variant="outline-secondary"
                            id="input-group-dropdown-1"
                            style={{ marginLeft: "50px" }}
                            title={demoString+userName}
                            className="ml-4 far fa-user"
                        >
                             
                    <Dropdown.Item href="/profile" >Profile</Dropdown.Item> 
                    {/* <Dropdown.Item href="">Orders</Dropdown.Item>  */}
                  <Dropdown.Item href="/login" >Login</Dropdown.Item> 
                        <Dropdown.Item href="/register">Register</Dropdown.Item>
                        <Dropdown.Item href="#" onClick={logOut}>Logout</Dropdown.Item>   

                            
                        </DropdownButton>
                        
                    </Nav>
                </Container>
            </Navbar>
            
        </>
    )
}
