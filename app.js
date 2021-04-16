const express = require("express");
const app = express();
const cors = require("cors");

require('dotenv').config();


app.use(express.urlencoded({extended: false }));
app.use(express.json());

app.use(cors());

require('./server/routes')(app);

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome',
}));
console.log("APP RUNNING");
module.exports = app;
