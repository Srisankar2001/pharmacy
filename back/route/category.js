const express = require('express')
const db = require('../db/db')

const router = express.Router()

router.get("/get",(req,res)=>{
    const sql = "SELECT * FROM category"
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(500).json({status:false,message:err})
        }else{
            if(result){
                return res.status(200).json({status:true,data:result})
            }else{
                return res.status(400).json({status:false,message:"DB get error"})
            }
        }
    })
})

router.post("/add",(req,res)=>{
    const { name } = req.body

    const sql = "INSERT INTO category(name) VALUES(?)"
    db.query(sql,[name],(err,result)=>{
        if(err){
            return res.status(500).json({status:false,message:err})
        }else{
            if(result){
                return res.status(200).json({status:true,message:"Added Successfully"})
            }else{
                return res.status(400).json({status:false,message:"DB insert error"})
            }
        }
    })
})

router.put("/update",(req,res)=>{
    const { id , name } = req.body

    const sql = "UPDATE user SET name = ? WHERE id = ?"
    db.query(sql,[name,id],(err,result)=>{
        if(err){
            return res.status(500).json({status:false,message:err})
        }else{
            if(result){
                return res.status(200).json({status:true,message:"Updated Successfully"})
            }else{
                return res.status(400).json({status:false,message:"DB update error"})
            }
        }
    })
})

router.delete("/delete",(req,res)=>{
    const { id } = req.body
    const sql = "DELETE FROM category WHERE id = ?"
    db.query(sql,[id],(err,result)=>{
        if(err){
            return res.status(500).json({status:false,message:err})
        }else{
            if(result){
                return res.status(200).json({status:true,message:"Deleted Successfully"})
            }else{
                return res.status(400).json({status:false,message:"DB delete error"})
            }
        }
    })
})

module.exports = router