import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router'

import SignUp from './assets/screens/SignUp'
import Login from './assets/screens/Login'
import Products from './assets/screens/Products'
import ShoppingCart from './assets/screens/ShoppingCart'
import AboutUs from './assets/screens/AboutUs'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signUp" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/login" element={<Products/>} />
          <Route path="/login" element={<ShoppingCart/>} />
          <Route path="/login" element={<AboutUs/>} />
        </Routes>
      </Router>  

    </>
  )
}

export default App
