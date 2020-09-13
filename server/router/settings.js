const express = require('express');
const DATA_ROOT = process.env.DATA_ROOT || '/var/dd';
const logger = require("../logger");
const fs = require('fs');
const path = require('path');

var router = express.Router();

router.get('/', (req, res) => {
  var room = req.cookies["room"];
  var data = fs.readFileSync(path.join(DATA_ROOT, `${room}-config.json`));
  res.json(JSON.parse(data));
});

router.post('/', (req, res) => {
  var room = req.cookies["room"];
  if (!room) {
    res.status(400).send("Must specify room").end();
    return;
  }
  var data = {
    boardUrl: req.body.boardUrl,
    assetSize: req.body.assetSize,
    playerSize: req.body.playerSize,
    moveStepSize: req.body.moveStepSize
  }
  fs.writeFileSync(path.join(DATA_ROOT, `${room}-config.json`), JSON.stringify(data));
  res.status(200).end();
});

module.exports = router;
