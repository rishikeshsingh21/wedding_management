import React from 'react'
import { Footer, Navbar } from '../components'
import { Outlet } from 'react-router-dom'

const PublicLayout = () => {
  return (
    <>
     <Navbar />
      <Outlet />
     <Footer />
    </>
  )
}

export default PublicLayout