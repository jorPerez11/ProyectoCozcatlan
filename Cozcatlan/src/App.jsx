import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'

import SignUp from './screens/SignUp.jsx'
import Login from './screens/Login.jsx'
import Products from './screens/Products.jsx'
import ShoppingCart from './screens/ShoppingCart.jsx'
import AboutUs from './screens/AboutUs.jsx'
import Home from './screens/Home.jsx'
import Contact from './screens/Contact.jsx'
import { TermsAndConditionsPage } from './screens/TermsAndConditions.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/products" element={<Products/>} />
          <Route path="/shoppingCart" element={<ShoppingCart/>} />
          <Route path="/aboutUs" element={<AboutUs/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
        </Routes>
      </Router>  

    </>
  )
}

export default App
