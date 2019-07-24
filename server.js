// var http = require('http');

// var server = http.createServer(function(req, res) {
//     res.writeHead(200, { "Content-type": "text/plain" });
//     res.end("Hello world\n");
// });


// server.listen(3000, function() {
//     console.log('connected on 3000');
// });

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

var winston = require('winston');

const port = 3000;

const router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: 'hello from get!' });   
});

router.get('/person', function(req, res) {
    res.json({ message: 'Hi! from get from person' });   
});

router.post('/', function(req, res) {
    res.json({ message: 'hello from post!' });   
})

router.put('/', function(req, res) {
    res.json({ message: 'hello from put!' });   
})
const logFileName = 'info.log';
const errorLogFileName = 'error.log';

const options = {
    info: {
        name: "info",
        level: "info",
        filename: logFileName,
        handleExceptions: false,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    error: {
        name: "error",
        level: "error",
        filename: errorLogFileName,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: true,
        colorize: true,
    },
};

const logFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = new winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), logFormat),
    transports: [
        new winston.transports.File(options.info),
        new winston.transports.File(options.error),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

app.use('/api', router);
logger.info('Server started on port ' + port + ' ...');
logger.error('test');
// app.use(logger);
app.listen(port);