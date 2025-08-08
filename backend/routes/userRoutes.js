const express = require ('express')
const {schema,loginschema} = require ('../inputvalidation')
const userRouter = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const jwt = require('jsonwebtoken');
const middlerouter = require('../middlewares/auth');
const upload = require('../middlewares/Image');


const dataSets = {
  daily: [
    { label: '2025-08-01', value: 500 },
    { label: '2025-08-02', value: 510 },
    { label: '2025-08-03', value: 490 },
    { label: '2025-08-04', value: 530 },
    { label: '2025-08-05', value: 550 },
    { label: '2025-08-06', value: 565 },
    { label: '2025-08-07', value: 580 }
  ],
  weekly: [
    { label: 'Week 1', value: 3000 },
    { label: 'Week 2', value: 3250 },
    { label: 'Week 3', value: 3150 },
    { label: 'Week 4', value: 3400 }
  ],
  monthly: [
    { label: 'Jan', value: 120000 },
    { label: 'Feb', value: 125000 },
    { label: 'Mar', value: 131000 },
    { label: 'Apr', value: 129000 },
    { label: 'May', value: 135500 },
    { label: 'Jun', value: 138000 },
    { label: 'Jul', value: 142000 }
  ],
  quarterly: [
    { label: 'Q1', value: 376000 },
    { label: 'Q2', value: 392000 },
    { label: 'Q3', value: 415000 },
    { label: 'Q4', value: 430000 }
  ],
  yearly: [
    { label: '2020', value: 1050000 },
    { label: '2021', value: 1125000 },
    { label: '2022', value: 1180000 },
    { label: '2023', value: 1265000 },
    { label: '2024', value: 1350000 }
  ]
};

// Endpoint to fetch graph data
userRouter.get('/endpoint', (req, res) => {
  const { tenure } = req.query;

  if (!tenure || !dataSets[tenure]) {
    return res.status(400).json({ error: 'Invalid or missing tenure' });
  }

  return res.json(dataSets[tenure]);
});



// endpoint to signup
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


// endpoint to signin
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



// endpoint to dashboard (needs authenticatiom)
 userRouter.get('/dashboard', middlerouter , async (req,res)=>{
         const userid = req.userId;
        const userdetails = await User.find({_id:userid.id})
            res.json({
               userdetails
            })
        })

module.exports = userRouter;








