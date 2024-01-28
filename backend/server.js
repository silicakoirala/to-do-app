//load env variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

//importing dependencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express(); //create an express app
const cookieParser = require('cookie-parser');
const connectToDb = require("./config/connectToDb.js");
const todoRoute = require("./routes/todoRoute.js");
const authRoute = require("./routes/authRoute.js");
const authMiddleware = require("./middleware/authMiddleWare.js");

app.use(
    cors({
        origin: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);


//initialise middleware 
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

///setting up port
const PORT = process.env.PORT || 3000;

/* The cookie-parser manages cookie-based sessions or extracts 
data from cookies. It's added to the code above along with the
 authRoute that the application will utilize.*/
app.use(cookieParser());

//configure express app 
app.use(express.json());

//routing
app.use('/api/v1/auth', authRoute);
app.use(authMiddleware);
app.use('/api/v1/todos', todoRoute);

//connect to db
connectToDb();

//start the server
app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${PORT}`);
});




