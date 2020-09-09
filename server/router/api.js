const express = require('express');
const DATA_ROOT = process.env.DATA_ROOT || '/var/dd';
const logger = require("../logger");

var router = express.Router();

router.get('/', (req, res) => {
  var room = req.cookies["room"];
  var user = req.cookies["user"];
  res.json({
    room: room,
    user: user
  })
});

module.exports = router;
