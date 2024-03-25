import React from 'react'
import Admin_AllUser from '../Components/Admin_AllUser'
import Navbar_Login from '../Components/Navbar_Login'
import Footer from '../Components/Footer'

function Admin_AllUsers() {
  return (
    <div>
        <Navbar_Login />
      <Admin_AllUser />
      <Footer />
    </div>
  )
}

export default Admin_AllUsers
