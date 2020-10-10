class GameSingleton {

  constructor() {
    if (!GameSingleton.instance) {
      this.name = null;
      this.config = null;
      this.init = true;
      GameSingleton.instance = this;
    }
    return GameSingleton.instance;
  }

  static getInstance() {
    return GameSingleton.instance;
  }

  async loadGameByName(name) {
    this.name = name;
    var url = '/api/library/'+name;
    this.config = await fetch(url);
    return this.config;
  }

}

new GameSingleton();

export { GameSingleton };
