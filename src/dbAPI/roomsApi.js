const rooms = {};

module.exports.Rooms =  {

  roomIdExisits : (roomid) => {
    return rooms[roomid] != undefined;
  },

  roomNameExists : (roomname) => {
    Object.keys(rooms).map((roomid) => {
      if (rooms[roomid].roomname === roomname) {
        return true;
      }
    });
    return false;
  },

  createRoom : (roomId, roomname, uid, ispublic) => {
    rooms[roomId] = {
      roomname: roomname,
      admin: uid,
      participants: [],
      isPublic: ispublic,
    };
  },

  getRoomDetails : (roomid) =>{
    return {
      roomname: rooms[roomid].roomname,
      admin: rooms[roomid].admin,
      participants: rooms[roomid].participants
    };
  },

  getParticipants : (roomid) => {
    return rooms[roomid].participants
  },

  setPrivateRoom : (roomid) => {
    rooms[roomid]["isPublic"] = fale;
  },

  joinRoom : (roomId, membername , memberid) => {

        rooms[roomId].participants.push({
          membername: membername,
          memberid: memberid,
        });
  },

  leaveRoom : (roomId, memberid) => {
    
        rooms[roomId]["participants"].filter((id) => id != memberid);
     
  },

  listPublicRooms : () => {
    return Object.keys(rooms).filter(
      (roomid) => rooms[roomid].isPublic == true
    );
  },

  listMyRooms : (uid) => {
    return Object.keys(rooms).filter(
      (roomid) => rooms[roomid].admin === uid
    );
  },

  deleteRoom : (roomId) => {
  
        delete rooms[roomId];
        return;
 
  },

  deleteRooms : (roomsarray) => {
    roomsarray.map((roomId) => {
      this.deleteRoom(roomId);
    });
  },

  showRooms : () => {
    console.log(rooms);
  },
};
