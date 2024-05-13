const express = require('express')
const db = require('./db/db')

const app = express()

//Middle
app.use(express.json())


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