import React from 'react'
import { InputGroup,FormControl,Button } from 'react-bootstrap'

export default function Footer() {
    return (
            //  <div className="container-fluid"> 
              <footer className="bg-dark container-fluid" style={{color:"white"}}>
                  <div className="row">
                  <div className="col-sm-4" style={{color:"white"}}>
                      <h5 className="App">About Company</h5>
                      <p className="App">NeoSOFT Technologies is here at your quick and easy service for shooping .</p>
                      <h6 className="App">Contact Information</h6>
                      <p className="App">Email: contact@neosoftmail.com</p>
                      <p className="App">Phone no: 02312-432-456</p>
                      <p className="App">Mumbai, Maharashtra, India.</p>
                  </div>
                  <div className="col-sm-4" style={{color:"white"}}>
                      <h5 className="App">Information</h5>
                      <p className="App">Terms and Conditions</p>
                      <p className="App">Gurantee and Return Policy</p>
                      <p className="App">Contact Us</p>
                      <p className="App">Privacy Policy</p>
                      <p className="App">Locate Us</p>
                  </div>
                  <div className="col-sm-4" style={{color:"white"}}>
                      <h5 className="App">News Letter</h5>
                      <p className="App">Sign up to get exclusive offers from our favorite brands and to be well up in the news.</p>
                      <p className="App"><InputGroup>
                            <FormControl
                                placeholder="Your Email..."
                                aria-label="Your Email..."
                                aria-describedby="basic-addon1"
                                style={{width:"50px"}}
                            />
                        </InputGroup></p>
                        <p className="App">
                        <Button variant="secondary" style={{ marginLeft: "40px" }}>Subscribe</Button>
                        </p>
                  </div>
                  </div>
                  <p className="App">Copyright © 2017 NeoSOFT Technologies All rights reserved | Design by NeoSOFT Technologies</p>
              </footer>
            //   </div>
                                                  
           )
}
