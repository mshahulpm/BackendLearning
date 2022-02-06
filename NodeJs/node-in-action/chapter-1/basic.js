const http = require('http');
const controllers = require('./controller');


http.createServer((req, res) => {
    const { url } = req;

    // home route
    if (url === '/') {
        controllers.home(req, res);
    }

    //  users route 
    else if (url === '/users') {
        controllers.getUser(req, res);
    }

    // stream  data from a file 
    else if (url === '/stream') {
        controllers.streamData(req, res);
    }

    //  stream image to client
    else if (url === '/image') {
        controllers.streamImageToClient(req, res);
    }

    // other routes (404)
    else {
        controllers.notFound(req, res);
    }
}).listen(3000, () => {
    console.log('server is listening on port 3000');
});



