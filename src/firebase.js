const firebase = require("firebase-admin");

const credentials = require("../service_key.json");

// //firebase
firebase.initializeApp({
  credential: firebase.credential.cert(credentials),
  databaseURL: process.env.FIREBASE_DB_URL,
});

module.exports = firebase;
