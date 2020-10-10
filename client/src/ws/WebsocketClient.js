import { Cookie } from '../util/Cookie.js';

class WebsocketClient {

  constructor(messageHandler) {
    this.id = Cookie.getCookie('id');
    this.user = Cookie.getCookie('user');
    this.room = Cookie.getCookie('room');
    this.messageHandlers = [];
  }

  addMessageHandler(handler) {
    this.messageHandlers.push(handler);
  }

  onOpen(handler) {
    this.onOpenHandler = handler;
  }

  send(data) {
    this.socket.send(data);
  }

  connect() {
    var socket = new WebSocket(`ws://localhost:4001`);
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
      this.onOpenHandler(e);
    }
  }

}

export { WebsocketClient }
