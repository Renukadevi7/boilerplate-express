let express = require("express");
let app = express();
let logger =('/logger.js');
require("dotenv").config();

//console.log("Hello World");

// //console.log("Hello World");
// app.get("/", (req, res) => {
//   res.send('Hello Express');
// });

app.use("/public", express.static(__dirname + "/public"));
app.use( (req, res, next ) =>{
 console.log(req.method + " " + req.path + " " + req.ip);
 next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
 
  let greeting = 'Hello json';

  if (process.env.MESSAGE_STYLE === 'uppercase') {
    greeting = greeting.toUpperCase();
  }
  res.json({ message : greeting });
});


module.exports = app;


