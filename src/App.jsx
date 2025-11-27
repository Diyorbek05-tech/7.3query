import React from 'react'
import Homepage from './pages/HomePage.jsx'
import Layout from './Components/Layout.jsx'
import { Route, Routes } from 'react-router-dom'
const App = () => {
  return (
    <div>
       <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
