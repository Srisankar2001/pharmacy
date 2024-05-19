import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./navbar";
import "../../style/user_cart.css";

function Cart() {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [isAuth, setAuth] = useState(false);
    const [state, setState] = useState({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
    });

    const [data, setData] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const isUser = async () => {
            try {
                const response = await Axios.get("http://localhost:3001/auth/isUser");
                if (response.data.status) {
                    setAuth(true);
                    getId();
                }
            } catch (error) {
                console.log(error);
            }
        };

        const getId = async () => {
            try {
                const response = await Axios.get("http://localhost:3001/auth/details");
                if (response.data.status) {
                    setState({
                        id: response.data.data.id,
                        firstname: response.data.data.firstname,
                        lastname: response.data.data.lastname,
                        email: response.data.data.email,
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        isUser();
    }, [navigate]);

    useEffect(() => {
        const getCart = async () => {
            try {
                const config = {
                    headers: {
                        'content-type': 'application/json',
                    },
                };
                const postData = {
                    userId: state.id
                };
                const response = await Axios.post("http://localhost:3001/cart/get", postData, config);
                if (response.data.status) {
                    setData(response.data.data);
                }
            } catch (error) {
                alert("Error Fetching Data");
            }
        };

        if (state.id) {
            getCart();
        }
    }, [state.id]);

    useEffect(() => {
        const getCartItems = async () => {
            if (data.length > 0) {
                try {
                    const promises = data.map(async (item) => {
                        const config = {
                            headers: {
                                'content-type': 'application/json',
                            },
                        };
                        const response = await Axios.get(`http://localhost:3001/product/getproduct/${item.productId}`, config);
                        if (response.data.status) {
                            return { ...response.data.data, cartQuantity: item.quantity , newCartQuantity: item.quantity}; // Include cart-specific quantity
                        }
                        return null; // Return null if request fails
                    });
                    const cartItems = await Promise.all(promises);
                    setCart(cartItems.filter(item => item !== null)); // Filter out null items
                } catch (error) {
                    console.error("Error Fetching Data:", error);
                }
            }
        };

        if (data.length > 0) {
            getCartItems();
        }
    }, [data]);

    const handleUpdate = async (productId, oldQuantity , newQuantity) => {
        if(Number(oldQuantity) !== Number(newQuantity) && !isNaN(newQuantity) && Number(newQuantity)>0){
            try {
                const config = {
                    headers: {
                        'content-type': 'application/json',
                    },
                };
                const postData = {
                    userId: state.id,
                    productId: productId,
                    quantity: newQuantity
                };
                const response = await Axios.put("http://localhost:3001/cart/update", postData, config);
                if (response.data.status) {
                    alert(response.data.message);
                    navigate(0); // Refresh the page
                } else {
                    console.log(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }
        
    };

    const handleDelete = async (productId) => {
        try {
            const config = {
                headers: {
                    'content-type': 'application/json',
                },
            };
            const postData = {
                userId: state.id,
                productId: productId,
            };
            const response = await Axios.delete("http://localhost:3001/cart/delete", { data: postData }, config);
            if (response.data.status) {
                alert(response.data.message);
                navigate(0); // Refresh the page
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleQuantityChange = (index, newQuantity) => {
        setCart(prevCart => {
            const updatedCart = [...prevCart];
            updatedCart[index].newCartQuantity = newQuantity;
            return updatedCart;
        });
    };

    const renderData = () => {
        if (cart.length === 0) {
            return (
                <div className="user_cart_message">
                    No Products in the cart
                </div>
            );
        }

        return cart.map((item, index) => (
            <div className="user_cart_list" key={item.id}>
                <img src={`http://localhost:3001/images/${item.url}`} alt={item.name} className="user_cart_item_image" />
                <span className="user_cart_item_name">{item.name}</span>
                <span className="user_cart_item_price">{item.price}</span>
                <span className="user_cart_item_quantity">{item.cartQuantity}</span>
                <input
                    type="number"
                    name="quantity"
                    value={item.newCartQuantity}
                    placeholder={item.cartQuantity}
                    onChange={(e) => {
                            handleQuantityChange(index, e.target.value);
                    }}
                />
                <div className="user_cart_item_btn_div">
                    <input type="button" value="Update" onClick={() => handleUpdate(item.productId, item.cartQuantity , item.newCartQuantity)} className="user_cart_item_btn_update" />
                    <input type="button" value="Delete" onClick={() => handleDelete(item.productId)} className="user_cart_item_btn_delete" />
                </div>
            </div>
        ));
    };

    return (
        <div className="user_cart_wrapper">
            <div className="user_cart_navbar">
                <UserNavbar />
            </div>
            <div className="user_cart_container">
                <div className="user_cart_grid">
                    {renderData()}
                </div>
            </div>
        </div>
    );
}

export default Cart;
