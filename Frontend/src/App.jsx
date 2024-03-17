import React from 'react'
import Home from './pages/home/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Nopage from './pages/nopage/Nopage';
import MyState from './context/data/MyState';
import Login from './pages/registration/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {
  const token = localStorage.getItem('token');

  return (
    <MyState>
      <Router>
        <Routes>
          <Route exact path='/' element={token ? <Home /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<Nopage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </MyState>

  )
}

export default App