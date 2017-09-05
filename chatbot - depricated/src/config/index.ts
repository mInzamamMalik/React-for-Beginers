import * as firebase from 'firebase';
var firebaseConfig = {
    apiKey: "AIzaSyBg22eReu8acraYZKcjlq_SDv3p3lyaadA",
    authDomain: "serverless-chatbot.firebaseapp.com",
    databaseURL: "https://serverless-chatbot.firebaseio.com",
    storageBucket: "serverless-chatbot.appspot.com",
    messagingSenderId: "881953592814"
}
firebase.initializeApp(firebaseConfig);