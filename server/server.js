const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const cors=require('cors');
const connectDb = require("./database/dbConnection");
const dotenv=require("dotenv").config();
connectDb();
const app=express();
app.use(cors());
const port=8080;

app.use(express.json());
app.use("/api/users",require("./routes/userRouter"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server is running in ${port}`);
})