require('dotenv').config()


// console.log(     
//     process.env.GOOGLE_APPLICATION_CREDENTIALS
// ) podria ser util para ver que onda


const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getAuth } = require('@firebase/auth')
const { getFirestore } = require("firebase-admin/firestore");

initializeApp({
    credential: applicationDefault(),
});

const db = getFirestore();

module.exports = {
    db,
};