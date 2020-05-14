import * as firebase from 'firebase'

 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBC4l1ge2lTS4_QEei1wTPLYis6Ujnd3Xo",
    authDomain: "react-284da.firebaseapp.com",
    databaseURL: "https://react-284da.firebaseio.com",
    projectId: "react-284da",
    storageBucket: "react-284da.appspot.com",
    messagingSenderId: "253052258375",
    appId: "1:253052258375:web:bfc63b77159ffd14fb8962"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.auth = firebase.auth();
  const db = firebase.firestore();
  firebase.db = db;
  const storage = firebase.storage();
  firebase.storage = storage;
  export default firebase;