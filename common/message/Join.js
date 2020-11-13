class Join { //connects wsclient to server

  constructor(data) {
    this.id = data.id;
    this.user = data.user;
    this.room = data.room;
    this.meta = 'join';
  }

  toString() {
    var data = {
      meta: 'join',
      id: this.id,
      room: this.room,
      user: this.user
    }
    return JSON.stringify(data);
  }

}

export default Join
