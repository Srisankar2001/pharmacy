import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import UserNavbar from "./navbar";
import "../../style/user_order.css"

function Order() {
    Axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const [state, setState] = useState({
        id: "",
        firstname: "",
        lastname: "",
        email: "",
    });

    const [data, setData] = useState([]);
    const [order, setOrder] = useState([]);
    useEffect(() => {
        const isUser = async () => {
            try {
                const response = await Axios.get("http://localhost:3001/auth/isUser");
                if (response.data.status) {
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
        const getOrder = async () => {
            try {
                const config = {
                    headers: {
                        'content-type': 'application/json',
                    },
                };
                const postData = {
                    userId: state.id
                };
                const response = await Axios.post("http://localhost:3001/order/get", postData, config);
                if (response.data.status) {
                    setData(response.data.data);
                }
            } catch (error) {
                alert("Error Fetching Data");
            }
        };

        const getOrderItems = async (orderId) => {
            try {
                const config = {
                    headers: {
                        'content-type': 'application/json',
                    },
                };
                const postData = {
                    orderId: orderId
                };
                const response = await Axios.post("http://localhost:3001/order/getitem", postData, config);
                if (response.data.status) {
                    return response.data.data
                } else {
                    return []
                }
            } catch (error) {
                alert("Error Fetching Data");
                return []
            }
        }
        const fetchOrders = async () => {
            if (state.id) {
                await getOrder();
                if (data.length > 0) {
                    const ordersWithItems = await Promise.all(
                        data.map(async (item) => {
                            const items = await getOrderItems(item.id);
                            return { ...item, items };
                        })
                    );
                    setOrder(ordersWithItems);
                }
            }
        };

        fetchOrders();
    }, [state.id, data.length]);

    const renderData = () => {
        if (order.length === 0) {
            return (
                <div className="user_order_message">No orders placed yet</div>
            );
        }

        return order.map((item, orderIndex) => (
            <div className="user_order_div" key={orderIndex}>
                <span className="user_order_data">{item.order_date.split('T')[0]}</span>
                <span className="user_order_data">{
                    parseInt(item.order_time.substring(0, 2)) === 12
                        ? "12" + item.order_time.substring(2, 5) + " PM"
                        : parseInt(item.order_time.substring(0, 2)) > 12
                            ? (parseInt(item.order_time.substring(0, 2)) - 12).toString().padStart(2, '0') + item.order_time.substring(2, 5) + " PM"
                            : item.order_time.substring(0, 5) + " AM"
                }
                </span>
                <div className="user_order_orderitem_div">
                    {item.items.map((element, itemIndex) => (
                        <div className="user_order_orderitem" key={itemIndex}>
                            <span className="user_order_orderitem_data">Name: {element.name}</span>
                            <span className="user_order_orderitem_data">Quantity: {element.product_quantity}</span>
                            <span className="user_order_orderitem_data">Unit price: {Number(element.price).toFixed(2)} LKR</span>
                            <span className="user_order_orderitem_data">Units ordered: {element.order_quantity}</span>
                            <span className="user_order_orderitem_data">Total: {Number(element.total).toFixed(2)} LKR</span>
                        </div>
                    ))}
                </div>
                <span className="user_order_data">{Number(item.price).toFixed(2)} LKR</span>
                <div className="user_order_btn_div">
                    {item.status ?
                        <span className="user_order_text">Received</span>
                        :
                        <div>
                            <span className="user_order_text">Not Received</span>
                            <input type="button" value="Confirm Received" onClick={() => handleReceive(item.id)} className="user_order_btn" />
                        </div>
                    }
                </div>
            </div>
        ));
    };

    const handleReceive = async (orderId) => {
        try {
            const config = {
                headers: {
                    'content-type': 'application/json',
                },
            };
            const postData = {
                userId: state.id,
                orderId: orderId
            };
            const response = await Axios.post("http://localhost:3001/order/received", postData, config);
            if (response.data.status) {
                alert(response.data.message);
                navigate(0)
            } else {
                alert(response.data.message)
            }
        } catch (error) {
            alert("Error Fetching Data");
        }
    }

    return (
        <div className="user_order_wrapper">
            <div className="user_order_navbar">
                <UserNavbar />
            </div>
            <div className="user_order_container">
                <div className="user_order_grid">
                    {renderData()}
                </div>
            </div>
        </div>
    );
}

export default Order;
