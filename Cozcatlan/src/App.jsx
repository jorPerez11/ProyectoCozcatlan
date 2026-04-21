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
import ProductDetail from './screens/ProductDetail.jsx';
import Admins from './screens/Admins.jsx'
import Employees from './screens/Employees.jsx'
import Suppliers from './screens/Suppliers.jsx'
import ProductsPrivate from './screens/ProductsPrivate.jsx'
import DashboardPrivate from './screens/Dashboard.jsx'
import RecoveryPassword from './screens/RecoverPassword.jsx'
import RecoveryPasswordPin from './screens/RecoverPasswordPin.jsx'
import RecoveryNewPassword from './screens/RecoverNewPassword.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
          <Route path="/productdetail" element={<ProductDetail />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/productosprivados" element={<ProductsPrivate />} />
          <Route path="/dashboardPrivate" element={<DashboardPrivate />} />
          <Route path="/recoveryPassword" element={<RecoveryPassword />} />
          <Route path="/recoveryPasswordPin" element={<RecoveryPasswordPin />} />
          <Route path="/recoveryNewPassword" element={<RecoveryNewPassword />} />




        </Routes>
      </Router>

    </>
  )
}

export default App
