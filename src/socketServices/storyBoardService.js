module.exports.storyBoardService = (socket, userSocket) => {
  userSocket.on("storyboard-text-change", (data) => {
    const { uuid, text } = data;
    socket.sockets
      .in(userSocket.roomid)
      .except(userSocket.id)
      .emit("user-storyboard-text-changed", {
        uuid: uuid,
        text: text,
      });
  });
};
