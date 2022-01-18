import React from 'react'
import {Form,Button} from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import Header from './Header';
import Footer from './Footer';

export default function RecoverPassword() {
    const [email,setEmail] = useState('')
    const [otp,setOtp] = useState('')
    const[showEmail,setShowEmail] = useState(true)
    const[showVerify,setShowVerify] = useState(false)
    const[showPass,setShowPass] = useState(false)
    console.log(email)
    console.log(otp)

    const sendOtp = () =>{
        const user = { email : email}
        axios.post('http://localhost:8081/sendOtp',user,{ validateStatus: false }).then((res)=>{
            //alert(res.data.message)
            if (res.data.statusCode === 200) {
                toast.success(res.data.message)
                localStorage.setItem('otp', res.data.data.otp)

            } else {
                toast.error(res.data.message)
            }       
        }).catch((err) => {
            toast.error(err)
        })
        
        setShowEmail(false)
        setShowVerify(true)
        setShowPass(false)
    }

    const setPass = () =>{
        if(otp) {
            if(localStorage.getItem('otp') && otp === localStorage.getItem('otp'))  {
                toast.success('OTP verified successfully, please set new password')
                setShowEmail(false)
                setShowVerify(false)
                setShowPass(true)
        
            } else {
                toast.error('Invalid OTP, please enter correct OTP')
            }
        }
    }

    //Password and Confirm Password Reset
    const [password, setPassword] = useState({
        email:email,
        resPass: "",
        confPass: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setPassword({
            ...password,
            email:email,
            [name]: value,
        })
    }
    console.log(password)
    
    const updatePassword = () =>{
        let input = {
            email:password.email,
            password:password.resPass
        }
        axios.put('http://localhost:8081/updatepassword',input,{ validateStatus: false }).then((res)=>{
            //alert(res.data.message)
            if (res.data.statusCode === 200) {
                toast.success(res.data.message)
                localStorage.setItem('otp',res.data.data)

            } else {
                toast.error(res.data.message)
            }       
        }).catch((err) => {
            toast.error(err)
        })
        }
    


    return (
        <>
        <Header />
        <div className="container" style={{
        border:"solid thin",
        marginTop:"40px",
        marginBottom:"40px",
        paddingBottom:"20px",
        paddingTop:"20px",
        borderRadius:"4px",
        boxShadow: " 5px 10px 8px #888888"
        }}>
            <Toaster />
            <h4 className="App" >Recover Password</h4>
            <hr />
            <p className="App text-danger"><i class="fa fa-exclamation-circle"></i> Verification code has been sent to you're registered mail Id</p>
            {showEmail ?<Form style={{paddingTop:"20px"}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Id:</Form.Label>
                        <Form.Control type="text" placeholder="Email" name="email" value={email} onChange={(e) =>{setEmail(e.target.value)}}  />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="button" style={{marginLeft:"45%"}} onClick={sendOtp}>
                        Send OTP
                    </Button>
            </Form> : false}

           {showVerify ? <Form style={{paddingTop:"20px"}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Id:</Form.Label>
                        <Form.Control type="text" placeholder="Verification Code.." value={email} />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Verification Code:</Form.Label>
                        <Form.Control type="text" placeholder="Verification Code" name="otp" value={otp} onChange={(e) =>{setOtp(e.target.value)}} />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="button" style={{marginLeft:"45%"}} onClick={setPass}>
                        Verify OTP
                    </Button>
            </Form> :false} 
            {showPass ? <Form style={{paddingTop:"20px"}}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email Id:</Form.Label>
                        <Form.Control type="text" placeholder="Verification Code" value={email} />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>New Password:</Form.Label>
                        <Form.Control type="text" placeholder="New Password" name="resPass" value={password.resPass} onChange={handleChange}  />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Confirm Password:</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" name="confPass" value={password.confPass} onChange={handleChange} />
                        <Form.Text className="text-muted">
                        
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="button" style={{marginLeft:"45%"}} onClick={updatePassword}>
                        Submit
                    </Button>
            </Form> :false}
            
        </div>
        <Footer />
        </>
    )
}
