import React, { useEffect, useRef, useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/admin_addProduct.css"
import validate from "../../function/productValidation";
import AdminNavbar from "./adminNavbar";
function AddProduct(){
    Axios.defaults.withCredentials = true
    const navigate = useNavigate()
    const fileInputRef = useRef(null)
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
    company : "",
    image : ""
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
    company : "",
    image : ""
})

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
    if(e.target.name === "image"){
        const file = e.target.files[0]
        setInput(prev=>({
            ...prev,
            image : file
        }))
    }else{
        setInput(prev=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
}
const handleReset = () => {
    setInput({
        name : "",
        category : "",
        quantity : "",
        description : "",
        manufacturedDate : "",
        expiryDate : "",
        buyingPrice : "",
        sellingPrice : "",
        stock : "",
        company : "",
        image : ""
    })
    setError({
        name : "",
        category : "",
        quantity : "",
        description : "",
        manufacturedDate : "",
        expiryDate : "",
        buyingPrice : "",
        sellingPrice : "",
        stock : "",
        company : "",
        image : ""
    })
    fileInputRef.current.value = null;
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
                      'content-type': 'multipart/form-data',
                    },
                  };
                const postData = {
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
                    company : input.company.trim(),
                    image: input.image
                };
                const response = await Axios.post("http://localhost:3001/product/add", postData , config);
                if(response.data.status){
                    alert(response.data.message)
                    setInput({
                        name : "",
                        category : "",
                        quantity : "",
                        description : "",
                        manufacturedDate : "",
                        expiryDate : "",
                        buyingPrice : "",
                        sellingPrice : "",
                        stock : "",
                        company : "",
                        image : ""
                    })
                    fileInputRef.current.value = null;
                }
            } catch (error) {
                console.log(error);
            }
        }
        sendData()
    }
}
return(
    <div className="admin_addProduct-wrapper">
        <div className="admin_addProduct_navbar">
            <AdminNavbar/>
        </div>
        <div className="admin_addProduct-container">
        <h1 className="admin_addProduct-heading">Add Product Page</h1>
        <form className="admin_addProduct-form" onSubmit={handleSubmit} onReset={handleReset}>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="name" className="admin_addProduct-input-label">Name</label>
                <input type="text" name="name" value={input.name} className="admin_addProduct-input-field" placeholder="Enter product name" onChange={handleChange}/>
                {error.name && <h4 className="admin_addProduct-input-error">{error.name}</h4>}
            </div>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="category" className="admin_addProduct-input-label">Category</label>
                <select name="category" placeholder="Select a category" className="admin_addProduct-input-dropdown" onChange={handleChange}>
                <option value="">Select a category</option>
                {category.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
                 </select>
                {error.category && <h4 className="admin_addProduct-input-error">{error.category}</h4>}
            </div>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="quantity" className="admin_addProduct-input-label">Quantity</label>
                <input type="text" name="quantity" value={input.quantity} className="admin_addProduct-input-field" placeholder="Enter product quantity" onChange={handleChange}/>
                {error.quantity && <h4 className="admin_addProduct-input-error">{error.quantity}</h4>}
            </div>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="stock" className="admin_addProduct-input-label">Stock</label>
                <input type="number" name="stock" value={input.stock} className="admin_addProduct-input-field" placeholder="Enter product stock" onChange={handleChange}/>
                {error.stock && <h4 className="admin_addProduct-input-error">{error.stock}</h4>}
            </div>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="description" className="admin_addProduct-input-label">Description</label>
                <input type="text" name="description" value={input.description} className="admin_addProduct-input-field" placeholder="Enter product description" onChange={handleChange}/>
                {error.description && <h4 className="admin_addProduct-input-error">{error.description}</h4>}
            </div>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="company" className="admin_addProduct-input-label">Company</label>
                <input type="text" name="company" value={input.company} className="admin_addProduct-input-field" placeholder="Enter product company" onChange={handleChange}/>
                {error.company && <h4 className="admin_addProduct-input-error">{error.company}</h4>}
            </div>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="manufacturedDate" className="admin_addProduct-input-label">Manufactured Date</label>
                <input type="date" name="manufacturedDate" value={input.manufacturedDate} className="admin_addProduct-input-field" placeholder="Enter manufactured date" onChange={handleChange}/>
                {error.manufacturedDate && <h4 className="admin_addProduct-input-error">{error.manufacturedDate}</h4>}
            </div>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="expiryDate" className="admin_addProduct-input-label">Expiry Date</label>
                <input type="date" name="expiryDate" value={input.expiryDate} className="admin_addProduct-input-field" placeholder="Enter expiry date" onChange={handleChange}/>
                {error.expiryDate && <h4 className="admin_addProduct-input-error">{error.expiryDate}</h4>}
            </div>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="buyingPrice" className="admin_addProduct-input-label">Buying Price</label>
                <input type="text" name="buyingPrice" value={input.buyingPrice} className="admin_addProduct-input-field" placeholder="Enter buying price" onChange={handleChange}/>
                {error.buyingPrice && <h4 className="admin_addProduct-input-error">{error.buyingPrice}</h4>}
            </div>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="sellingPrice" className="admin_addProduct-input-label">Selling Price</label>
                <input type="text" name="sellingPrice" value={input.sellingPrice} className="admin_addProduct-input-field" placeholder="Enter selling price" onChange={handleChange}/>
                {error.sellingPrice && <h4 className="admin_addProduct-input-error">{error.sellingPrice}</h4>}
            </div>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="image" className="admin_addProduct-input-label">Image</label>
                <input type="file" name="image"  className="admin_addProduct-input-field" placeholder="Select the product image" onChange={handleChange}/>
                {error.image && <h4 className="admin_addProduct-input-error">{error.image}</h4>}
            </div>
            <div className="admin_addProduct-button-div">
                <input type="submit" className="admin_addProduct-button-submit" value="Submit"/>
                <input type="reset" className="admin_addProduct-button-reset" value="Clear"/>
            </div>
        </form>
    </div>
    </div>
)
}

export default AddProduct