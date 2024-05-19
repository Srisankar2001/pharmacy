const express = require('express')
const bcrypt = require('bcrypt')
const db = require('../db/db')

const router = express.Router()

router.post("/details",(req,res)=>{
    const { id } = req.body
    const sql = "SELECT * FROM user WHERE id = ? AND role = 'ADMIN'"
    db.query(sql,[id],(err,result)=>{
        if(err){
            return res.status(400).json({status:false,message:err})
        }else{
            if(result){
                const data = {
                    firstname : result[0]['firstname'],
                    lastname : result[0]['lastname'],
                    email : result[0]['email']
                }
                return res.status(200).json({status:true,data:data})
            }else{
                return res.status(500).json({status:false,message:"No admin found"})
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
            db.query(sql,[firstname,lastname,dob,email,hash,"ADMIN",currentDateTime],(err,result)=>{
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