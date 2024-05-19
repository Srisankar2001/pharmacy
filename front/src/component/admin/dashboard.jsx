import React, { useEffect, useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/admin_dashboard.css"
import AdminNavbar from "./adminNavbar";
function AdminDashboard(){
    Axios.defaults.withCredentials = true
    const navigate = useNavigate()
   const [state,setState] = useState({
    id:"",
    firstname:"",
    lastname:"",
    email:"",
   })

   useEffect(()=>{

    const isAdmin = async()=>{
        try{
            const response = await Axios.get("http://localhost:3001/auth/isAdmin")
            if(!response.data.status){
                navigate("/")
            }else{
                getId()
            }
        }catch(error){
            console.log(error)
            navigate("/")
        }
    }

    const getId = async()=>{
        try{
            const response = await Axios.get("http://localhost:3001/auth/details")
            if(!response.data.status){
                navigate("/")
            }else{
                setState(prev=>({
                    ...prev,
                    id:response.data.data.id
                }))
            }
        }catch(error){
            console.log(error)
        }
    }

    const getDetails = async()=>{
            try{
                const response = await Axios.post("http://localhost:3001/admin/details",{id:state.id})
                if(!response.data.status){
                    navigate("/")
                }else{
                    setState(prev=>({
                        ...prev,
                        firstname:response.data.data.firstname,
                        lastname:response.data.data.lastname,
                        email:response.data.data.email
                    }))
                }
            }catch(error){
                console.log(error)
            }
    }
    isAdmin()
    if(state.id){
        getDetails()
    }
   },[state.id,navigate])
    return(
        <div className="admin_dashboard_wrapper">
            <div className="admin_dashboard_navbar">
                <AdminNavbar/>
            </div>
            <div className="admin_dashboard_container">
            <h1 className="admin_dashboard_heading">Dashboard</h1>
            <div className="admin_dashboard_itemdiv">
            {state.id && <span className="admin_dashboard_item">Id : {state.id}</span>}
            {state.firstname && <span className="admin_dashboard_item">First Name : {state.firstname}</span>}
            {state.lastname && <span className="admin_dashboard_item">Last Name : {state.lastname}</span>}
            {state.email && <span className="admin_dashboard_item">Email : {state.email}</span>}
            </div>
            </div>
        </div>
    )
}

export default AdminDashboard