import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col items-center py-12 bg-gray-50">
        <div className="w-full max-w-md">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}