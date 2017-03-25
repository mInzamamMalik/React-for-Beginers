var functions = require('firebase-functions');
var apiai = require('apiai')("7f3251bd4aca4decb21d536f886e9f0b ");
var request = require('request');

// // Start writing Firebase Functions
// // https://firebase.google.com/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// })

// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.chatbot = functions.database.ref('/chatbot/messages/{pushId}/text')
    .onWrite(event => {
        // Grab the current value of what was written to the Realtime Database.
        const snap = event.data;
        const data = snap.val();

        var req = request
            .get("https://api.github.com/users/malikasinger111/repos")
            .on('response', function (response) {
                console.log(response.statusCode) // 200
                console.log(response.headers['content-type']) // 'image/png'
            })


        // var request = apiai.textRequest(data,{
        //     sessionId: "some custom session id"
        // });

        // request.on('response', function (response) {
        //     console.log("this is response of api.ai", response);
        //     return event.data.ref.parent.parent.push(message);

        // });

        // request.on('error', function (error) {
        //     console.error("this is error of api.ai", error);
        // });

        return Promise.all(req);

    });



