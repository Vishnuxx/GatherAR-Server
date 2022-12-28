const express = require("express");
const { ExpressPeerServer } = require("peer");
const { PeerServer } = require("./peerserver");
const os = require("os");



const HOSTNAME = process.env.h;
const PORT = process.env.PORT || 3000;

const app = express();



const server = app.listen(null, () => {
  console.log(`Server running at ${PORT}`);
});



const peerServer =  PeerServer(server)



app.use("/peerjs", peerServer);

app.get("/", (req, res, next) => res.send("Hello world!"));






