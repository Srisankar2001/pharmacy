const express = require('express')
const multer = require('multer')
const path = require('path')
const db = require('../db/db')

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req,file, cb) => {
        cb(null,'public/images')
    },
    filename: (req,file,cb) => {
        cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
    }
})

const upload = multer({
    storage : storage
})


router.post("/add",upload.single('image'),(req,res)=>{
    const { adminId ,  name , quantity , category , description , manufactured_date , expiry_date , buying_price , selling_price , stock , company } = req.body
    const { image } = req.file.filename

    const sql = "INSERT INTO product( name , category , quantity , description ,manufactured_date , expiry_date , buying_price , selling_price , stock , company , added_at , added_by , url) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)"
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
    db.query(sql,[name,category,quantity,description,manufactured_date,expiry_date,buying_price,selling_price,stock,company,currentDateTime,adminId,image],(err,result)=>{
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

router.put("/update", upload.single('image'), (req, res) => {
    const { id , adminId, name, quantity, category, description, manufactured_date, expiry_date, buying_price, selling_price, stock, company } = req.body
    let image = req.body.image
    if (req.file) {
        image = req.file.filename
    }

    const sql = "UPDATE product SET name = ?, category = ?, quantity = ?, description = ?, manufactured_date = ?, expiry_date = ?, buying_price = ?, selling_price = ?, stock = ?, company = ?, updated_at = ?, updated_by = ?, url = ? WHERE id = ?";
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const params = [name, category, quantity, description, manufactured_date, expiry_date, buying_price, selling_price, stock, company, currentDateTime, adminId, image , id];

    db.query(sql, params, (err, result) => {
        if (err) {
            return res.status(500).json({ status: false, message: err });
        } else {
            if (result) {
                return res.status(200).json({ status: true, message: "Added Successfully" });
            } else {
                return res.status(400).json({ status: false, message: "DB update error" });
            }
        }
    });
});

router.delete("/delete",(req,res)=>{
    const { id } = req.body
    
    const sql = "DELETE FROM product WHERE id = ?"
    db.query(sql,[id],(err,result)=>{
        if (err) {
            return res.status(500).json({ status: false, message: err });
        } else {
            if (result) {
                return res.status(200).json({ status: true, message: "Deleted Successfully" });
            } else {
                return res.status(400).json({ status: false, message: "DB delete error" });
            }
        }
    })
})

module.exports = router