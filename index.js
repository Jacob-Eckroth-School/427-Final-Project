

const express = require("express");
const axios = require('axios')
const app = express(); // create express app


app.use(express.static("build"));
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded()); //Parse URL-encoded bodies

app.get("/", (req, res) => {
  res.send("This is from express.js");
});



// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});