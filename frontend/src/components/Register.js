import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useState } from 'react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import Header from './Header'
import Footer from './Footer'
import { useNavigate,Outlet } from 'react-router-dom'

export default function Register() {
    const navigate = useNavigate()

    const [user, SetUser] = useState({
        fname: "",
        email: "",
        lname: "",
        password: "",
        confPass: "",
        mobile: "",
        gender: ""
    })
    const [ferr, setFerr] = useState(false)
    const [lerr, setLerr] = useState(false)
    const [mobileerr, setMobileerr] = useState(false)
    const [emailerr, setEmailerr] = useState(false)
    const [pwderr, setpwdErr] = useState(false)
    const [cpwderr, setCpwderr] = useState(false)
    const [gendererr, setGenderErr] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        SetUser({
            ...user,
            [name]: value,
        })
        setFerr(false)
        setLerr(false)
        setEmailerr(false)
        setpwdErr(false)
        setCpwderr(false)
        setMobileerr(false)
        setGenderErr(false)
    }
    console.log(user)

    const register = (e) => {
        const fRegex=/^[a-zA-Z]+$/
        const lRegex=/^[a-zA-Z]+$/
        const eRegex= /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
        const pwdRegex=/^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/
        const mobRegex=/[6789][0-9]{9}/

        e.preventDefault()
        if (user.fname === "" || !fRegex.test(user.fname)) {
            setFerr(true)
        }
        else if (user.lname === "" || !lRegex.test(user.lname)) {
            setLerr(true)
            
        }
        else if (user.email === "" || !eRegex.test(user.email)) {
            setEmailerr(true)
            
        }
        else if (user.password === "" || !pwdRegex.test(user.password)) {
            setpwdErr(true)
           
        }
        else if (user.confPass === "" || user.password !== user.confPass) {
            setCpwderr(true)
        }
        else if (user.mobile === "" || !mobRegex.test(user.mobile) ) {
            setMobileerr(true)
        }
        else if (user.gender === "") {
            setGenderErr(true)
        }
        else{
        const { fname, lname, email, password, confPass, mobile, gender } = user
        if (fname && lname && email && password && confPass && (password === confPass) && mobile && gender) {
            return axios.post('http://localhost:8081/register', user, { validateStatus: false }).then((res) => {

                if (res.data.statusCode === 201) {
                    toast.success(res.data.message)
                    navigate('/login')

                } else {
                    toast.error(res.data.message)
                }

            }).catch((err) => {
                toast.error(err)
            })
        }
        else {
            toast.error('invalid input, please try again')
        }
    }
}

const responseGoogle = (response) => {
    console.log("Here is Gooogle response data:" + response)
    //navigate('/budget')
}

const responseFacebook = (response) => {
    console.log("Log in result here:" + response)
    //navigate('/budget')
}
const componentClicked = (data) => {
    console.log("here is data:" + data)
}


    return (
        <>
        <Header />
        <div>
            <Toaster />
            <div className="container App" style={{ marginTop: "20px" }}>
            <GoogleLogin
                        clientId="746719393732-rik1sbu6rj51e9tckrtlmgt98aee0sql.apps.googleusercontent.com"
                        buttonText="Log In from google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                    <br />
                    <br />
            <FacebookLogin
                        appId="306637161386401"
                        autoLoad={true}
                        fields="name,email,picture"
                        onClick={componentClicked}
                        callback={responseFacebook}
                        style={{marginLeft:"20px"}} 
                        />
                <hr />
            </div>
            <div className="container" style={{ border: "solid thin grey", marginTop: "20px", marginBottom: "40px", paddingBottom: "20px", paddingTop: "20px", borderRadius: "4px", boxShadow: " 5px 10px 8px #888888" }}>
                <Form method="post" autocomplete="off">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter First Name" name="fname" value={user.fname}  onChange={handleChange} />
                    { ferr ? <Form.Text className="text-muted" >
                            <p style={{color:"red"}}>Enter valid first Name</p>
                        </Form.Text>:false}    
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" name="lname" value={user.lname} onChange={handleChange} />
                        { lerr ? <Form.Text className="text-muted" >
                            <p style={{color:"red"}}>Enter valid last Name</p>
                        </Form.Text>:false}    
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={handleChange} />
                        { emailerr ? <Form.Text className="text-muted" >
                            <p style={{color:"red"}}>Enter Proper Email format @ and .</p>
                        </Form.Text>:false}
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="password" value={user.password} onChange={handleChange} />
                        { pwderr ? <Form.Text className="text-muted" >
                            <p style={{color:"red"}}>Enter Proper Format of Password (8 characters -Atleast One Alphabet,Atleast one special symbol,and digits) .</p>
                        </Form.Text>:false}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" name="confPass" value={user.confPass} onChange={handleChange} />
                        { cpwderr ? <Form.Text className="text-muted" >
                            <p style={{color:"red"}}> Confirm Password should be matched to the Password .</p>
                        </Form.Text>:false}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Mobile No:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Mobile No.." name="mobile" value={user.mobile} onChange={handleChange} />
                        { mobileerr ? <Form.Text className="text-muted" >
                            <p style={{color:"red"}}> Enter 10 digit mobile Number.</p>
                        </Form.Text>:false}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Gender:</Form.Label>
                        <Form.Check
                            type="radio"
                            inline
                            label="Male"
                            name="gender"
                            value="Male"
                            onChange={handleChange}
                        // type={type}
                        // id={`inline-${type}-1`}
                        />
                        <Form.Check
                            type="radio"
                            inline
                            label="Female"
                            name="gender"
                            value="Female"
                            onChange={handleChange}
                        // type={type}
                        // id={`inline-${type}-2`}
                        />
                        { gendererr ? <Form.Text className="text-muted" >
                            <p style={{color:"red"}}> Select Gender.</p>
                        </Form.Text>:false}

                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={register}>
                        Register
                    </Button>
                </Form>

            </div>
        </div>
        <Footer />
        </>
    )
}
