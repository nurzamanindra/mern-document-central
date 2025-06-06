import React from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'
import { ToastContainer, toast } from 'react-toastify';

const App = () => {
  return (
    <BrowserRouter>
      <Header/>
      <ToastContainer
          position="top-center"
          closeOnClick
        />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/projects' element={<Projects/>}/>
        </Route>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App