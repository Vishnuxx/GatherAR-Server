const users = {};

const User = {
  isUidExist: (uid) => {
    return users[uid] != undefined;
  },

  createUser: (uid, username, socketid, peerid) => {
    if (User.isUidExist(uid)) {
      User.updateUser(uid, username, socketid, peerid);
      return;
    }

    users[uid] = {
      username: username,
      socketId: socketid,
      myrooms: [],
      peerid: peerid,
    };
  },

  updateUser: (uid, username, socketId, peerid) => {
    
    users[uid]["username"] = username;
    users[uid]["socketId"] = socketId;
    users[uid]["peerid"] = peerid;
  },

  getUser : (uid) =>{
    return users[uid]
  },

  addToMyRooms: (uid, roomId) => {
    if (users[uid]["myrooms"].includes(roomId)) return;
    users[uid]["myrooms"].push(roomId);
  },

  removeFromMyRooms: (uid, roomId) => {
    users[id]["myrooms"].filter((id) => id != roomId);
  },

  deleteUser: (uid) => {
    delete users[uid];
  },

  showUsers: () => {
    console.log(users);
  },
};

module.exports.User = User;
