import  Layout  from './Components/Layout'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
    </Routes>
    </>
  )
}

export default App