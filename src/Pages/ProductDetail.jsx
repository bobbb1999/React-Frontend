import React from 'react'
import Product_Details from '../Components/Product_Details'
import Navbar_Login from '../Components/Navbar_Login'
import Reveiws_Product from '../Components/Reveiws_Product'
import Footer from '../Components/Footer'

function ProductDetail() {
  return (
    <>
        <Navbar_Login />
      <Product_Details />
      <Reveiws_Product />
      <Footer />
    </>
  )
}


export default ProductDetail
