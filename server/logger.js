var winston = require('winston');
var colorize = winston.format.colorize;
var combine = winston.format.combine;
var label = winston.format.label;
var printf = winston.format.printf;
var json = winston.format.json;

const format1 = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

var logger = winston.createLogger({
  exitOnError: false,
  levels: (winston.config.syslog.levels),
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

module.exports = logger;
