const user = require("../dbAPI/userProfile");
const rooms = require("../dbAPI/rooms");

const bodyParser = require("body-parser");

const EVENTS = {
  createProfile: "/createprofile",
  createroom: "/createroom",
};

module.exports.userProfileService = (app) => {
  
  app.post(EVENTS.createProfile, (req, res) => {
    user.createUserProfile(
      req.body,
      (snap) => {
        console.log("user added ");
        res.json(
          JSON.stringify({
            status: "OK",
            message: "created",
          })
        );
      },
      (err) => {
        res.json(
          JSON.stringify({
            status: "ERROR",
            message: err.toString(),
          })
        );
      }
    );
  });

   app.post(EVENTS.createroom, (req, res) => {
     const { uid, roomname } = req.body;
     console.log(req.body);
     rooms.createRoom(
       req.body,
       (roomId) => {
         console.log("cretaed in rooms " + roomId);
         user.addToMyRoom(uid,
           roomId,
           () => {
             console.log("cretaed in room ");
             res.json(
               JSON.stringify({
                 status: "OK",
                 roomId: roomId,
               })
             );
           },
           (err) => {
             res.json(
               JSON.stringify({
                 status: "ERROR",
                 message: err.toString(),
               })
             );
           }
         );
       },
       (err) => {
         res.json(
           JSON.stringify({
             status: "ERROR",
             message: err.toString(),
           })
         );
       }
     );
   });
};
