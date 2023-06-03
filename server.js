const express = require('express')
const app = express()
require("dotenv").config();
const port = process.env.PORT || 3001

const productRoutes = require('./Routes/routes');
//use json middleware
app.use(express.json());
const dbConnection = require('./database/connections/connrction');
app.use('/api/products', productRoutes);

//listen to your port
const portListener = () => {
    app.listen(port, () => {
        console.log(`Server started on port ${port}`);
    })
}

//connect to mongoDb
dbConnection()
.then(() => {
    portListener();
})
.catch((err) => {
    console.log(err);
})