import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <header>
        <h4 className='title'>Martial Arts Classes at Mile High Karate</h4>
        <img src="/src/assets/img/FB-Logo.png" alt="FB-Logo" className='fb-logo'/>
      </header>
        <nav>
          <img src="/src/assets/img/logo.png" alt="Mile High Karate Logo" className='mhk-logo'/>
          <ul>
            <li><a href="">Home</a></li>
            <li><a href="">About</a></li>
            <li><a href="">Classes</a></li>
            <li><a href="">Contact</a></li>
          </ul>
        </nav>
      
    </>
  )
}

export default App
