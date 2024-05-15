import React, { useState } from "react"
import Axios from "axios"
import "../style/register.css"
import validate from "../function/registerValidation"
import { useNavigate } from "react-router-dom"
function Register(){
    Axios.defaults.withCredentials = true
    const navigate = useNavigate()
    const [state,setState] = useState({
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
        setState(prev=>({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }
    const handleReset = () => {
        setState({
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
        const errors = validate(state)
        setError(errors)
        if(Object.values(errors).every(value => value === "")){
            const sendData = async() => {
                try {
                    const postData = {
                        firstname: state.firstname.trim(),
                        lastname: state.lastname.trim(),
                        dob: state.dob,
                        email: state.email.trim().toLocaleLowerCase(),
                        password: state.password.trim()
                    };
                    const response = await Axios.post("http://localhost:3001/user/register", postData);
                    if(response.data.data.status){
                        alert(response.data.data.message)
                        navigate("/")
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            sendData()
        }
    }
    return(
        <div className="register-container">
            <h1 className="register-heading">Register Form</h1>
            <form className="register-form" onSubmit={handleSubmit} onReset={handleReset}>
                <div className="register-input-div">
                    <label  htmlFor="firstname" className="register-input-label">First Name</label>
                    <input type="text" name="firstname" value={state.firstname} className="register-input-field" placeholder="Enter your first name" onChange={handleChange}/>
                    {error.firstname && <h4 className="register-input-error">{error.firstname}</h4>}
                </div>
                <div className="register-input-div">
                    <label  htmlFor="lastname" className="register-input-label">Last Name</label>
                    <input type="text" name="lastname" value={state.lastname} className="register-input-field" placeholder="Enter your last name" onChange={handleChange}/>
                    {error.lastname && <h4 className="register-input-error">{error.lastname}</h4>}
                </div>
                <div className="register-input-div">
                    <label  htmlFor="dob" className="register-input-label">Date of Birth</label>
                    <input type="date" name="dob" value={state.dob} className="register-input-field" placeholder="Enter your DOB" onChange={handleChange}/>
                    {error.dob && <h4 className="register-input-error">{error.dob}</h4>}
                </div>
                <div className="register-input-div">
                    <label  htmlFor="email" className="register-input-label">Email</label>
                    <input type="text" name="email" value={state.email} className="register-input-field" placeholder="Enter your email" onChange={handleChange}/>
                    {error.email && <h4 className="register-input-error">{error.email}</h4>}
                </div>
                <div className="register-input-div">
                    <label  htmlFor="password" className="register-input-label">Password</label>
                    <input type="password" name="password" value={state.password} className="register-input-field" placeholder="Enter your password" onChange={handleChange}/>
                    {error.password && <h4 className="register-input-error">{error.password}</h4>}
                </div>
                <div className="register-input-div">
                    <label  htmlFor="cpassword" className="register-input-label">Confirm Password</label>
                    <input type="password" name="cpassword" value={state.cpassword} className="register-input-field" placeholder="Re-Enter your password" onChange={handleChange}/>
                    {error.cpassword && <h4 className="register-input-error">{error.cpassword}</h4>}
                </div>
                <div className="register-button-div">
                    <input type="submit" className="register-button-submit" value="Submit"/>
                    <input type="reset" className="register-button-reset" value="Clear"/>
                </div>
                <div className="register-link">
                    Already have an account.Click Here to Signin.
                </div>
            </form>
        </div>
    )
}

export default Register