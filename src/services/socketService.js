const { Server } = require("socket.io");
const { avatarMovementService } = require("../socketServices/avatarMovementService");
const { createRoomService } = require("../socketServices/createRoomService");
const { editorCommands } = require("../socketServices/editorCommands");
const { joinRoomService } = require("../socketServices/joinRoomService");
const { leaveRoomService } = require("../socketServices/leaveRoomService");
const { storyBoardService } = require("../socketServices/storyBoardService");
const UUID = require("uuid").v4;

module.exports.socketServics = (httpServer, app) => {
  const io = new Server(httpServer, {
    path:'/socket.io/',
    cors: {
      origins: [process.env.CLIENT_URL],
    
    },
  });

  //when User is connected
  io.on("connection", (userSocket) => {
    console.log("new connection", userSocket.id);
 
    createRoomService(io , userSocket)
    joinRoomService(io , userSocket)
    leaveRoomService(io , userSocket)
    avatarMovementService(io , userSocket)
    editorCommands(io , userSocket)
   storyBoardService(io, userSocket);
  });
};
