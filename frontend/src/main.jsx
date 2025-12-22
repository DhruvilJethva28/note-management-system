import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Register from './register'
import Login from './login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Register/>}></Route>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/dashboard"element={<Dashboard/>}></Route>
  </Routes>
  
  </BrowserRouter>
  
)
