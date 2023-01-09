module.exports.avatarMovementService = (socket , userSocket) => {
    userSocket.on("my-avatar-transforms", (data) => {
        if (userSocket.roomid == null || userSocket.roomid == undefined) return;
        // console.log(data)
        const { position, rotation } = data;
        socket.sockets
                    .in(userSocket.roomid)
                    .except(userSocket.id)
                    .emit("avatar-transform-update", {
                        socketid: userSocket.id,
                        position: position,
                        rotation: rotation
                    });

       
    });
}