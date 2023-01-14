module.exports.editorCommands = (socket , userSocket) => {

    userSocket.on("add-object" , (data)=>{
        const {uid ,name , position , type} = data
        console.log("added data: " , data)
        socket.sockets
          .in(userSocket.roomid)
          .emit("user-add-object", {
            uid: uid,
            name: name,
            position: position,
            type: type
          });
    });

    userSocket.on("remove-object", (data) => {
      const { uid } = data;
      console.log("added data: ", data);
      socket.sockets.in(userSocket.roomid).emit("user-remove-object", {
        uid: uid,
      });
    });

    userSocket.on("update-object-matrix", (data) => {
      const {uid   ,matrix} = data;
      socket.sockets.in(userSocket.roomid).emit("user-updated-object-matrix", {
        uid: uid,
        matrix: matrix
      });
     
    });
   

}