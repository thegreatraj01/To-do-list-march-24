import React from 'react'
import Home from './pages/home/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nopage from './pages/nopage/Nopage';
import MyState from './context/data/MyState';
import Login from './pages/registration/Login'
import Updateproduct from './pages/home/Updateproduct';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  return (
    <MyState>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/updatetask/:id' element={<Updateproduct />} />
          <Route path='/*' element={<Nopage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </MyState>

  )
}

export default App