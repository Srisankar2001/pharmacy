const express = require('express')
const db = require('../db/db')

const router = express.Router()


router.post("/add",(req,res)=>{
    const { userId , productId} = req.body

    const check = "SELECT * FROM cart WHERE userId = ? AND productId = ?"
    db.query(check,[userId,productId],(err,result)=>{
        if(err){
            return res.status(500).json({status:false,message:err})
        }else{
            if(result.length > 0){
                return res.status(200).json({status:true,message:"Item already added to cart"})
            }else{
                const sql = "INSERT INTO cart(userId,productId) VALUES(?,?)"
                db.query(sql,[userId,productId],(err,result)=>{
                    if(err){
                        return res.status(500).json({status:false,message:err})
                    }else{
                        if(result){
                            return res.status(200).json({status:true,message:"Added to the cart Successfully"})
                        }else{
                            return res.status(400).json({status:true,message:"Can't add to the cart at the moment"})
                        }
                    }
                })
            }
        }
    })
    
})

router.put("/update",(req,res)=>{
    const { userId , productId , quantity} = req.body

    const check = "SELECT * FROM cart WHERE userId = ? AND productId = ?"
    db.query(check,[userId,productId],(err,result)=>{
        if(err){
            return res.status(500).json({status:false,message:err})
        }else{
            if(result){
                const sql = "UPDATE cart SET quantity = ? WHERE userId = ? AND productId = ?"
                db.query(sql,[quantity,userId,productId],(err,result)=>{
                    if(err){
                        return res.status(500).json({status:false,message:err})
                    }else{
                        if(result){
                            return res.status(200).json({status:true,message:"Cart updated Successfully"})
                        }else{
                            return res.status(400).json({status:true,message:"Cart updated Fail"})
                        }
                    }
                })
            }else{
                return res.status(200).json({status:false,message:"Error in DB"})
            }
        }
    })
    
})



router.delete("/delete",(req,res)=>{
    const { userId , productId } = req.body
    const check = "SELECT * FROM cart WHERE userId = ? AND productId = ?"
    db.query(check,[userId,productId],(err,result)=>{
        if(err){
            return res.status(500).json({status:false,message:err})
        }else{
            if(result){
                const sql = "DELETE FROM cart WHERE userId = ? AND productId = ?"
                db.query(sql,[userId,productId],(err,result)=>{
                    if(err){
                        return res.status(500).json({status:false,message:err})
                    }else{
                        if(result){
                            return res.status(200).json({status:true,message:"Item deleted from the cart"})
                        }else{
                            return res.status(400).json({status:true,message:"Can't delete from the cart at the moment"})
                        }
                    }
                })
            }else{
                return res.status(200).json({status:false,message:"Error in DB"})
            }
        }
    })
})


router.post("/get",(req,res)=>{
    const { userId } = req.body
    const check = "SELECT * FROM cart WHERE userId = ?"
    db.query(check,[userId],(err,result)=>{
        if(err){
            return res.status(500).json({status:false,message:err})
        }else{
            return res.status(200).json({status:true,data:result})
        }
    })
    
})

module.exports = router