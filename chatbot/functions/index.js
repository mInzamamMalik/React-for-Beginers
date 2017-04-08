var functions = require('firebase-functions');
var requestify = require('requestify');
var http = require('./helper');

exports.chatbot = functions.database.ref('/chatbot/messages/{pushId}')
    .onWrite(event => {
        const data = event.data.val();
        if (data.to != undefined && data.text != undefined && data.from == 'bot') {
            console.log("no reply for bot message");
            return 0;
        }
        const query = data.text;
        console.log("you said: ", query);

        return requestify
            .request('https://api.api.ai/api/query?v=20150910&query=' + query + '&lang=en&sessionId=898aae69-9d7d-4dd3-abeb-721ca2a44bb6&timezone=2017-03-24T21:10:33+0500', {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer 7f3251bd4aca4decb21d536f886e9f0b'
                }
            })
            .then(function (response) {
                const reply = response.getBody().result.fulfillment.speech;
                console.log("reply is: ", reply);
                return event.data.ref.parent.push({
                    text: reply,
                    from: "bot",
                    to: "zia"
                });
            });
    });


exports.helloWorld = functions.https.onRequest((request, response) => {

    console.log("request: ", request);
    console.log("response: ", response);

    response.send("this is response");
})


exports.webhook = http.post((req, res) => {
    console.log("this is body: ", req.body);
    console.log("this is headers: ", req.headers);

    var response = {
        speech: "this is speech from firebase",
        displayText: "this is displayText from firebase",
        data: { "this": "is data from firebase" },
        contextOut: [
            {
                "name": "weather",
                "lifespan": 2,
                "parameters": { "city": "Rome" }
            }
        ],
        source: "this is source from firebase",
        followupEvent: {
            name: "signup",
            data: { 
                'givenname': "john",
                'lastname': "john"
             }
        },
    }
    console.log("response: ", response);
    res.json(response);
});
