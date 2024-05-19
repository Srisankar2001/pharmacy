import React, { useEffect, useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/admin_addCategory.css"
import AdminNavbar from "./adminNavbar";

function AddCategory(){
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


   const [input,setInput] = useState({
        name : "",
        error : ""
    })


const handleChange = (e) => {
    setInput(prev=>({
        ...prev,
        [e.target.name] : e.target.value
    }))
}
const handleReset = () => {
    setInput({
       name : "",
       error : ""
    })
}
const handleSubmit = (e) => {
    e.preventDefault()
    if(input.name.trim() === ""){
        setInput(prev => ({
            ...prev,
            error : "Category field is empty"
        }))
    }else if(!(/^[A-Za-z\s]+$/.test(input.name.trim()))){
        setInput(prev => ({
            ...prev,
            error : "Invalid category name"
        }))
    }else{
        const sendData = async() => {
            try {
                const postData = {
                    name : input.name.trim()
                };
                const response = await Axios.post("http://localhost:3001/category/add", postData);
                if(response.data.status){
                    alert(response.data.message)
                    setInput({
                            name : "",
                            error : ""
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
        sendData()
    }
}
return(
    <div className="admin_addCategory-wrapper">
        <div className="admin_addCategory_navbar">
            <AdminNavbar/>
        </div>
        <div className="admin_addCategory-container">
        <h1 className="admin_addCategory-heading">Add Category Page</h1>
        <form className="admin_addCategory-form" onSubmit={handleSubmit} onReset={handleReset}>
            <div className="admin_addCategory-input-div">
                <label  htmlFor="name" className="admin_addCategory-input-label">Category Name</label>
                <input type="text" name="name" value={input.name} className="admin_addCategory-input-field" placeholder="Enter category name" onChange={handleChange}/>
                {input.error && <h4 className="admin_addCategory-input-error">{input.error}</h4>}
            </div>
            <div className="admin_addCategory-button-div">
                <input type="submit" className="admin_addCategory-button-submit" value="Submit"/>
                <input type="reset" className="admin_addCategory-button-reset" value="Clear"/>
            </div>
        </form>
    </div>
    </div>
)
}

export default AddCategory