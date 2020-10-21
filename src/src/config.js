export const firebase = {
  apiKey: "AIzaSyBQ1olf124Vp4ylrrc3eZCvfQUoc2oNBBM",
  authDomain: "live-support-bot.firebaseapp.com",
  databaseURL: "https://live-support-bot.firebaseio.com",
  projectId: "live-support-bot",
  storageBucket: "live-support-bot.appspot.com",
  messagingSenderId: "1074224122035",
  appId: "1:1074224122035:web:0040c4ea47b4d5d710c8c6",
}

export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Store in Firestore instead of Real Time DB
  enableLogging: false
}

export default { firebase, rrfConfig }
