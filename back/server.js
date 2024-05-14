const express = require('express')
const crypto = require('crypto')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const db = require('./db/db')

const userRouter = require('./route/user')
const adminRouter = require('./route/admin')
const categoryRouter = require('./route/category')
const productRouter = require('./route/product')

const app = express()


app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/user",userRouter)
app.use("/admin",adminRouter)
app.use("/category",categoryRouter)
app.use("/product",productRouter)


db.connect((err)=>{
    if(err){
        console.log("DB connection Fail")
    }else{
        console.log("DB connection Success")
        app.listen(3001,()=>{
            console.log("Server Stared")
        })
    }
})