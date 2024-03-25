import React from 'react'
import Photographer_Detail from '../Components/Photographer_Detail'
import Navbar_Login from '../Components/Navbar_Login'
// import Reviews_Photographer from '../Components/Reviews_Photographer'
import Footer from '../Components/Footer'
// import ShowAlbumPhoto from '../Components/ShowAlbumPhoto'

function PhotographerDetail() {
  return (
    <>
    <Navbar_Login />
    <Photographer_Detail />
    {/* <Reviews_Photographer /> */}
    {/* <ShowAlbumPhoto /> */}
    <Footer />
    </>
  )
}

export default PhotographerDetail