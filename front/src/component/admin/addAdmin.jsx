import React, { useEffect, useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/admin_addAdmin.css"
import validate from "../../function/registerValidation";

function AddAdmin(){
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
    firstname:"",
    lastname:"",
    dob:"",
    email:"",
    password:"",
    cpassword:""
})
const [error,setError] = useState({
    firstname:"",
    lastname:"",
    dob:"",
    email:"",
    password:"",
    cpassword:""
})
const handleChange = (e) => {
    setInput(prev=>({
        ...prev,
        [e.target.name] : e.target.value
    }))
}
const handleReset = () => {
    setInput({
        firstname:"",
        lastname:"",
        dob:"",
        email:"",
        password:"",
        cpassword:""
    })
    setError({
        firstname:"",
        lastname:"",
        dob:"",
        email:"",
        password:"",
        cpassword:""
    })
}
const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validate(input)
    setError(errors)
    if(Object.values(errors).every(value => value === "")){
        const sendData = async() => {
            try {
                const postData = {
                    firstname: input.firstname.trim(),
                    lastname: input.lastname.trim(),
                    dob: input.dob,
                    email: input.email.trim().toLocaleLowerCase(),
                    password: input.password.trim()
                };
                const response = await Axios.post("http://localhost:3001/admin/register", postData);
                if(response.data.status){
                    alert(response.data.message)
                    setInput({
                            firstname:"",
                            lastname:"",
                            dob:"",
                            email:"",
                            password:"",
                            cpassword:""
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
    <div className="admin_addAdmin-container">
        <h1 className="admin_addAdmin-heading">Add Admin Page</h1>
        <form className="admin_addAdmin-form" onSubmit={handleSubmit} onReset={handleReset}>
            <div className="admin_addAdmin-input-div">
                <label  htmlFor="firstname" className="admin_addAdmin-input-label">First Name</label>
                <input type="text" name="firstname" value={input.firstname} className="admin_addAdmin-input-field" placeholder="Enter admin first name" onChange={handleChange}/>
                {error.firstname && <h4 className="admin_addAdmin-input-error">{error.firstname}</h4>}
            </div>
            <div className="admin_addAdmin-input-div">
                <label  htmlFor="lastname" className="admin_addAdmin-input-label">Last Name</label>
                <input type="text" name="lastname" value={input.lastname} className="admin_addAdmin-input-field" placeholder="Enter admin last name" onChange={handleChange}/>
                {error.lastname && <h4 className="admin_addAdmin-input-error">{error.lastname}</h4>}
            </div>
            <div className="admin_addAdmin-input-div">
                <label  htmlFor="dob" className="admin_addAdmin-input-label">Date of Birth</label>
                <input type="date" name="dob" value={input.dob} className="admin_addAdmin-input-field" placeholder="Enter admin DOB" onChange={handleChange}/>
                {error.dob && <h4 className="admin_addAdmin-input-error">{error.dob}</h4>}
            </div>
            <div className="admin_addAdmin-input-div">
                <label  htmlFor="email" className="admin_addAdmin-input-label">Email</label>
                <input type="text" name="email" value={input.email} className="admin_addAdmin-input-field" placeholder="Enter admin email" onChange={handleChange}/>
                {error.email && <h4 className="admin_addAdmin-input-error">{error.email}</h4>}
            </div>
            <div className="admin_addAdmin-input-div">
                <label  htmlFor="password" className="admin_addAdmin-input-label">Password</label>
                <input type="password" name="password" value={input.password} className="admin_addAdmin-input-field" placeholder="Enter admin password" onChange={handleChange}/>
                {error.password && <h4 className="admin_addAdmin-input-error">{error.password}</h4>}
            </div>
            <div className="admin_addAdmin-input-div">
                <label  htmlFor="cpassword" className="admin_addAdmin-input-label">Confirm Password</label>
                <input type="password" name="cpassword" value={input.cpassword} className="admin_addAdmin-input-field" placeholder="Re-Enter admin password" onChange={handleChange}/>
                {error.cpassword && <h4 className="admin_addAdmin-input-error">{error.cpassword}</h4>}
            </div>
            <div className="admin_addAdmin-button-div">
                <input type="submit" className="admin_addAdmin-button-submit" value="Submit"/>
                <input type="reset" className="admin_addAdmin-button-reset" value="Clear"/>
            </div>
        </form>
    </div>
)
}

export default AddAdmin