import React, { useEffect, useState } from "react";
import  Axios  from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./navbar";
import "../../style/user_home.css"

function Home(){
    Axios.defaults.withCredentials = true
    const navigate = useNavigate()
    const [isAuth,setAuth] = useState(false)
   const [state,setState] = useState({
    id:"",
    firstname:"",
    lastname:"",
    email:"",
   })

   const [data,setData] = useState([])

   useEffect(()=>{

    const isUser = async()=>{
        try{
            const response = await Axios.get("http://localhost:3001/auth/isUser")
            if(response.data.status){
                setAuth(true)
                getId()
            }
        }catch(error){
            console.log(error)
        }
    }

    const getId = async()=>{
        try{
            const response = await Axios.get("http://localhost:3001/auth/details")
            if(response.data.status){
                setState({
                    id:response.data.data.id,
                    firstname:response.data.data.firstname,
                    lastname:response.data.data.lastname,
                    email:response.data.data.email,
                })
            }
        }catch(error){
            console.log(error)
        }
    }
    isUser()
   },[navigate])

   useEffect(()=>{
    const getProduct = async() =>  {
        try{
            const response = await Axios.get("http://localhost:3001/product/get_home")
            if(response.data.status){
                setData(response.data.data)
            }
        }catch(error){
            alert("Error Fetching Data")
        }
    }
    getProduct()
   },[navigate])

   const renderData = ()=>{
        if(data.length === 0){
            return(
                <div className="user_home_message">
                    No Products to display
                </div>
            )
        }

        return data.map(item => (
            <div className="user_home_list" key={item.id}>
                <img src={`http://localhost:3001/images/${item.url}`} alt={item.name} className="user_home_item_image"/>
                <span className="user_home_item_name">{item.name}</span>
                <span className="user_home_item_price">{item.price}</span>
                <span className="user_home_item_quantity">{item.quantity}</span>
                <span className="user_home_item_description">{item.description}</span>
                <div className="user_home_item_btn_div">
                    {isAuth ? 
                    <input type="button" value="Add to Cart" onClick={()=>handleCart(state.id,item.id)} className="user_home_item_btn"/>
                    :
                    <input type="button" value="Add to Cart" onClick={()=>{navigate("/")}} className="user_home_item_btn"/>}
                </div>
            </div>
        ))
   }

   const handleCart = (userId,productId) => {
        const addToCart = async(userId,productId) => {
            try{
                const config = {
                    headers: {
                      'content-type': 'application/json',
                    },
                };
                const postData = {
                    userId : userId,
                    productId : productId
                }
                const response = await Axios.post("http://localhost:3001/cart/add",postData,config)
                if(response.data.status){
                    alert(response.data.message)
                }else{
                    console.log(response.data.message)
                }
            }catch(error){
                console.log(error)
            }
        }
        addToCart(userId,productId)
   }

    return(
        <div className="user_home_wrapper">
            <div className="user_home_navbar">
                <UserNavbar/>
            </div>
            <div className="user_home_container">
                <div className="user_home_poster">
                    <img src="images/poster.jpg"  alt="image" className="user_home_poster_image"/>
                </div>
                <div className="user_home_grid">
                 {renderData()}
                </div>
               
            </div>
        </div>
    )
}

export default Home