let express = require("express");
let app = express();
require("dotenv").config();
const bodyParser = require('body-parser');

//console.log("Hello World");

// //console.log("Hello World");
// app.get("/", (req, res) => {
//   res.send('Hello Express');
// });

app.use("/public", express.static(__dirname + "/public"));


app.use(bodyParser.urlencoded({extended: false}))

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let greeting = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    greeting = greeting.toUpperCase();
  }
  res.json({ message: greeting });
});

app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  function (req, res) {
    res.json({ time: req.time });
  }
);

app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

app.get("/name", (req, res) => {
  //?first=firstname&last=lastname
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
});


app.post("/name", (req, res) => {
  const { first, last } = req.body;
  res.json({ name: `${first} ${last}` });
});

module.exports = app;
