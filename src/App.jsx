import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Vehicles from './pages/Vehicles'
import Reports from './pages/Reports'
import Insurance from './pages/Insurance'
import Home from './pages/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {

  return (
<QueryClientProvider client={queryClient}>
<Routes>
<Route path='/' element={<Dashboard/>}>
    <Route index path='/' element={<Home/>} />
    <Route path='/vehicles' element={<Vehicles/>} />
    <Route path='/reports' element={<Reports/>} />
    <Route path='/insurance' element={<Insurance/>} />
</Route>
</Routes>
</QueryClientProvider>
  )
}

export default App