const firebase = require("firebase-admin");

const db = firebase.database();

const PATHS = {
  profiles: "/userprofiles/",
  rooms: "/rooms/",
};

module.exports = {
  createRoom: (reqbody, onSuccess, onError) => {
    const { uid, roomname } = reqbody;
    console.log({ uid: uid, roomname: roomname });
    const roomid = db.ref(PATHS.rooms).push().key;
    db.ref(PATHS.rooms + roomid)
      .set({
        roomname: roomname,
        admins: uid,
        members: [],
      })
      .then(() => {
        onSuccess(roomid);
      })
      .catch((error) => {
        console.log(error);
        onError(error);
      });
  },

  roomExists: (roomid , onSuccess , onError) => {
    
    db.ref(PATHS.rooms+roomid)
      .get().then((snap)=>{
        if (snap.exists()){
           onSuccess(snap);
        } else {
          onError()
        }
      }).catch((errr)=>{
        onError()
      })
  },

  getRoomDetails: (roomid , onSuccess , onError)=>{
    db.ref(PATHS.rooms)
      .child(roomid)
      .get().then((snap)=>{
        onSuccess(snap.val())
      }).catch((err)=>{
        onError(err)
      })
  },

  addToMyRooms: (uid, roomid, onSuccess, onError) => {
    db.ref(PATHS.profiles + uid + "/myrooms/" + roomid)
      .set(roomid)
      .then(onSuccess)
      .catch(onError);
  },

  joinMember: (data, onSuccess, onError) => {
    const { roomid, membername, usersocketid, userpeerid } = data;
    db.ref(PATHS.rooms + roomid + "/members/" + usersocketid)
      .set({
        socketid: usersocketid,
        peerid: userpeerid,
        username: membername,
      })
      .then(onSuccess)
      .catch(onError);
  },

  leaveMember: (data, onSuccess, onError) => {
    const { roomid, usersocketid } = data;
    db.ref(PATHS.rooms + roomid + "/members/" + usersocketid)
      .remove()
      .then(onSuccess)
      .catch(onError);
  },

  deleteRoom: async (roomid, uid, onSuccess, onError) => {
    try {
      await db.ref(PATHS.rooms + roomid).remove();
      await db.ref(PATHS.userprofiles + uid + "/myrooms/" + roomid);
      onSuccess();
    } catch (error) {
      onError(error);
    }
  },
};
