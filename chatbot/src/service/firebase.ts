import * as firebase from 'firebase'

export class firebaseService {

    static todoref = firebase.database().ref('chatbot/messages');

    static signup(email: string, password: string): Promise<any> {
        return firebase.auth().createUserWithEmailAndPassword(email, password);
    }
    static login(email: string, password: string): Promise<any> {
        return firebase.auth().signInWithEmailAndPassword(email, password);
    }
    // static auth() {
    //     return firebase.auth();
    // }
    static getUser(): Promise<any> {
        return new Promise((res) => {
            firebase.auth().onAuthStateChanged((user) => {
                res(user);
            });
        })
    }
    static logout(): Promise<any> {
        console.log("logging out");
        return firebase.auth().signOut();
    }
}

