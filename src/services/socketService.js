const { Server } = require("socket.io");
const { Rooms } = require("../dbAPI/roomsApi");
const { User, isUidExist } = require("../dbAPI/userApi");
const { createRoomService } = require("../socketServices/createRoomService");
const { joinRoomService } = require("../socketServices/joinRoomService");
const UUID = require("uuid").v4;

module.exports.socketServics = (httpServer, app) => {
  const io = new Server(httpServer, {
    cors: {
      origins: ["*"],
      // handlePreflightRequest: (req, res) => {
      //   res.writeHead(200, {
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Alow-Methods": ["GET", "POST"],
      //     "Access-Control-Alow-Headers": "*",
      //     "Access-Control-Alow-Credentials": true,
      //   });
      //   res.end();
      // },
    },
  });

  //when User is connected
  io.on("connection", (userSocket) => {
    console.log("new connection", userSocket.id);

    // userSocket.on("create-room", (data) => {
    //   const { uid, roomname, username, peerid } = data;
    //   const roomId = UUID();
      
    //   //create/update user , create room , addroom to my rooms 
    //   User.createUser(uid, username, userSocket.id, peerid);
    //   Rooms.createRoom(roomId, roomname, username);
    //   User.addToMyRooms(uid, roomId);
      
    //   userSocket.emit("room-created", {
    //     roomid: roomId,
    //   });
    //   console.log(username , "created " + roomname );
    //   userSocket.name = username
    // });

    createRoomService(io , userSocket)
    joinRoomService(io , userSocket)
    // userSocket.on("join-room", (data) => {
    //   const { uid, roomid, username, peerid } = data;

    //   if (Rooms.roomIdExisits(roomid)) {
    //     Rooms.joinRoom(roomid, username, uid);
    //     userSocket.join(roomid);
    //     const { roomname, admin, participants } = Rooms.getRoomDetails(roomid);
    //     userSocket.emit("joined-room", {
    //       roomname: roomname,
    //       roomadmin: admin,
    //       participants: participants,
    //       peerid: peerid
    //     });
    //     console.log( username , " joined room ", roomname);
    //     io.sockets.in(roomid).except(userSocket.id).emit("user-joined-room", {
    //       username: username,
    //       userid: uid,
    //       peerid: peerid
    //     });

       
    //   } else {
    //     userSocket.emit("room-not-exist");
    //   }
    // });

    userSocket.on("disconnect", () => {
      console.log(userSocket.name + " is disconnected");
    });
  });
};
