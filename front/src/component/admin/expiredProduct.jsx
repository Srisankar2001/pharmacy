import React, { useEffect, useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/admin_expiredProduct.css"
import AdminNavbar from "./adminNavbar";
function ExpiredProduct(){
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
            navigate("/")
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
    const getProduct = async() => {
        try{
            const response = await Axios.get("http://localhost:3001/product/get_expired")
            if(!response.data.status){
                alert("Error fetching Product")
            }else{
                setData(response.data.data)
            }
        }catch(error){
            alert("Error fetching Product")
        }
    }
    getProduct()
},[navigate,data])

const renderProduct = () => {
    if(data.length === 0){
        return(
            <h3 className="admin_expiredProduct-msg">No products to display</h3>
        )
    }

    return(
        <ul className="admin_expiredProduct_list">
        {
             data.map(item=>(
                <div className="admin_expiredProduct_item_div" key={item.id}>
                   <div className="admin_expiredProduct_item_data_div">
                        <span className="admin_expiredProduct_item_data_div">{item.name}</span>
                        <span className="admin_expiredProduct_item_data_div">{item.quantity}</span>
                        <span className="admin_expiredProduct_item_data_div">{item.stock} Units</span>
                        <span className="admin_expiredProduct_item_data_div">{Number(item.selling_price).toFixed(2)} LKR</span>
                        <span className="admin_expiredProduct_item_data_div">{item.expiry_date.slice(0,10)}</span>
                   </div>
                    <div className="admin_expiredProduct_item_button">
                        <input type="button" value="Update" className="admin_expiredProduct_item_button_update" onClick={() =>handleUpdate(item.id)}/>
                        <input type="button" value="Delete" className="admin_expiredProduct_item_button_delete" onClick={()=>handleDelete(item.id)}/>
                    </div>
                </div>
            ))
        }
        </ul>
    )
    
}

const handleUpdate = (id) => {
    navigate(`/updateproduct/${id}`)
}

const handleDelete = (id) => {
    const config = {
        headers: {
          'content-type': 'application/json',
        },
      };
    const sendDelete = async() => {
        try{
            const response = await Axios.delete("http://localhost:3001/product/delete",{data:{id:id}},config)
            if(!response.data.status){
                alert("Error deleting Product")
            }else{
                alert(response.data.message)
            }
        }catch(error){
            alert("Error deleting Product")
        }
    }
    sendDelete()
}
return(
    <div className="admin_expiredProduct-wrapper">
        <div className="admin_expiredProduct_navbar">
            <AdminNavbar/>
        </div>
        <div className="admin_expiredProduct-container">
            <h1 className="admin_expiredProduct-heading">All Product Page</h1>
            {renderProduct()}
        </div>
    </div>
)
}

export default ExpiredProduct