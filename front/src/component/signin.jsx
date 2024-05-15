import React, { useState } from "react"
import Axios from "axios"
import "../style/signin.css"
import validate from "../function/signinValidation"
import { useNavigate } from "react-router-dom"
function Signin(){
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
            email:"",
            password:""
        })
        setError({
            email:"",
            password:""
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
                        email: state.email.trim().toLocaleLowerCase(),
                        password: state.password.trim()
                    };
                    const response = await Axios.post("http://localhost:3001/auth/signin", postData);
                    console.log(response.data)
                    // if(response.data.data.status){
                    //     console.log(response)
                    // }
                } catch (error) {
                    console.log(error);
                }
            }
            sendData()
        }
    }
    return(
        <div className="signin-container">
            <h1 className="signin-heading">Signin Form</h1>
            <form className="signin-form" onSubmit={handleSubmit} onReset={handleReset}>
                <div className="signin-input-div">
                    <label  htmlFor="email" className="signin-input-label">Email</label>
                    <input type="text" name="email" value={state.email} className="signin-input-field" placeholder="Enter your email" onChange={handleChange}/>
                    {error.email && <h4 className="signin-input-error">{error.email}</h4>}
                </div>
                <div className="signin-input-div">
                    <label  htmlFor="password" className="signin-input-label">Password</label>
                    <input type="password" name="password" value={state.password} className="signin-input-field" placeholder="Enter your password" onChange={handleChange}/>
                    {error.password && <h4 className="signin-input-error">{error.password}</h4>}
                </div>
                <div className="signin-button-div">
                    <input type="submit" className="signin-button-submit" value="Submit"/>
                    <input type="reset" className="signin-button-reset" value="Clear"/>
                </div>
                <div className="signin-link">
                    Don't have an account.Click Here to Register.
                </div>
            </form>
        </div>
    )
}

export default Signin