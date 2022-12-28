const express = require("express");
const { ExpressPeerServer } = require("peer");
const { PeerServer } = require("./peerserver");

const HOSTNAME = "localhost";
const PORT = 3006;

const app = express();



const server = app.listen(PORT, () => {
  console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});



const peerServer =  PeerServer(server)



app.use("/peerjs", peerServer);

app.get("/", (req, res, next) => res.send("Hello world!"));