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
import PaymentDetails from './screens/PaymentDetails.jsx'
import LoginEmployee from './screens/LoginEmployee.jsx'
import LoginClient from './screens/LoginClient.jsx'
import LoginAdmin from './screens/LoginAdmin.jsx'
import { AuthProvider as AuthProviderClient } from "./contexts/AuthContextClient.jsx";
import { AuthProvider as AuthProviderEmployee } from "./contexts/AuthContextEmployee.jsx";
import { AuthProvider as AuthProviderAdmin } from "./contexts/AuthContextAdmin.jsx";
import VerifyEmailCode from './screens/VerifyEmailCode.jsx'
import VerifyEmailCodeEmployee from './screens/VerifyEmailCodeEmployee.jsx'
import VerifyEmailClient from './screens/VerifyEmailCodeClient.jsx'
import RecoverNewPasswordClient from './screens/RecoverNewPasswordClient.jsx'
import RecoverPasswordClient from './screens/RecoverPasswordClient.jsx'
import RecoverPasswordPinClient from './screens/RecoverPasswordPinClient.jsx'
import RecoverPasswordEmployee from './screens/RecoverPasswordEmployee.jsx'
import RecoverPasswordPinEmployee from './screens/RecoverPasswordPinEmployee.jsx'
import RecoverNewPasswordEmployee from './screens/RecoverNewPasswordEmployee.jsx'
import RecoverPasswordAdmin from './screens/RecoverPasswordAdmin.jsx'
import RecoverPasswordPinAdmin from './screens/RecoverPasswordPinAdmin.jsx'
import RecoverNewPasswordAdmin from './screens/RecoverNewPasswordAdmin.jsx'
import { Toaster } from "sonner";



function App() {

  return (
    <>
      <Router>
        {/* El AuthProvider envuelve TODO lo que está dentro del Router */}
        <AuthProviderClient>
          <AuthProviderEmployee>
            <AuthProviderAdmin>
              {/*  Un solo bloque de Routes para toda la aplicación */}
              <Routes>
                {/* --- Rutas de Autenticación --- */}
                <Route path="/loginEmployee" element={<LoginEmployee />} />
                <Route path="/loginClient" element={<LoginClient />} />
                <Route path="/loginAdmin" element={<LoginAdmin />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/recoveryPassword" element={<RecoveryPassword />} />
                <Route path="/recoveryPasswordPin" element={<RecoveryPasswordPin />} />
                <Route path="/recoveryNewPassword" element={<RecoveryNewPassword />} />
                <Route path="/admins/verifyEmail" element={<VerifyEmailCode />} />
                <Route path="/employees/verifyEmail" element={<VerifyEmailCodeEmployee />} />
                <Route path="/client/verifyEmail" element={<VerifyEmailClient />} />
                <Route path="/recoveryPasswordClient" element={<RecoverPasswordClient />} />
                <Route path="/recoveryPasswordPinClient" element={<RecoverPasswordPinClient />} />
                <Route path="/recoveryNewPasswordClient" element={<RecoverNewPasswordClient />} />
                <Route path="/recoveryPasswordEmployee" element={<RecoverPasswordEmployee />} />
                <Route path="/recoveryPasswordPinEmployee" element={<RecoverPasswordPinEmployee />} />
                <Route path="/recoveryNewPasswordEmployee" element={<RecoverNewPasswordEmployee />} />
                <Route path="/recoveryPasswordAdmin" element={<RecoverPasswordAdmin />} />
                <Route path="/recoveryPasswordPinAdmin" element={<RecoverPasswordPinAdmin />} /> //A
                <Route path="/recoveryNewPasswordAdmin" element={<RecoverNewPasswordAdmin />} /> //B

                {/* --- Rutas Públicas --- */}
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/shoppingCart" element={<ShoppingCart />} />
                <Route path="/aboutUs" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="/productdetail/:id" element={<ProductDetail />} />
                <Route path="/paymentDetails" element={<PaymentDetails />} />

                {/* --- Rutas Privadas --- */}
                <Route path="/admins" element={<Admins />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/productosprivados" element={<ProductsPrivate />} />
                <Route path="/dashboardPrivate" element={<DashboardPrivate />} />
              </Routes>

              <Toaster
                position="top-right"
                richColors
                theme="dark"
                toastOptions={{
                  style: {
                    background: "#0D253C", // Tu Azul Oscuro de Cozcatlán como fondo de la tarjeta
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "#FFFFFF",
                  },
                  // Inyectamos dinámicamente las variables de color de éxito y error
                  success: {
                    style: {
                      background: "#0D253C",
                      border: "1px solid #6FC44C", // Borde Verde Cozca
                      color: "#6FC44C",            // Texto Verde Cozca
                    }
                  },
                  error: {
                    style: {
                      background: "#0D253C",
                      border: "1px solid #E47528", // Borde Anaranjado Cozca
                      color: "#E47528",            // Texto Anaranjado Cozca
                    }
                  }
                }}
              />

            </AuthProviderAdmin>
          </AuthProviderEmployee>
        </AuthProviderClient>
      </Router>

    </>
  )
}

export default App
