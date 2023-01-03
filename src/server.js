const env = require("dotenv").config();
const admin = require('./firebase');
var serviceAccount = require("../service_key.json");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();


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
