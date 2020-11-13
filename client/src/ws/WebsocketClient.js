class WebsocketClient {

  constructor() {
    this.messageHandlers = [];
  }

  init(cookies) {
    this.id = cookies.id;
    this.user = cookies.user;
    this.room = cookies.room;
  }

  addMessageHandler(handler) {
    this.messageHandlers.push(handler);
    console.log("(WebSocketClient.addMessageHandler) num handlers:", this.messageHandlers.length)
  }

  onOpen(handler) {
    this.onOpenHandler = handler;
  }

  send(data) {
    if (typeof data == 'object')
      data = JSON.stringify(data);
    this.socket.send(data);
  }

  connect(cookies) {
    this.init(cookies);
    var socket = new WebSocket(`ws://localhost:4001`); //FIXME
    this.socket = socket;
    socket.onmessage = async e => {
      let data = JSON.parse(e.data);
      console.log(`(WebsocketClient#socket.onmessage) incoming ${data.meta}`, data);
      for (var mh of this.messageHandlers) {
        if (mh.match(data)) {
          if (typeof(mh.handler) == 'object')
            await mh.handler.handle(data);
          else
            await mh.handler(data);
        }
      }
    }
    socket.onopen = e => {
      if (this.onOpenHandler)
        this.onOpenHandler(e);
    }
  }

}

export { WebsocketClient }
