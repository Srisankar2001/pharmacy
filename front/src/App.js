import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Axios from "axios";

import Register from "./component/register";
import Signin from "./component/signin";
import AdminDashboard from "./component/admin/dashboard";
import AddAdmin from "./component/admin/addAdmin";
import AddCategory from "./component/admin/addCategory";
import AddProduct from "./component/admin/addProduct";
import AllProduct from "./component/admin/allProduct";
import UpdateProduct from "./component/admin/updateProduct";
import ExpiredProduct from "./component/admin/expiredProduct";
import AllUser from "./component/admin/allUser";
import AllBlockUser from "./component/admin/allBlockedUser";
import AllUnblockUser from "./component/admin/allUnblockedUser";
import Logout from "./component/logout";
import Home from "./component/user/home";
import Product from "./component/user/product";
import Cart from "./component/user/cart";
import Order from "./component/user/order";



function App() {
  Axios.defaults.withCredentials = true;
  const [isUser, setIsUser] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    const isUser = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/auth/isUser");
        if (response.data.status) {
          setIsUser(true)
        }
      } catch (error) {
        //Todo
      }
    }
    const isAdmin = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/auth/isAdmin")
        if (response.data.status) {
          setIsAdmin(true)
        }
      } catch (error) {
        //Todo
      }
    }
    isUser()
    isAdmin()
  })
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />

        {/* Admin */}
        {isAdmin && <Route path="/" element={<AdminDashboard />} />}
        {isAdmin && <Route path="/addadmin" element={<AddAdmin />} />}
        {isAdmin && <Route path="/addcategory" element={<AddCategory />} />}
        {isAdmin && <Route path="/addproduct" element={<AddProduct />} />}
        {isAdmin && <Route path="/allproduct" element={<AllProduct />} />}
        {isAdmin && <Route path="/expiredproduct" element={<ExpiredProduct />} />}
        {isAdmin && <Route path="/updateproduct/:id" element={<UpdateProduct />} />}
        {isAdmin && <Route path="/alluser" element={<AllUser />} />}
        {isAdmin && <Route path="/allblockuser" element={<AllBlockUser />} />}
        {isAdmin && <Route path="/allunblockuser" element={<AllUnblockUser />} />}

        {/* User */}
        {!isAdmin &&<Route path="/" element={<Home />} />}
        {!isAdmin &&<Route path="/product" element={<Product />} />}
        {isUser &&<Route path="/cart" element={<Cart />} />}
        {isUser && <Route path="/order" element={<Order />} />}

        {(isUser || isAdmin ) && <Route path="/logout" element={<Logout />} />}
        <Route path="*" element={isAdmin ? <AdminDashboard /> : <Home />} />
      </Routes>
    </Router>
  )
}

export default App;
