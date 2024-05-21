import React, { useEffect, useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/admin_allBlockUser.css"
import AdminNavbar from "./adminNavbar";
function AllBlockUser(){
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
                navigate("/signin")
            }else{
                getId()
            }
        }catch(error){
            console.log(error)
            navigate("/signin")
        }
    }

    const getId = async()=>{
        try{
            const response = await Axios.get("http://localhost:3001/auth/details")
            if(!response.data.status){
                navigate("/signin")
            }else{
                setState(prev=>({
                    ...prev,
                    id:response.data.data.id
                }))
            }
        }catch(error){
            console.log(error)
            navigate("/signin")
        }
    }

    const getDetails = async()=>{
            try{
                const response = await Axios.post("http://localhost:3001/admin/details",{id:state.id})
                if(!response.data.status){
                    navigate("/signin")
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
                navigate("/signin")
            }
    }
    isAdmin()
    if(state.id){
        getDetails()
    }
   },[navigate,state.id])


   const [data,setData] = useState([])


useEffect(()=>{
    const getUser = async() => {
        try{
            const response = await Axios.get("http://localhost:3001/user/get_block")
            if(!response.data.status){
                alert("Error fetching User")
            }else{
                setData(response.data.data)
            }
        }catch(error){
            alert("Error fetching User")
        }
    }
    getUser()
},[navigate,data])

const renderUser = () => {
    if(data.length === 0){
        return(
            <h3 className="admin_allBlockUser_msg">No blocked user to display</h3>
        )
    }

    return(
        <ul className="admin_allBlockUser_list">
        {
             data.map(item=>(
                <div className="admin_allBlockUser_item_div" key={item.id}>
                   <div className="admin_allBlockUser_item_data_div">
                        <span className="admin_allBlockUser_item_data_div">{item.id}</span>
                        <span className="admin_allBlockUser_item_data_div">{item.firstname}</span>
                        <span className="admin_allBlockUser_item_data_div">{new Date(item.dob).toISOString().slice(0,10)}</span>
                        <span className="admin_allBlockUser_item_data_div">{item.email}</span>
                   </div>
                    <div className="admin_allBlockUser_item_button">
                        <input type="button" value="UnBlock" className="admin_allBlockUser_item_button_unblock" onClick={() =>handleUnblock(item.id)}/>
                    </div>
                </div>
            ))
        }
        </ul>
    )
    
}


const handleUnblock = (id) => {
    const unblock = async() => {
        try{
            const config = {
                headers: {
                  'content-type': 'application/json',
                },
              };
            const response = await Axios.post("http://localhost:3001/user/unblock",{id:id},config)
            if(response.data.status){
                alert(response.data.message)
            }else{
                alert(response.data.message)
            }
        }catch(error){
            alert("Error in unblocking User")
        }
    }
    unblock()
}


return(
    <div className="admin_allBlockUser_wrapper">
        <div className="admin_allBlockUser_navbar">
            <AdminNavbar/>
        </div>
        <div className="admin_allBlockUser_container">
            <h1 className="admin_allBlockUser_heading">All Blocked User Page</h1>
            {renderUser()}
        </div>
    </div>
)
}

export default AllBlockUser