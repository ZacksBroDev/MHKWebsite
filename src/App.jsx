import React from 'react';
import NavBar from './components/NavBar';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home/home';
import Login from './pages/Login/logIn';
import Signup from './pages/signup/Signup';
import Schedule from './pages/schedule/Schedule';
import NotFound from './pages/notFoundPage/NotFound';
import Contact from './pages/contact/contact';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
