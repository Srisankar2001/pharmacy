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
        <Route path="/updateproduct/:id" element={<UpdateProduct/>}/>
      </Routes>
    </Router>
  )
}

export default App;
