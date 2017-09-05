var functions = require('firebase-functions');

let handleContentType = (req) => {
    return new Promise(res => {
        switch (req.get('content-type')) {
            case 'text/plain':
            case 'application/json':
            case 'application/x-www-form-urlencoded':
                res(req.body);
                break;

            case 'application/octet-stream':
                res(req.body.toString()); // Convert buffer to a string
                break;

            default:
                res(null);
                break;
        }
    });
}

let http = {};

http.get = (cb) => {
    return functions.https.onRequest((request, response) => {
        if (request.method == 'GET') {
            cb(request, response);
        } else {
            response.status(500).send({ error: 'Something blew up!' });
        }
    });
};
http.post = (cb) => {
    return functions.https.onRequest((request, response) => {
        if (request.method == 'POST') {
            handleContentType(request).then(data => {
                cb(request, response, data);
            });
        } else {
            response.status(500).send({ error: 'Something blew up!' });
        }
    });
};
http.put = (cb) => {
    return functions.https.onRequest((request, response) => {
        if (request.method == 'PUT') {
            handleContentType(request).then(data => {
                cb(request, response, data);
            });
        } else {
            response.status(500).send({ error: 'Something blew up!' });
        }
    });
};
http.delete = (cb) => {
    return functions.https.onRequest((request, response) => {
        if (request.method == 'DELETE') {
            cb(request, response);
        } else {
            response.status(500).send({ error: 'Something blew up!' });
        }
    });
};

module.exports = http