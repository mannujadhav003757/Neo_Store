import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Greeting() {
    return (
        <>
        <Header />
        <div className="container" style={{height:"250px",width:"80%"}}>
            <h2 className='App ' style={{marginTop:"200px"}}>Order placed Successfully....!!  <a href="/product"> Go to Re-order</a></h2>
        </div>
         <Footer />   
        </>
    )
}
