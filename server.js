const express = require("express");
const { ExpressPeerServer } = require("peer");
const { PeerServer } = require("./peerserver");
const os = require("os");



const HOSTNAME = "signaling-server-aw3i.onrender.com";
const PORT = 443;

const app = express();



const server = app.listen(PORT, () => {
  console.log(`Server running at https://${HOSTNAME}:${PORT}/peerjs/myapp`);
});



const peerServer =  PeerServer(server)



app.use("/peerjs", peerServer);

app.get("/", (req, res, next) => res.send("Hello world!"));






