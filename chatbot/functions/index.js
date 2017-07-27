var functions = require('firebase-functions');
var admin = require('firebase-admin');

var http = require('./helper');
var apiai = require('apiai');
var app = apiai("f87d6ff5226e45b8aec8fb939e0ff38e");

var defaultApp = admin.initializeApp(functions.config().firebase)
const db = admin.database();


exports.chatbot = functions.database.ref('/chatbot/messages/{pushId}')
    .onWrite(event => {
        const data = event.data.val();
        if (data.to != undefined && data.text != undefined && data.from == 'bot') {
            console.log("no reply for bot message");
            return 0;
        }
        const query = data.text;
        console.log("you said: ", query);

        var request = app.textRequest(query, {
            sessionId: 'unique-session-id'
        });

        request.on('response', function (response) {
            console.log(response);

            const reply = response.result.fulfillment.speech;
            console.log("reply is: ", reply);
            return event.data.ref.parent.push({
                text: reply,
                from: "bot",
                to: "zia"
            });
        });

        request.on('error', function (error) {
            console.log("eror: ", error);
            return
        });

        request.end();
        return
    });


exports.helloWorld = functions.https.onRequest((request, response) => {

    console.log("request: ", request);
    console.log("response: ", response);

    response.send("this is response");
})



//Sample response
// var response = {
//     speech: "this is speech from firebase",
//     displayText: "this is displayText from firebase",
//     data: { "this": "is data from firebase" },
//     contextOut: [
//         {
//             "name": "weather",
//             "lifespan": 2,
//             "parameters": { "city": "Rome" }
//         }
//     ],
//     source: "this is source from firebase",
//     followupEvent: {
//         name: "signup",
//         data: {
//             'givenname': "john",
//             'lastname': "john"
//         }
//     },
// }
exports.webhook = http.post((req, res) => {
    console.log("this is body: ", req.body);
    console.log("this is headers: ", req.headers);
    var body = req.body;

    console.log("action: ", body.result.action);
    switch (body.result.action) {

        case "do-signup":

            //do signup process here
            //then

            getQuestion(0).then(question => {
                console.log("async got question: ", question);

                res.send({
                    speech: "you are signed up, first question is " + JSON.stringify(question),
                    contextOut: [
                        {
                            "name": "init",
                            "lifespan": 0
                        },
                        {
                            "name": "quiz",
                            "lifespan": 5,
                            "parameters": { "index": "0" }
                        }
                    ],
                })
            });
            break;

        case "next-question":

            console.log("in next question params: ", body.result.contexts);
            var currentIndex = parseInt(body.result.contexts[0].parameters.index);
            //collect answer option number
            getQuestion(currentIndex + 1).then(question => {
                console.log("async got question: ", question);

                if (question == -1) {
                    res.send({
                        speech: "no more questions",
                        contextOut: [
                            {
                                "name": "quiz",
                                "lifespan": 0,
                            }
                        ],
                    });
                } else {
                    res.send({
                        speech: "question" + (currentIndex + 2) + ": " + JSON.stringify(question),
                        contextOut: [
                            {
                                "name": "quiz",
                                "lifespan": 5,
                                "parameters": { "index": currentIndex + 1 }
                            }
                        ],
                    });
                }
            });
            break;

        default:
            res.send({
                speech: "action not found"
            });
            break;
    }
});


function getQuestion(index) {
    return new Promise((resolve, reject) => {

        db.ref().child("chatbot/questions").once("value", (snapshot) => {

            var data = snapshot.val();
            console.log("data: ", data)

            var keys = Object.keys(data);
            console.log("keys: ", keys)

            if (index >= keys.length || index < 0) {
                resolve(-1)
            };

            var key = keys[index];
            console.log("key: ", key)

            console.log("question: ", data[key]);
            resolve(data[key]);//return question object

        })
    });
}

