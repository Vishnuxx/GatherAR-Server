
const { joinMember, roomExists, getRoomDetails, leaveMember } = require("../dbAPI/rooms");

module.exports.leaveRoomService =  (socket, userSocket) => {


    //when user leaves the room 

     userSocket.on("disconnect", (user) => {
       
        if (userSocket.roomid != undefined) {
          leaveMember(
            {
              roomid: userSocket.roomid,
              usersocketid: userSocket.id,
            },
            (success) => {
              socket.sockets
                .in(userSocket.roomid)
                .except(userSocket.id)
                .emit("user-left-room", {
                  socketid: userSocket.id,
                });

              console.log("broadcasted-user-left-to-others");
            },
            (err) => {
              console.log(
                "ERROR-user-leave",
                "socketid : ",
                userSocket.id,
                " username: ",
                userSocket.username  , err
              );
            }
          );
        } 

        console.log("disconnection for socket : " , userSocket.id )
        
  
      
     });

}