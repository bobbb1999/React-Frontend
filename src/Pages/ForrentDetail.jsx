import React from 'react'
import Forrent_Detail from '../Components/Forrent_Detail'
import Navbar_Login from '../Components/Navbar_Login'
import ProductAll from '../Components/ProductAll'
import { Footer } from 'flowbite-react'
function ForrentDetail() {
  return (
    <>
    <Navbar_Login />
    <Forrent_Detail />
    <ProductAll />
    <Footer />
    </>
  )
}

export default ForrentDetail