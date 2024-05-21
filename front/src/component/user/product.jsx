import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./navbar";
import "../../style/user_product.css"
function Product() {
    Axios.defaults.withCredentials = true
    const navigate = useNavigate()
    const [isAuth, setAuth] = useState(false)
    const [state, setState] = useState({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
    })

    const [data, setData] = useState([])
    const [category, setCategory] = useState([])
    const [isCategory, setIsCategory] = useState(null)
    useEffect(() => {
        const isUser = async () => {
            try {
                const response = await Axios.get("http://localhost:3001/auth/isUser")
                if (response.data.status) {
                    setAuth(true)
                    getId()
                }
            } catch (error) {
                //Todo
            }
        }

        const getId = async () => {
            try {
                const response = await Axios.get("http://localhost:3001/auth/details")
                if (response.data.status) {
                    setState({
                        id: response.data.data.id,
                        firstname: response.data.data.firstname,
                        lastname: response.data.data.lastname,
                        email: response.data.data.email,
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
        isUser()
    }, [navigate])

    useEffect(() => {
        const getCategory = async () => {
            try {
                const response = await Axios.get("http://localhost:3001/category/get")
                if (response.data.status) {
                    setCategory(response.data.data)
                }
            } catch (error) {
                alert("Error Fetching Category")
            }
        }
        const getProduct = async () => {
            try {
                const response = await Axios.get("http://localhost:3001/product/get_product")
                if (response.data.status) {
                    setData(response.data.data)
                }
            } catch (error) {
                alert("Error Fetching Product")
            }
        }
        getCategory()
        getProduct()
    }, [navigate])


    const renderCategory = () => {
        if (category.length === 0) {
            return (
                <div className="user_product_message_category">
                    No Category
                </div>
            )
        }

        return category.map(item => (
            <div className="user_product_list_category" key={item.id}>
                {isCategory == item.id ?
                    <span className="user_product_item_category_name_select" onClick={() => handleCategory(item.id)}>{item.name}</span>
                    :
                    <span className="user_product_item_category_name" onClick={() => handleCategory(item.id)}>{item.name}</span>
                }
            </div>
        ))
    }

    const handleCategory = (id) => {
        if (isCategory === id) {
            setIsCategory(null)
        } else {
            setIsCategory(id)
        }
    }
    const renderData = () => {
        const filteredData = isCategory === null ? data : data.filter(item => item.category === isCategory);

        if (filteredData.length === 0) {
            return <div className="user_product_message_product">No Products to display</div>;
        }

        return filteredData.map((item) => (
            <div className="user_product_list_product" key={item.id}>
                <img src={`http://localhost:3001/images/${item.url}`} alt={item.name} className="user_product_item_image" />
                <span className="user_product_item_product_name">{item.name}</span>
                <span className="user_product_item_product_price">{item.price}</span>
                <span className="user_product_item_product_quantity">{item.quantity}</span>
                <span className="user_product_item_product_description">{item.description}</span>
                <div className="user_product_item_btn_div">
                    {isAuth ? (
                        <input type="button" value="Add to Cart" onClick={() => handleCart(state.id, item.id)} className="user_product_item_btn" />
                    ) : (
                        <input type="button" value="Add to Cart" onClick={() => navigate("/signin")} className="user_product_item_btn" />
                    )}
                </div>
            </div>
        ));
    }
    const handleCart = (userId, productId) => {
        const addToCart = async (userId, productId) => {
            try {
                const config = {
                    headers: {
                        'content-type': 'application/json',
                    },
                };
                const postData = {
                    userId: userId,
                    productId: productId
                }
                const response = await Axios.post("http://localhost:3001/cart/add", postData, config)
                if (response.data.status) {
                    alert(response.data.message)
                } else {
                    console.log(response.data.message)
                }
            } catch (error) {
                console.log(error)
            }
        }
        addToCart(userId, productId)
    }

    return (
        <div className="user_product_wrapper">
            <div className="user_product_navbar">
                <UserNavbar />
            </div>
            <div className="user_product_container">
                <div className="user_product_category">
                    <div className="user_product_category_heading">
                        {category.length > 0 ? <h3>Category</h3> : null}
                    </div>
                    {renderCategory()}
                </div>
                <div className="user_product_product">
                    <div className="user_product_product_heading">
                        {data.length > 0 ? <h3>Products</h3> : null}
                    </div>
                    {renderData()}
                </div>

            </div>
        </div>
    )
}

export default Product