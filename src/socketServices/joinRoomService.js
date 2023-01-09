const { joinMember, roomExists, getRoomDetails } = require("../dbAPI/rooms");


const isValidRoomId = (roomid) =>{
    const regex = /^[^.#\$\[\]]+$/
    return regex.test(roomid.toString().toLowerCase());
} ;

module.exports.joinRoomService =  (socket, userSocket) => {
  userSocket.on("join-room", async (data) => {
    const { socketid, roomid, username, peerid } = data;

    //make sure the id does not contain certain symbols
    if (!isValidRoomId(roomid)) {
         userSocket.emit("invalid-roomid");
         console.log('invalid-id')
         return;
    }
      roomExists(
        roomid,
        () => {
          console.log("room-exists");

          getRoomDetails(
            roomid,
            (roomdtls) => {
      
              const memberdetails = {
                roomid: roomid,
                membername: username,
                usersocketid: userSocket.id,
                userpeerid: peerid,
              };

              joinMember(
                memberdetails,
                (s) => {
                  userSocket.join(roomid);

                  userSocket.roomid = roomid;

                  userSocket.emit("joined-room", {
                    roomname: roomdtls.roomname,
                    roomadmin: roomdtls.admins,
                    participants:
                      roomdtls.members != undefined ? roomdtls.members : {},
                    peerid: peerid,
                  });

                  console.log("host-joined");

                  socket.sockets
                    .in(roomid)
                    .except(userSocket.id)
                    .emit("user-joined-room", {
                      username: username,
                      socketid: socketid,
                      peerid: peerid,
                    });

                  console.log("broadcasted-user-join-to-others");
                },
                (e) => {
                  console.log("error-joining", e);
                }
              );
            },
            (err) => {
              console.log("error-getting-room-info", err);
            }
          );
        },
        (err) => {
          console.log("room-doesnt-exists");
          userSocket.emit("room-not-exist");
        }
      ); 
      
      

      

  });
};
