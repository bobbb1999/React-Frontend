import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter,  RouterProvider  } from "react-router-dom";
import Home from './Pages/Home.jsx';
import Login from './Pages/Login';
import Register from './Pages/Register'
import RegisterUser from './Pages/RegisterUser';
import RegisterPhoto from './Pages/RegisterPhoto'
import RegisterforRent from './Pages/RegisterforRent'
import Term from './Pages/Term';
import ForgotPW from './Pages/ForgotPW';
import ResetPW from './Pages/ResetPW';
import Account from './Pages/Account';
import { AuthProvider } from './Components/AuthProvider';
import { RequireAuth , AllowRole  } from './Components/RequireAuth';
import HomeisLogin from './Pages/HomeisLogin';
import Photographer from './Pages/Photographer';
import Forrent from './Pages/Forrent';
import Accounts from './Pages/Accounts';
import Profile from './Pages/Profile';
import Userlist from './Pages/Userlist';
import PhotographerDetail from './Pages/PhotographerDetail.jsx';
import FormWorking from './Pages/FormWorking.jsx';
import FormVerifyPhoto from './Pages/FormVerifyPhoto.jsx';
import FormVerifyRent from './Pages/FormVerifyRent.jsx';
import AddProduct from './Pages/AddProduct.jsx';
import Product from './Pages/Product.jsx';
import ProfileRental from './Pages/ProfileRental.jsx';
import ForrentDetial from './Pages/ForrentDetail.jsx'
import ProductDetail from './Pages/ProductDetail.jsx';
import Admin_Verify_Photo from './Pages/Admin_Verify_Photo.jsx';
import Admin_Verify_Rent from './Pages/Admin_Verify_Rent.jsx';
import ProfilePhotographer from './Pages/ProfilePhotographer.jsx';
import ProfileEditPhotographer from './Pages/ProfileEditPhotographer.jsx';
import ProfileEditRent from './Pages/ProfileEditRent.jsx';
import Admin_AllUsers from './Pages/Admin_AllUsers.jsx';
import Job_Hiring from './Pages/Job_Hiring.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "Login",
    element: <Login />
  },
  {
    path: "Register",
    element: <Register />
  },
  {
    path: "Term_of_service",
    element: <Term />
  },
  {
    path: "RegisterForUser",
    element: <RegisterUser />
  },
  {
    path: "RegisterForPhoto",
    element: <RegisterPhoto />
  },
  {
    path: "RegisterForRent",
    element: <RegisterforRent />
  },
  {
    path: "/ResetPassword",
    element: <ResetPW />
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPW />
  },
  {
    path: "/Homepage",
    element: (
      <RequireAuth>
        <HomeisLogin />
      </RequireAuth>
    ),
  },
  {
    path: "/Account",
    element: (
      <RequireAuth>
        <AllowRole allowedRoles={['admin', 'user']}>
          <Account />
        </AllowRole>
      </RequireAuth>
    ),
  },
  {
    path: "/Admin/VerifyPhotographer",
    element: (
      <RequireAuth>
        <AllowRole allowedRoles={['admin']}>
          <Admin_Verify_Photo />
        </AllowRole>
      </RequireAuth>

    ),
  },
  {
    path: "/Admin/VerifyEquipmentRental",
    element: (
      <RequireAuth>
        <AllowRole allowedRoles={['admin']}>
          <Admin_Verify_Rent />
        </AllowRole>
      </RequireAuth>
    ),
  },
  {
    path: "/Admin/AllUsers",
    element: (
      <RequireAuth>
        <AllowRole allowedRoles={['admin']}>
          <Admin_AllUsers />
        </AllowRole>
      </RequireAuth>
    ),
  },
  {
    path: "/Photograhper",
    element: (
      <RequireAuth>
        <Photographer />
      </RequireAuth>
    ),
  },
  {
    path: "/Forrent",
    element: (
      <RequireAuth>
        <Forrent />
      </RequireAuth>
    ),
  },
  {
    path: "/Accounts",
    element: <Accounts />
  },
  {
    path: "/Profile",
    element: <Profile />
  },
  {
    path: "/Userlist",
    element: <Userlist />
  },
  {
    path: "/Photograhpers/:id",
    element: <PhotographerDetail />
  },
  {
    path: "/EquipmentRental/:id",
    element: <ForrentDetial />
  },
  {
    path: "/UploadWorkings",
    element: <FormWorking />
  },
  {
    path: "/VerifyPhotograhper",
    element: <FormVerifyPhoto />
  },
  {
    path: "/VerifyEquipmentRental",
    element: <FormVerifyRent />
  },
  {
    path: "/AddProduct",
    element: <AddProduct />
  },
  {
    path: "/Product",
    element: <Product />
  },
  {
    path: "/Profilerent",
    element: <ProfileRental />
  },
  {
    path: "/ProductDetail/:id",
    element: <ProductDetail />
  },
  {
    path: "/ProfilePhotograhper",
    element: <ProfilePhotographer />
  },
  {
    path: "/EditProfilePhotographer",
    element: <ProfileEditPhotographer />
  },
  {
    path: "/EditProfileRent",
    element: <ProfileEditRent />
  },
  {
    path: "/JobHiring",
    element: <Job_Hiring />
  },
  
  
])



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
