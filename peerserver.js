const { ExpressPeerServer } = require("peer");
const fs = require("fs");

const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);


module.exports.PeerServer = (server) => {
  //peerserver
  const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: "/myapp",
    generateClientId: customGenerationFunction,
   
  });

  peerServer.on("connection" , (conn)=>{
    console.log("new connection " + conn)
  })



  return peerServer;
}