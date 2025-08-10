const express = require('express');
const port = 3000;
const app = express();
const mongoose = require('mongoose')
const rootRouter = require('./routes/userRoutes');
const dotenv = require('dotenv')
const cors = require("cors")
const path = require("path");

app.use(cors());
dotenv.config();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use("/api/v1/user", rootRouter);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("connected to mongodb")
})
.catch((err)=>{
    console.error('Mongodb connection error:',err)
})





//  const express = require('express')
// const port = 3000 ;

// const app = express();
// app.get('/',(req,res)=>{
//     res.json({
//         message: "HEllo world"
//     })
// })


// app.listen(port);