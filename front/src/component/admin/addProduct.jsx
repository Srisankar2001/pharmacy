import React, { useEffect, useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct(){
    Axios.defaults.withCredentials = true
    const navigate = useNavigate()
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
    category : "",
    quantity : "",
    description : "",
    manufaturedDate : "",
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
    manufaturedDate : "",
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
                console.log(response.data.data)
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
    setInput({
        name : "",
        category : "",
        quantity : "",
        description : "",
        manufaturedDate : "",
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
        manufaturedDate : "",
        expiryDate : "",
        buyingPrice : "",
        sellingPrice : "",
        stock : "",
        company : "",
        image : ""
    })
}
const handleSubmit = (e) => {
    // e.preventDefault()
    // const errors = validate(input)
    // setError(errors)
    // if(Object.values(errors).every(value => value === "")){
    //     const sendData = async() => {
    //         try {
    //             const postData = {
    //                 firstname: input.firstname.trim(),
    //                 lastname: input.lastname.trim(),
    //                 dob: input.dob,
    //                 email: input.email.trim().toLocaleLowerCase(),
    //                 password: input.password.trim()
    //             };
    //             const response = await Axios.post("http://localhost:3001/admin/register", postData);
    //             if(response.data.status){
    //                 alert(response.data.message)
    //                 setInput({
    //                         firstname:"",
    //                         lastname:"",
    //                         dob:"",
    //                         email:"",
    //                         password:"",
    //                         cpassword:""
    //                 })
    //             }
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     sendData()
    // }
}
return(
    <div className="admin_addProduct-container">
        <h1 className="admin_addProduct-heading">Add Product Page</h1>
        <form className="admin_addProduct-form" onSubmit={handleSubmit} onReset={handleReset}>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="name" className="admin_addProduct-input-label">Name</label>
                <input type="text" name="firstname" value={input.name} className="admin_addProduct-input-field" placeholder="Enter product name" onChange={handleChange}/>
                {error.name && <h4 className="admin_addProduct-input-error">{error.name}</h4>}
            </div>
            <div className="admin_addProduct-input-div">
                <label  htmlFor="quantity" className="admin_addProduct-input-label">Quantity</label>
                <input type="text" name="quanity" value={input.quantity} className="admin_addProduct-input-field" placeholder="Enter product quantity" onChange={handleChange}/>
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
                <label  htmlFor="manufaturedDate" className="admin_addProduct-input-label">Manufatured Date</label>
                <input type="date" name="manufaturedDate" value={input.manufaturedDate} className="admin_addProduct-input-field" placeholder="Enter manufatured date" onChange={handleChange}/>
                {error.manufaturedDate && <h4 className="admin_addProduct-input-error">{error.manufaturedDate}</h4>}
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
                <input type="file" name="image" value={input.image} className="admin_addProduct-input-field" placeholder="Select the product image" onChange={handleChange}/>
                {error.image && <h4 className="admin_addProduct-input-error">{error.image}</h4>}
            </div>
            <div className="admin_addProduct-button-div">
                <input type="submit" className="admin_addProduct-button-submit" value="Submit"/>
                <input type="reset" className="admin_addProduct-button-reset" value="Clear"/>
            </div>
        </form>
    </div>
)
}

export default AddProduct