import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import UpperNav from '../uppernav/UpperNav'

const Layout = ({children}:any) => {
  return (
    <>
    <UpperNav/>
      <Header/>
      {children}
      <Footer/>
    </>
  )
}

export default Layout
