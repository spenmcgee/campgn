const express = require('express');
const DATA_ROOT = process.env.DATA_ROOT || '/var/dd';
const logger = require("../logger");
const fs = require('fs');
const path = require('path');
const ConfigStorage = require('../ConfigStorage');

var router = express.Router();

router.get('/', (req, res) => {
  var room = req.cookies["room"];
  var cs = new ConfigStorage();
  var list = cs.list();
  res.json({"list":list});
});

router.get('/:name', (req, res) => {
  var room = req.cookies["room"];
  var name = req.params["name"];
  var cs = new ConfigStorage();
  var conf = cs.getConfig(name);
  res.json(conf);
});

router.post('/', (req, res) => {
  var room = req.cookies["room"];
  if (!room) {
    res.status(400).send("Must specify room").end();
    return;
  }
  console.log(`(router/library) Create game ${room}`);
  var cs = new ConfigStorage();
  cs.save(req.body.name, req.body.config, req.files);
  res.status(200).end();
});

module.exports = router;
