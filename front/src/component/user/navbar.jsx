import React, { useEffect, useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/user_navbar.css"

function UserNavbar(){
    Axios.defaults.withCredentials = true
    const navigate = useNavigate()
    const[isUser,setIsUser] = useState(false)
   useEffect(()=>{

    const isUser = async()=>{
        try{
            const response = await Axios.get("http://localhost:3001/auth/isUser")
            if(response.data.status){
                setIsUser(true)
            }
        }catch(error){
            console.log(error)
        }
    }
    isUser()
   },[])
    return(
        <div className="user_navbar_container">
            <h1 className="user_dashboard_heading">Menu</h1>
            <ul className="user_navbar_ul">
                <li className="user_navbar_li">
                    <a href="/home" className="user_navbar_link">Home</a>
                </li>
                <li className="user_navbar_li">
                    <a href="/product" className="user_navbar_link">Product</a>
                </li>
                {isUser ? 
                <li className="user_navbar_li">
                    <a href="/cart" className="user_navbar_link">Cart</a>
                </li> : null}
            </ul>
        </div>
    )
}

export default UserNavbar