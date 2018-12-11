import firebase from 'firebase/app';
import 'firebase/storage';


// Initialize Firebase
var config = {
    apiKey: "AIzaSyC_S9hBEuze1q1EiRvcGraLC1Jd3ItdJls",
    authDomain: "keto-react-app.firebaseapp.com",
    databaseURL: "https://keto-react-app.firebaseio.com",
    projectId: "keto-react-app",
    storageBucket: "keto-react-app.appspot.com",
    messagingSenderId: "863184071813"
};
firebase.initializeApp(config);

const storage = firebase.storage();

export {
    storage, firebase as default
}