"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = require("firebase");
var firebaseService = (function () {
    function firebaseService() {
    }
    firebaseService.signup = function (email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    };
    firebaseService.login = function (email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    };
    // static auth() {
    //     return firebase.auth();
    // }
    firebaseService.getUser = function () {
        return new Promise(function (res) {
            firebase.auth().onAuthStateChanged(function (user) {
                res(user);
            });
        });
    };
    firebaseService.logout = function () {
        console.log("logging out");
        return firebase.auth().signOut();
    };
    firebaseService.todoref = firebase.database().ref('chatbot/messages');
    return firebaseService;
}());
exports.firebaseService = firebaseService;
//# sourceMappingURL=firebase.js.map