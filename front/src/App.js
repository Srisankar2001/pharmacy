import React from "react";
import {BrowserRouter as Router , Routes , Route } from "react-router-dom"
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



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/" element={<Signin/>}/>

        {/* Admin */}
        <Route path="/dashboard" element={<AdminDashboard/>}/>

        <Route path="/addadmin" element={<AddAdmin/>}/>

        <Route path="/addcategory" element={<AddCategory/>}/>

        <Route path="/addproduct" element={<AddProduct/>}/>
        <Route path="/allproduct" element={<AllProduct/>}/>
        <Route path="/expiredproduct" element={<ExpiredProduct/>}/>
        <Route path="/updateproduct/:id" element={<UpdateProduct/>}/>

        <Route path="/alluser" element={<AllUser/>}/>
        <Route path="/allblockuser" element={<AllBlockUser/>}/>
        <Route path="/allunblockuser" element={<AllUnblockUser/>}/>

        {/* User */}
        <Route path="/home" element={<Home/>}/>
        <Route path="/product" element={<Product/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/logout" element={<Logout/>}/>
      </Routes>
    </Router>
  )
}

export default App;
