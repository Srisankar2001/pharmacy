import React, { useEffect, useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/admin_navbar.css"
function AdminNavbar(){
    Axios.defaults.withCredentials = true
    const navigate = useNavigate()

   useEffect(()=>{

    const isAdmin = async()=>{
        try{
            const response = await Axios.get("http://localhost:3001/auth/isAdmin")
            if(!response.data.status){
                navigate("/signin")
            }
        }catch(error){
            console.log(error)
            navigate("/signin")
        }
    }
    isAdmin()
   },[])
    return(
        <div className="admin_navbar_container">
            <h1 className="admin_dashboard_heading">Menu</h1>
            <ul className="admin_navbar_ul">
                <li className="admin_navbar_li">
                    <a href="/" className="admin_navbar_link">Dashboard</a>
                </li>
                <li className="admin_navbar_li">
                    <a href="/addadmin" className="admin_navbar_link">Add Admin</a>
                </li>
                <li className="admin_navbar_li">
                    <a href="/addcategory" className="admin_navbar_link">Add Category</a>
                </li>
                <li className="admin_navbar_li">
                    <a href="/addproduct" className="admin_navbar_link">Add Product</a>
                </li>
                <li className="admin_navbar_li">
                    <a href="/allproduct" className="admin_navbar_link">All Product</a>
                </li>
                <li className="admin_navbar_li">
                    <a href="/expiredproduct" className="admin_navbar_link">Expired Product</a>
                </li>
                <li className="admin_navbar_li">
                    <a href="/alluser" className="admin_navbar_link">All User</a>
                </li>
                <li className="admin_navbar_li">
                    <a href="/allblockuser" className="admin_navbar_link">All Blocked User</a>
                </li>
                <li className="admin_navbar_li">
                    <a href="/allunblockuser" className="admin_navbar_link">All Unblocked User</a>
                </li>
                <li className="admin_navbar_li">
                    <a href="/logout" className="admin_navbar_link">Logout</a>
                </li>
            </ul>
        </div>
    )
}

export default AdminNavbar