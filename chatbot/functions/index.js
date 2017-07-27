var functions = require('firebase-functions');
var http = require('./helper');
var apiai = require('apiai');
var app = apiai("f87d6ff5226e45b8aec8fb939e0ff38e");


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
            res.send({
                speech: "you are signed up",
                contextOut: [
                    {
                        "name": "init",
                        "lifespan": 0
                    },
                    {
                        "name": "quiz",
                        "lifespan": 5,
                        "parameters": { "index": "1" }
                    }
                ],
            })
            break;

        case "next-question":

            console.log("in next question params: ", body.result.contexts);

            var currentIndex = parseInt(body.result.contexts[0].parameters.index);
            res.send({
                speech: "quest index " + (currentIndex + 1),
                contextOut: [
                    {
                        "name": "quiz",
                        "lifespan": 5,
                        "parameters": { "index": currentIndex + 1 }
                    }
                ],
            })
            break;

        default:
            res.send({
                speech: "action not found"
            });
            break;
    }


    console.log("response: ", response);
    res.json(response);
});
