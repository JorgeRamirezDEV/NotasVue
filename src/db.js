import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth';

var firebaseConfig = {
    apiKey: "AIzaSyBkLki7xwFJKhCZVtIIwNCWmwvSQzkgb2Y",
    authDomain: "ejemplofirebase-11e6f.firebaseapp.com",
    projectId: "ejemplofirebase-11e6f",
    storageBucket: "ejemplofirebase-11e6f.appspot.com",
    messagingSenderId: "692658850743",
    appId: "1:692658850743:web:017819082a4c3fd5c8b632"
  };
  
// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })

export default {
  auth: firebase.auth(),
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
      console.log(result);
    })
    .catch(function(error){
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
      console.log(errorCode, errorMessage, email, credential);
      })
  },
  logout() {
    firebase.auth().signOut()
    .then(function() {})
    .catch(function(error) {
      console.log(error)});
  }
}