const http = require('http');
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = process.env.PORT || 4000;
const DATA_ROOT = process.env.DATA_ROOT || '/var/dd';
// const MsgServer = require('./server/biz/MsgServer');
// const MsgRollEventHandler = require('./server/biz/MsgRollEventHandler');
// const MsgSexEventHandler = require('./server/biz/MsgSexEventHandler');
// const GamesManager = require('./server/biz/GamesManager');
const logger = require("./logger");

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
//
// var gm = new GamesManager();
//
//
logger.info("(server) DATA_ROOT", DATA_ROOT);
app.listen(port, () => logger.info(`(server) Listening on ${port} and ${port+1}`));
