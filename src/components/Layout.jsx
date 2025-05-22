import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNavigationBar from './TopNavigationBar'

const Layout = () => {
  return (
    <div>
        <TopNavigationBar/>
        <Outlet/>
    </div>
  )
}

export default Layout