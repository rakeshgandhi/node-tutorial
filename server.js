import express from 'express';
import bodyParser from 'body-Parser'
import { createLogger, format, transports } from 'winston';
import { hostname } from 'os';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const hostName = '0.0.0.0';
const port = 3000;

const router = express.Router();

router.get('/', function (req, res) {
    res.json({ message: 'hello from get!' });
});

router.get('/person', function (req, res) {
    res.json({ message: 'Hi! from get from person' });
});

router.post('/', function (req, res) {
    res.json({ message: 'hello from post!' });
})

router.put('/', function (req, res) {
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

const logFormat = format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const logger = new createLogger({
    format: format.combine(format.timestamp(), logFormat),
    transports: [
        new transports.File(options.info),
        new transports.File(options.error),
        new transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});



app.use('/api', router);
logger.info(`API started on http://${hostName}:${port}/api/`);
// app.use(logger);
app.listen(port, hostname);