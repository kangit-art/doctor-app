
const  express=require('express');
const connection=require("./src/core/adapter/config/server");
const UserRouter = require('./src/core/application/routes/user-route');
const AppointmentRouter = require('./src/core/application/routes/appointment-route');
require("dotenv").config()
const app=express();
const cors=require('cors')
app.use(cors())
app.use(express.json())
app.get("/",(req,res)=>{    
    res.send("demo project")
})

app.use("/user",UserRouter);
app.use("/appointment",AppointmentRouter);

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("connected to database")
    } catch (error) {
        console.log("unable to connect to database")
    }
    console.log(`server is running on port ${process.env.PORT}`)
})
