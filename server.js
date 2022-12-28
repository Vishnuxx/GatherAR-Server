const express = require("express");
const { ExpressPeerServer } = require("peer");
const { PeerServer } = require("./peerserver");
const os = require("os");



const HOSTNAME = os.hostname();
const PORT = 3000;

const app = express();



const server = app.listen(PORT, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});



const peerServer =  PeerServer(server)



app.use("/peerjs", peerServer);

app.get("/", (req, res, next) => res.send("Hello world!"));