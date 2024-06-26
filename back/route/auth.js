const express = require('express')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const db = require('../db/db')
const jwt = require('jsonwebtoken')
const { isAuthenticated , isAdmin , decode ,isUser } = require('../functions/authFunctions')

const router = express.Router()
dotenv.config()
const key = process.env.key

router.post("/signin",(req,res)=>{
    const { email , password } = req.body
    const sql = "SELECT * FROM user WHERE email = ?"
    db.query(sql,[email],(err,result)=>{
        if(err){
            return res.status(400).json({status:false,message:err})
        }else{
            if(result.length !== 0){
                bcrypt.compare(password,result[0].password,(err,response)=>{
                    if(err){
                        return res.status(200).json({status:false,message:"Decryption Error in Server"})
                    }else{
                        if(response){
                            jwt.sign({id:result[0].id,role:result[0].role},key,{expiresIn:'1d'},(err,token)=>{
                                if(err){
                                    return res.status(200).json({status:false,message:"Token generate error in Server"})
                                }else{
                                    if(token){
                                        res.cookie('token',token,{maxAge:60*60*24*1000})
                                        return res.status(200).json({status:true,message:result[0]})
                                    }else{
                                        return res.status(200).json({status:false,message:"Token generate error in Server"})
                                    }
                                }
                            })
                        }else{
                            return res.status(200).json({status:false,message:"Password is wrong"})
                        }
                    }
                })
            }else{
                return res.status(200).json({status:false,message:"Email not registerd"})
            }
        }
    })
})

router.get("/isAuthendicated",isAuthenticated,(req,res)=>{
    return res.status(200).json({ status: true});
})

router.get("/isAdmin",isAdmin,(req,res)=>{
    return res.status(200).json({status:true});
})

router.get("/isUser",isUser,(req,res)=>{
    return res.status(200).json({status:true});
})

router.get("/details",decode,(req,res)=>{
    return res.status(200).json({status:true,data:req.decoded})
})

router.get("/logout", (req, res) => {
    res.clearCookie('token');
    res.status(200).send("Logged out successfully.");
});

module.exports = router