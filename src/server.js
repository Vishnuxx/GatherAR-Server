const env = require("dotenv").config();
const admin = require('./firebase');
var serviceAccount = require("../service_key.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const fs = require("fs");




// const options = {
//   key: fs.readFileSync(__dirname + "/../certs/private.key"),
//   cert: fs.readFileSync(__dirname + "/../certs/certificate.crt"),
// };

// const http = require("https");
// const server = http.createServer(options , app);


const http = require("http");
const server = http.createServer(app);



const { socketServics } = require("./services/socketService");
const {userProfileService} = require("./services/userProfileService");

const port = process.env.PORT;

app.use(bodyParser.json());

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));


app.get("/", (req, res) => {
  res.send("hii");
});

socketServics(server, app);
userProfileService(app);


server.listen(port, () => {
  console.log("listening on ", port);
});
