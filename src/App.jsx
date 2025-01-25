import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'

const App = () => {
  return (
<Routes>
<Route path='/' element={<Dashboard/>}>
    {/* <Route index path='/' element={<Dashboard/>} /> */}
    <Route path='/about' element={<div>About</div>} />
</Route>

<Route path='/contact' element={<div>Contact</div>} />
<Route path='/services' element={<div>Services</div>} />
<Route path='/products' element={<div>Products</div>} />
<Route path='/blog' element={<div>Blog</div>} />
<Route path='/contact' element={<div>Contact</div>} />

</Routes>
  )
}

export default App