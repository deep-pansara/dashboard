import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Vehicles from './pages/Vehicles'
import Reports from './pages/Reports'
import Documents from './pages/Documents'
import Insurance from './pages/Insurance'
import Home from './pages/Home'

const App = () => {
  return (
<Routes>
<Route path='/' element={<Dashboard/>}>
    <Route index path='/' element={<Home/>} />
    <Route path='/vehicles' element={<Vehicles/>} />
    <Route path='/reports' element={<Reports/>} />
    <Route path='/documents' element={<Documents/>} />
    <Route path='/insurance' element={<Insurance/>} />
</Route>



</Routes>
  )
}

export default App