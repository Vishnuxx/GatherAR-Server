const UUID = require("uuid").v4;
const { createRoom, addToMyRooms } = require("../dbAPI/rooms");


module.exports.createRoomService = (socket , userSocket) => {
  userSocket.on("create-room",  (data) => {
    const { uid, roomname, username, peerid } = data;
    createRoom({
        uid: uid,
        roomname: roomname
    } , (roomid)=>{
        console.log('room-created')
        //room created
        addToMyRooms(
          uid,
          roomid,
          () => {
            console.log("added to my rooms");
            userSocket.emit("room-created", {
              roomid: roomid,
            });
          },
          (err) => {
            console.log("error adding to my rooms", err);
          }
        );
    } , (er)=>{
        console.log("error creating room", er);
    })
    //create and add the roomid to my rooms

   
    console.log(username, "created " + roomname);
    userSocket.name = username;
  });
};
