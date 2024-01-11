//load env variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

//importing dependencies
const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require("./config/connectToDb.js");
const todoRoute = require("./routes/todoRoute.js");
const userRoute = require("./routes/userRoute.js");
const mongoose = require("mongoose");
const requireAuth = require("./middleware/requireAuth.js");

//create an express app
const app = express();

//configure express app 
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}));

//connect to db
connectToDb();

//initialise middleware 
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

///setting up port
const PORT = process.env.PORT || 3000;

//routing
// app.use('/user', userRoute);
// app.use(requireAuth);
app.use('/todos', todoRoute);

//start the server
app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});