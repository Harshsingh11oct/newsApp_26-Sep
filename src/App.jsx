import React from 'react'
import Navbar from './Component/Navbar'
import Footer from './Component/Footer'
import HomePage from './Pages/HomePage'
import { Routes, Route } from 'react-router-dom'    
import { BrowserRouter } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
