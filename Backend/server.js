const express = require("express");
const colors= require("colors");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();
const {errorHandler} = require("./Middleware/errorMiddleware");
const {connectDatabase} = require("./config/db");


connectDatabase();

app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use("/api/goals",require("./Routes/goalRoutes"));
app.use("/api/users",require("./Routes/userRoutes"));


app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server started on ${port}`);
})
