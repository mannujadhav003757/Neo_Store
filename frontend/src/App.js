import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
//import { createContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LogIn from './components/LogIn';
import Register from './components/Register';
import RecoverPassword from './components/RecoverPassword';
import ProductDetail from './components/ProductDetail';
import Profile from './components/Profile'
import Dashboard from './components/Dashboard'
import NewAddress from './components/NewAddress';
import Product from './components/Product';
import Cart from './components/Cart';
import Greeting from './components/Greeting'

function App() {

  return (
    <>
    
    <Router>
        <Routes>
          {/* <Route path="/"exact element={<App />} /> */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/login"exact element={<LogIn />} />
                {/* <Route path="/recoverpasswrod"exact element={<RecoverPassword />} /> */}
                 <Route path="/register"exact element={<Register />} />
                 <Route path="/recoverpassword"exact element={<RecoverPassword />} />
                 <Route path="/profile"exact element={<Profile />} />
                 <Route path="/newAddress"exact element={<NewAddress />} />
                 <Route path="/product"exact element={<Product />} />
                 <Route path="/cart"exact element={<Cart />} />
                 <Route path="/productDetail"exact element={<ProductDetail />} />
                 <Route path="/greeting"exact element={<Greeting />} />     
           {/* </Route>  */}
          {/* </Route> */}
        </Routes>   
      </Router> 
    
    
     {/* <Header />  */}
      {/* <LogIn />  */}
       {/* <Register /> */}
      {/* <RecoverPassword />  */}
      {/* <ProductDetail />  */}
     
    </>
  );
}

export default App;
