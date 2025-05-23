import React from 'react';
import NavBar from './components/NavBar';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/home/home';
import About from './pages/about/about';
import Contact from './pages/contact/contact';
import Login from './pages/Login/logIn';
import Classes from './pages/classes/classes';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
