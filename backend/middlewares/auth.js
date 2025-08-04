const jwt = require('jsonwebtoken')
const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const middlerouter = express.Router()

middlerouter.use( (req,res,next)=>{
    const token = req.headers.authorization.split(' ')[1]
    if(!token){
        return res.json({
            message:"Acess denied"
        })
    }
    try{const isvalid = jwt.verify(token , process.env.JWT_SECRET)
        req.userId = isvalid;
        
        next();
    }catch(err){
        console.log(err)
        res.json({
            message:"Inavlid token"
        })
    }
})



module.exports = middlerouter