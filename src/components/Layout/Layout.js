import React from 'react'
import NavLinks from '../Navbar/NavBar'
import Footer from '../Footer'

const Layout = ({children}) => {
  return (
    <>
      <NavLinks/>
      {children}
      <Footer/>
    </>
  )
}

export default Layout
