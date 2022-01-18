import React from 'react'
import { Button,Form } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import GoogleLogin from 'react-google-login'
import FacebookLogin from 'react-facebook-login';
import { useNavigate} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function LogIn() {
    //const {getProfile} = useContext(GlobalInfo)
    const navigate = useNavigate()
    const [user,setUser]= useState({
            email:'',
            password:''
    })

    const [emailErr,setEmailErr] = useState(false)
    const [passwordErr,setPasswordErr] = useState(false)
    const handleChange = (e) =>{
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value,
        })
        setEmailErr(false)
        setPasswordErr(false)
    }
    console.log(user)
    

    const logIn = (e) =>{
        e.preventDefault()
        const eRegex= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const pwdRegex=/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
        if (user.email === "" || !eRegex.test(user.email)) {
            setEmailErr(true)
            
        }
        else if (user.password === "" || !pwdRegex.test(user.password)) {
            setPasswordErr(true)
           
        }
        else
        {
            axios.post('http://localhost:8081/login',user,{ validateStatus: false }).then((res)=>{
            //alert(res.data.message)
            if (res.data.statusCode === 200) {
                toast.success(res.data.message)
               
                const record = localStorage.setItem('token', res.data.data.token)
                //getProfile(res.data.data.token)
                navigate('/')

            } else {
                toast.error(res.data.message)
            }       
        }).catch((err) => {
            toast.error(err)
        })
        }
    }

    const responseGoogle = (response) => {
        console.log("Here is Gooogle response data:" + response)
        
    }
    const responseFacebook = (response) => {
        console.log("Log in result here:" + response)
        
    }
    const componentClicked = (data) => {
        console.log("here is data:" + data)
    }

    const register = () =>{
        navigate('register')
    }
    
    return (
        <>
        <Header />
        <div className="container">
            <Toaster />
        <div className="row" style={{ marginTop: "40px", marginBottom: "40px" }}>
            <div className="col-sm-6" >
            <GoogleLogin
                        clientId="746719393732-rik1sbu6rj51e9tckrtlmgt98aee0sql.apps.googleusercontent.com"
                        buttonText="Log In from google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    /><br /><br />
                 <FacebookLogin
                        appId="306637161386401"
                        autoLoad={true}
                        fields="name,email,picture"
                        onClick={componentClicked}
                        callback={responseFacebook}
                        style={{marginLeft:"20px"}} 
                        /><br />
            
            </div>
            <div className="col-sm-6" style={{ borderLeft: "solid " }}>
                <h4 className="App">Login to NeoStore</h4>
                <Form style={{marginLeft:"20px"}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChange} />
                        {emailErr ?<Form.Text className="text-muted ">
                               <p className="text-danger"> Enter Proper Email</p>
                        </Form.Text> : false}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange}/>
                        {passwordErr ?<Form.Text className="text-muted ">
                               <p className="text-danger"> Enter Proper Password </p>
                        </Form.Text> : false}
                    </Form.Group>
                    <Button variant="primary" type="button" href="/product" onClick={logIn}>
                        LogIn
                    </Button>
                </Form>
            </div>
        </div>
        <div className="row" style={{marginBottom:"80px"}}>
            <div className="col-sm-6" style={{textAlign:"right"}}>
                <span ><a href="/register">Register Here</a></span>
            </div>
            <div className="col-sm-6" style={{textAlign:"left",borderLeft:"solid thin"}} >
                <span><a href="/recoverpassword">Forgot PassWord..!!</a></span>
            </div>
        </div>
        </div>
        <Footer />
        </>
    )
}
