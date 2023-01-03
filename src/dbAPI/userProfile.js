const firebase = require("firebase-admin");

const db = firebase.database();

const PATHS = {
  userprofiles: "/userprofiles/",
};

module.exports = {
  createUserProfile: (reqbody, onSuccess, error) => {
    const { username, email, uid } = reqbody;
    const data = {
      username: username,
      email: email,
      rooms: {},
    };

    db.ref(PATHS.userprofiles + uid)
      .set(data, (snap) => {
        onSuccess(snap);
      })
      .catch((err) => {
        error(err);
        console.log(err);
      });
  },

  addToMyRoom: (uid , roomId, onSuccess, onError) => {
    
    const keyRef = db
      .ref(PATHS.userprofiles + uid)
      .push().key;

    db.ref(PATHS.userprofiles + uid +"/rooms/" + keyRef)
      .set(roomId , (snap) => {
        console.log('added to my')
        onSuccess();
      })
      .catch(() => {
        onError(error);
      });
  },
};
