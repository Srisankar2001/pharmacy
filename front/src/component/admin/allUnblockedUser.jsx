import React, { useEffect, useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/admin_allUnblockUser.css"
import AdminNavbar from "./adminNavbar";
function AllUnblockUser(){
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
   },[navigate,state.id])


   const [data,setData] = useState([])


useEffect(()=>{
    const getUser = async() => {
        try{
            const response = await Axios.get("http://localhost:3001/user/get_unblock")
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
            <h3 className="admin_allUnblockUser_msg">No unblocked user to display</h3>
        )
    }

    return(
        <ul className="admin_allUnblockUser_list">
        {
             data.map(item=>(
                <div className="admin_allUnblockUser_item_div" key={item.id}>
                   <div className="admin_allUnblockUser_item_data_div">
                        <span className="admin_allUnblockUser_item_data_div">{item.id}</span>
                        <span className="admin_allUnblockUser_item_data_div">{item.firstname}</span>
                        <span className="admin_allUnblockUser_item_data_div">{new Date(item.dob).toISOString().slice(0,10)}</span>
                        <span className="admin_allUnblockUser_item_data_div">{item.email}</span>
                   </div>
                    <div className="admin_allUnblockUser_item_button">
                        <input type="button" value="Block" className="admin_allUnblockUser_item_button_block" onClick={() =>handleUnblock(item.id)}/>
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
            const response = await Axios.post("http://localhost:3001/user/block",{id:id},config)
            if(response.data.status){
                alert(response.data.message)
            }else{
                alert(response.data.message)
            }
        }catch(error){
            alert("Error in blocking User")
        }
    }
    unblock()
}


return(
    <div className="admin_allUnblockUser_wrapper">
        <div className="admin_allUnblockUser_navbar">
            <AdminNavbar/>
        </div>
        <div className="admin_allUnblockUser_container">
            <h1 className="admin_allUnblockUser_heading">All Unblocked User Page</h1>
            {renderUser()}
        </div>
    </div>
)
}

export default AllUnblockUser