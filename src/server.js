const env = require("dotenv").config();
const admin = require('./firebase');
var serviceAccount = require("../service_key.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const os = require("os");

const http = require("http");
const server = http.createServer(app);

const { socketServics } = require("./services/socketService");

const PORT = process.env.SERVER_PORT;



app.use(bodyParser.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods:["POST" , "GET"]
  })
);

app.use((req, res, next) => {
  console.log(req.url)
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  // res.header("Content-Security-Policy-Report-Only", "default-src")
  next()
});



const {
  userProfileService,
} = require("./services/userProfileService");
const { hostname } = require("os");

app.get("/", (req, res) => {
  res.send("hii");
});

socketServics(server, app);
userProfileService(app);



server.listen(PORT, () => {
  console.log("listening on " , PORT );
});
