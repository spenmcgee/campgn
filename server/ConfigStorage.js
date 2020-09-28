const DATA_ROOT = process.env.DATA_ROOT || '/var/dd';
const fs = require('fs');
const path = require('path');
const sanitize = require('sanitize-filename');
const logger = require('./logger');

class ConfigStorage {

  constructor(dataRoot) {
    this.dataRoot = dataRoot || DATA_ROOT;
  }

  getConfig(name) {
    var data = fs.readFileSync(path.join(DATA_ROOT, name, 'config.json'));
    var json = JSON.parse(data);
    return json;
  }

  list() {
    var list = [];
    const files = fs.readdirSync(DATA_ROOT);
    for (var file of files) {
      var stats = fs.statSync(path.join(DATA_ROOT, file));
      if (stats.isDirectory()) {
        try {
          var conf = this.getConfig(file);
          list.push(conf);
        } catch {
          //noop
        }
      }
    }
    return list;
  }

  get() {}

  save(name, config, files) {
    logger.info(`(ConfigStorage) Create ${name}`, config);
    var dirname = sanitize(name);
    var storageDir = path.join(this.dataRoot, dirname);
    var configFilepath = path.join(this.dataRoot, dirname, 'config.json');
    if (!fs.existsSync(storageDir)) {
      logger.info(`(ConfigStorage) Create dir ${dirname}`);
      fs.mkdirSync(storageDir);
    }
    fs.writeFileSync(configFilepath, config);

    if (files) {
      if (files.files_board) {
        var boardFilepath = path.join(this.dataRoot, dirname, 'board.svg');
        files.files_board.mv(boardFilepath);
      }
      Object.values(config.characters).forEach(c => {
        var f = files[`files_${c.id}`];
        var filepath = path.join(this.dataRoot, dirname, c.id+'.svg');
        f.mv(filepath);
      })
    }
  }

}

module.exports = ConfigStorage;
