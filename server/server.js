const http = require('http');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const MsgServer = require('./ws/MsgServer');
const MsgServerSetup = require('./ws/MsgServerSetup');
const logger = require("./logger");
const port = process.env.PORT || 4000;
const DATA_ROOT = process.env.DATA_ROOT || '/var/campng';
const GamesManager = require('./biz/GamesManager');

var app = express();
var httpServer = http.createServer(app);
app.use(fileUpload());
app.use(cookieParser());
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: false }));

app.use('/api', require('./router/api'));
app.use('/api/settings', require('./router/settings'));
app.use('/api/library', require('./router/library'));
app.use('/asset', express.static(DATA_ROOT));

var gm = new GamesManager();
var msgServer = new MsgServer(port+1);
MsgServerSetup(msgServer, gm);

//
// var gm = new GamesManager();
//
//
logger.info("(server) DATA_ROOT: " + DATA_ROOT);
logger.info("(server) LOGLEVEL: " + process.env.LOGLEVEL);
app.listen(port, () => logger.info(`(server) Listening on ${port} and ${port+1}`));
