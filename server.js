const express = require('express')
const app = express()
require("dotenv").config();
const port = process.env.PORT || 5001
const cors = require('cors');
const multer = require('multer');

app.use(express.urlencoded({ extended: false })); // To parse URL-encoded form data
app.use(express.json()); // To parse JSON data
// app.use(express.text());

const cookieParser = require('cookie-parser');

const routes = require('./Routes/routes');

const dbConnection = require('./database/connections/connrction');

//listen to your port
const portListener = () => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
        console.log(`Listening to frontend url on ${process.env.FRONTEND_URLS}`);
    })
}

//connect to mongoDb
dbConnection()
.then(() => {
    portListener();
})
.catch((err) => {
    console.log(err);
});



app.use(cors({
    origin: [process.env.FRONTEND_URLS],
    method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
}));

app.use(cookieParser());

app.use('/api/products', multer().none(), routes);
app.use('/api/auth', multer().none(), routes)
