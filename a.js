const cluster = require('cluster');
const http = require('http');
const os = require('os');

const numCPUs = os.cpus().length;

const html = `<h2>Welcome to website</h2>`

if (cluster.isMaster) {
    console.log(`Master process ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Starting a new one.`);
        cluster.fork();
    });

} else {
    // Workers can share the same TCP connection
    http.createServer((req, res) => {
        res.setHeader("content-type", "text/html")
        res.writeHead(200);
        return res.end(html)
        res.end(`Handled by process ${process.pid}`);
    }).listen(3000);

    console.log(`Worker ${process.pid} started`);
}
