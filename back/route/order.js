const express = require('express')
const db = require('../db/db')

const router = express.Router()


router.post("/order", (req, res) => {
    const { userId } = req.body;
    let cart = [];

    // Query to fetch cart items for the given user
    const checkCartQuery = "SELECT * FROM cart WHERE userId = ?";
    db.query(checkCartQuery, [userId], (err, resultCheck) => {
        if (err) {
            return res.status(500).json({ status: false, message: err });
        } else {
            if (resultCheck.length > 0) {
                let total = 0;
                let orderId;

                // Iterate over each item in the cart
                resultCheck.forEach(item => {
                    const checkItemQuery = "SELECT * FROM product WHERE id = ?";
                    db.query(checkItemQuery, [item.productId], (err, resultProduct) => {
                        if (err) {
                            return res.status(500).json({ status: false, message: err });
                        } else {
                            if (resultProduct.length === 0 || resultProduct[0].stock < item.quantity) {
                                return res.status(400).json({ status: false, message: `Not enough stock for product with ID ${item.productId}` });
                            } else {
                                cart.push({ id: item.productId, price: resultProduct[0].selling_price ,stock:Number(resultProduct[0].stock),sold:Number(resultProduct[0].sold) , quantity:Number(item.quantity)});
                                total += resultProduct[0].selling_price * item.quantity;

                                // Insert the order if this is the last item in the cart
                                if (cart.length === resultCheck.length) {
                                    const orderSql = "INSERT INTO orders(user_id, price, order_date, order_time) VALUES (?, ?, CURDATE(), CURTIME())";
                                    db.query(orderSql, [userId, total], (err, resultOrder) => {
                                        if (err) {
                                            return res.status(500).json({ status: false, message: err });
                                        } else {
                                            if (resultOrder.insertId) {
                                                orderId = resultOrder.insertId;

                                                // Insert order details for each item in the cart
                                                const detailSql = "INSERT INTO order_details(order_id, product_id, quantity, price, total) VALUES (?, ?, ?, ?, ?)";
                                                cart.forEach(cartItem => {
                                                    db.query(detailSql, [orderId, cartItem.id, cartItem.quantity, cartItem.price, cartItem.price * cartItem.quantity], (err, resultFinal) => {
                                                        if (err) {
                                                            return res.status(500).json({ status: false, message: err });
                                                        }
                                                    });
                                                });

                                                const stockSql = "UPDATE product SET stock = ? , sold = ? WHERE id = ? "
                                                cart.forEach(cartItem => {
                                                    db.query(stockSql, [cartItem.stock-cartItem.quantity, cartItem.sold+cartItem.quantity, cartItem.id], (err, resultStock) => {
                                                        if (err) {
                                                            return res.status(500).json({ status: false, message: err });
                                                        }
                                                    });
                                                });
                                                // Clear the cart after placing the order
                                                const clearSql = "DELETE FROM cart WHERE userId = ?";
                                                db.query(clearSql, [userId], (err, resultClear) => {
                                                    if (err) {
                                                        return res.status(500).json({ status: false, message: err });
                                                    }
                                                });

                                                return res.status(200).json({ status: true, message: "Order placed successfully", orderId: orderId });
                                            } else {
                                                return res.status(500).json({ status: false, message: "Failed to insert order" });
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    });
                });
            } else {
                return res.status(400).json({ status: false, message: "Cart is empty" });
            }
        }
    });
});



router.post("/get",(req,res)=>{
    const { userId } = req.body
    const check = "SELECT * FROM orders WHERE user_id=?"
    db.query(check,[userId],(err,result)=>{
        if(err){
            return res.status(500).json({status:false,message:err})
        }else{
            return res.status(200).json({status:true,data:result})
        }
    }) 
})

router.post("/getitem",(req,res)=>{
    const { orderId } = req.body
    const check = "SELECT p.name , p.quantity as product_quantity , d.quantity as order_quantity , d.price , d.total FROM order_details d JOIN product p ON p.id = d.product_id WHERE d.order_id = ? "
    db.query(check,[orderId],(err,result)=>{
        if(err){
            console.log(err)
            return res.status(500).json({status:false,message:err})
        }else{
            return res.status(200).json({status:true,data:result})
        }
    }) 
})

router.post("/received",(req,res)=>{
    const { userId , orderId } = req.body
    const sql = "UPDATE orders SET status=true WHERE id=? AND user_id=?"
    db.query(sql,[orderId,userId],(err,result)=>{
        if(err){
            return res.status(500).json({status:false,message:err})
        }else{
            if(result){
                return res.status(200).json({status:true,message:"We feel great that you received your order"})
            }else{
                return res.status(200).json({status:true,message:"Sorry, Can't reach the Server at the moment"})
            }
            
        }
    }) 
})
module.exports = router