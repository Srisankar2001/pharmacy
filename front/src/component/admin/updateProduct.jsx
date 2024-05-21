import React, { useEffect, useRef, useState } from "react";
import  Axios  from "axios";
import { useNavigate, useParams } from "react-router-dom";
import validate from "../../function/updateValidation";
 import "../../style/admin_updateProduct.css"
import AdminNavbar from "./adminNavbar";

function UpdateProduct(){
    const { id } = useParams()
    const navigate = useNavigate()
    if(id === null || isNaN(id)){
        navigate("/dashboard")
    }
    Axios.defaults.withCredentials = true
   const [state,setState] = useState({
    id:"",
    firstname:"",
    lastname:"",
    email:"",
   })

   const [category,setCategory] = useState([])

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


   const [input,setInput] = useState({
        name : "",
        category : "",
        quantity : "",
        description : "",
        manufacturedDate : "",
        expiryDate : "",
        buyingPrice : "",
        sellingPrice : "",
        stock : "",
        company : ""
    })
const [error,setError] = useState({
    name : "",
    category : "",
    quantity : "",
    description : "",
    manufacturedDate : "",
    expiryDate : "",
    buyingPrice : "",
    sellingPrice : "",
    stock : "",
    company : ""
})

useEffect(()=>{
    const getProduct = async() => {
        try{
            const response = await Axios.get(`http://localhost:3001/product/getproduct/${id}`)
            if(!response.data.status){
                alert("Error fetching Product")
            }else{
                const data = response.data.data
                setInput({
                    name : data.name,
                    category : data.category,
                    quantity : data.quantity,
                    description : data.description,
                    manufacturedDate :new Date(data.manufactured_date).toISOString().split('T')[0],
                    expiryDate : new Date(data.expiry_date).toISOString().split('T')[0],
                    buyingPrice : data.buying_price,
                    sellingPrice : data.selling_price,
                    stock : data.stock,
                    company : data.company
                })
            }
        }catch(error){
            alert("Error fetching Product")
            console.log(error)
        }
    }
    getProduct()
},[navigate])

useEffect(()=>{
    const getCategory = async() => {
        try{
            const response = await Axios.get("http://localhost:3001/category/get")
            if(!response.data.status){
                alert("Error fetching Category")
            }else{
                setCategory(response.data.data)
            }
        }catch(error){
            alert("Error fetching Category")
        }
    }
    getCategory()
},[navigate])



const handleChange = (e) => {
    setInput(prev=>({
        ...prev,
        [e.target.name] : e.target.value
    }))
}

const handleReset = () => {
    navigate(`/updateproduct/${id}`)
}

const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validate(input)
    setError(errors)
    if(Object.values(errors).every(value => value === "")){
        const sendData = async() => {
            try {
                const config = {
                    headers: {
                      'content-type': 'application/json',
                    },
                  };
                const postData = {
                    id : id,
                    adminId : state.id,
                    name : input.name.trim(),
                    category : input.category,
                    quantity : input.quantity,
                    description : input.description.trim(),
                    manufactured_date : input.manufacturedDate,
                    expiry_date : input.expiryDate,
                    buying_price : Number(input.buyingPrice).toFixed(2),
                    selling_price : Number(input.sellingPrice).toFixed(2),
                    stock : input.stock,
                    company : input.company.trim()
                };
                const response = await Axios.put("http://localhost:3001/product/update", postData, config);
                if(response.data.status){
                    alert(response.data.message)
                    navigate("/allproduct")
                }
            } catch (error) {
                console.log(error);
            }
        }
        sendData()
    }
}
return(
    <div className="admin_updateProduct-wrapper">
        <div className="admin_updateProduct_navbar">
            <AdminNavbar/>
        </div>
        <div className="admin_updateProduct-container">
            <h1 className="admin_updateProduct-heading">update Product Page</h1>
            <form className="admin_updateProduct-form" onSubmit={handleSubmit} onReset={handleReset}>
                <div className="admin_updateProduct-input-div">
                    <label  htmlFor="name" className="admin_updateProduct-input-label">Name</label>
                    <input type="text" name="name" value={input.name} className="admin_updateProduct-input-field" placeholder="Enter product name" onChange={handleChange}/>
                    {error.name && <h4 className="admin_updateProduct-input-error">{error.name}</h4>}
                </div>
                <div className="admin_updateProduct-input-div">
                    <label  htmlFor="category" className="admin_updateProduct-input-label">Category</label>
                    <select name="category" value={input.category} placeholder="Select a category" className="admin_updateProduct-input-dropdown" onChange={handleChange}>
                    {category.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                    </select>
                    {error.category && <h4 className="admin_updateProduct-input-error">{error.category}</h4>}
                </div>
                <div className="admin_updateProduct-input-div">
                    <label  htmlFor="quantity" className="admin_updateProduct-input-label">Quantity</label>
                    <input type="text" name="quantity" value={input.quantity} className="admin_updateProduct-input-field" placeholder="Enter product quantity" onChange={handleChange}/>
                    {error.quantity && <h4 className="admin_updateProduct-input-error">{error.quantity}</h4>}
                </div>
                <div className="admin_updateProduct-input-div">
                    <label  htmlFor="stock" className="admin_updateProduct-input-label">Stock</label>
                    <input type="number" name="stock" value={input.stock} className="admin_updateProduct-input-field" placeholder="Enter product stock" onChange={handleChange}/>
                    {error.stock && <h4 className="admin_updateProduct-input-error">{error.stock}</h4>}
                </div>
                <div className="admin_updateProduct-input-div">
                    <label  htmlFor="description" className="admin_updateProduct-input-label">Description</label>
                    <input type="text" name="description" value={input.description} className="admin_updateProduct-input-field" placeholder="Enter product description" onChange={handleChange}/>
                    {error.description && <h4 className="admin_updateProduct-input-error">{error.description}</h4>}
                </div>
                <div className="admin_updateProduct-input-div">
                    <label  htmlFor="company" className="admin_updateProduct-input-label">Company</label>
                    <input type="text" name="company" value={input.company} className="admin_updateProduct-input-field" placeholder="Enter product company" onChange={handleChange}/>
                    {error.company && <h4 className="admin_updateProduct-input-error">{error.company}</h4>}
                </div>
                <div className="admin_updateProduct-input-div">
                    <label  htmlFor="manufacturedDate" className="admin_updateProduct-input-label">Manufactured Date</label>
                    <input type="date" name="manufacturedDate" value={input.manufacturedDate} className="admin_updateProduct-input-field" placeholder="Enter manufactured date" onChange={handleChange}/>
                    {error.manufacturedDate && <h4 className="admin_updateProduct-input-error">{error.manufacturedDate}</h4>}
                </div>
                <div className="admin_updateProduct-input-div">
                    <label  htmlFor="expiryDate" className="admin_updateProduct-input-label">Expiry Date</label>
                    <input type="date" name="expiryDate" value={input.expiryDate} className="admin_updateProduct-input-field" placeholder="Enter expiry date" onChange={handleChange}/>
                    {error.expiryDate && <h4 className="admin_updateProduct-input-error">{error.expiryDate}</h4>}
                </div>
                <div className="admin_updateProduct-input-div">
                    <label  htmlFor="buyingPrice" className="admin_updateProduct-input-label">Buying Price</label>
                    <input type="text" name="buyingPrice" value={input.buyingPrice} className="admin_updateProduct-input-field" placeholder="Enter buying price" onChange={handleChange}/>
                    {error.buyingPrice && <h4 className="admin_updateProduct-input-error">{error.buyingPrice}</h4>}
                </div>
                <div className="admin_updateProduct-input-div">
                    <label  htmlFor="sellingPrice" className="admin_updateProduct-input-label">Selling Price</label>
                    <input type="text" name="sellingPrice" value={input.sellingPrice} className="admin_updateProduct-input-field" placeholder="Enter selling price" onChange={handleChange}/>
                    {error.sellingPrice && <h4 className="admin_updateProduct-input-error">{error.sellingPrice}</h4>}
                </div>
                <div className="admin_updateProduct-button-div">
                    <input type="submit" className="admin_updateProduct-button-submit" value="Submit"/>
                    <input type="reset" className="admin_updateProduct-button-reset" value="Clear"/>
                </div>
            </form>
        </div>
    </div>                  
)
}

export default UpdateProduct