const express = require('express');
const {schema,loginschema} = require ('../inputvalidation')
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const middlerouter = require('../middlewares/auth');
const upload = require('../middlewares/Image');













userRouter.post("/signup",  upload.single('profileImage'),async (req, res) => {
        
    const { error } = schema.validate(req.body)
        if(error) {
             return res.status(400).json({ message: error.details[0].message });
        }

      const { firstname, lastname, email, password, phone , dateofbirth } = req.body ;
      const profileImage = req.file?.filename ;
      console.log(profileImage)
      
     try{const existing = await User.findOne({ email});
    if (existing) return res.status(400).json({ message: 'Email already exists' });

     const hashedPassword = await bcrypt.hash(password, 10);
     const user = new User({ firstname, lastname, email, password: hashedPassword, phone, dateofbirth, profileImage });
     await user.save();
     
     const token = jwt.sign({ id: user._id  }, process.env.JWT_SECRET);
        res.json({
           message:"successfully Signedup", token
        })
    
    } catch(err){
        console.log(err);
        res.status(500).json({
            message:"Error while signing up"
        })
     }
      
});

userRouter.post("/login",async (req,res)=>{
   const { error } = loginschema.validate(req.body)
        if(error) {
             return res.status(400).json({ message: error.details[0].message });
        }
        const {email,password} = req.body;
        
        try{const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"User not found"
            })
        }
    const isvalid = await bcrypt.compare(password, user.password);
    if (!isvalid){
        return res.status(400).json({ 
            message: "Invalid password" 
        })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
           message:"successfully loggedin", token
        })
    }catch(err){
        console.log(err);
        res.json({
            message:"Error while logging in"
        })
    }
}) 


 userRouter.get('/dashboard', middlerouter , async (req,res)=>{
         const userid = req.userId;
        const userdetails = await User.findOne({_id:userid.id})
            res.json({
               userdetails
            })
        })

module.exports = userRouter;








