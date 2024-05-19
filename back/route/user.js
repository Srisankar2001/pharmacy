const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../db/db')

const router = express.Router()

router.get("/get",(req,res)=>{
    const sql = "SELECT id,firstname,dob,email,is_active FROM user WHERE role = 'USER'"
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(400).json({status:false,message:err})
        }else{
            if(result){
                return res.status(200).json({status:true,data:result})
            }else{
                return res.status(500).json({status:false,message:"DB fetch error"})
            }
        }
    })
})

router.get("/get_block",(req,res)=>{
    const sql = "SELECT id,firstname,dob,email FROM user WHERE is_active = false AND  role = 'USER'"
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(400).json({status:false,message:err})
        }else{
            if(result.length > 0){
                return res.status(200).json({status:true,data:result})
            }else{
                return res.status(500).json({status:false,message:"No blocked users found"})
            }
        }
    })
})

router.get("/get_unblock",(req,res)=>{
    const sql = "SELECT id,firstname,dob,email FROM user WHERE is_active = true AND role = 'USER'"
    db.query(sql,(err,result)=>{
        if(err){
            return res.status(400).json({status:false,message:err})
        }else{
            if(result.length > 0){
                return res.status(200).json({status:true,data:result})
            }else{
                return res.status(500).json({status:false,message:"No unblocked users found"})
            }
        }
    })
})

router.post("/block",(req,res)=>{
    const { id } = req.body
    const check = "SELECT * FROM user WHERE id = ? AND role ='USER'"
    db.query(check,[id],(err,result)=>{
        if(err){
            return res.status(400).json({status:false,message:err})
        }else{
            if(result.length > 0){
                const sql = "UPDATE user SET is_active = false WHERE id = ?"
                db.query(sql,[id],(err,result)=>{
                    if(err){
                        return res.status(400).json({status:false,message:err})
                    }else{
                        if(result){
                            return res.status(200).json({status:true,message:"Blocked Successfully"})
                        }else{
                            return res.status(500).json({status:false,message:"DB fetch error"})
                        }
                    }
                })
            }else{
                return res.status(500).json({status:false,message:"User not found"})
            }
        }
    })
})

router.post("/unblock",(req,res)=>{
    const { id } = req.body
    const check = "SELECT * FROM user WHERE id = ? AND role = 'USER'"
    db.query(check,[id],(err,result)=>{
        if(err){
            return res.status(400).json({status:false,message:err})
        }else{
            if(result.length > 0){
                const sql = "UPDATE user SET is_active = true WHERE id = ?"
                db.query(sql,[id],(err,result)=>{
                    if(err){
                        return res.status(400).json({status:false,message:err})
                    }else{
                        if(result){
                            return res.status(200).json({status:true,message:"Unblocked Successfully"})
                        }else{
                            return res.status(500).json({status:false,message:"DB fetch error"})
                        }
                    }
                })
            }else{
                return res.status(500).json({status:false,message:"User not found"})
            }
        }
    })
})

router.post("/register",(req,res)=>{
    const { firstname , lastname , email , password ,dob } = req.body
    bcrypt.hash(password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({status:false,message:"Error in hashing password"})
        }else{
            const sql = "INSERT INTO user(firstname,lastname,dob,email,password,role,created_at) VALUES(?,?,?,?,?,?,?)"
            const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
            db.query(sql,[firstname,lastname,dob,email,hash,"USER",currentDateTime],(err,result)=>{
                if(err){
                    return res.status(400).json({status:false,message:err})
                }else{
                    if(result){
                        return res.status(200).json({status:true,message:"Added Successfully"})
                    }else{
                        return res.status(500).json({status:false,message:"DB insert error"})
                    }
                }
            })
        }
    })
})

module.exports = router