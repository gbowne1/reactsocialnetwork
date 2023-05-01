require("dotenv").config();
const express = require("express");

//SetUp the server
const app = express();

//Set up the port number procces.env.PORT will use the hosted port else it wil use port 3000
const port = process.env.PORT || 3000;

//Database setUp gos here

//Start the Server
app.listen(port, console.log(`Up and running on port ${port}`));
