class Text {

  constructor(data) {
    this.id = data.id;
    this.user = data.user;
    this.room = data.room;
    this.messageText = data.messageText;
    this.meta = 'text';
  }

  toString() {
    return JSON.stringify(this);
  }

}

export default Text
