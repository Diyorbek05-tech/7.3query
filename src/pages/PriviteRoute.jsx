import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
const PriviteRoute = () => {
    const {isAuth,user} =useSelector(state => state.auth)
    if (!isAuth && !user) {
        return<Navigate to="/" />
    }
  return <Outlet/>
}

export default PriviteRoute
