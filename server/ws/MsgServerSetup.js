const MsgRollEventHandler = require('./MsgRollEventHandler');
const MsgSexEventHandler = require('./MsgSexEventHandler');

module.exports = function(msgServer) {

  msgServer.addHandler({
    match: data => data.meta == 'join',
    handler: (data, wss, client) => {
      msgServer.setClient(data, client);
      var gs = gm.getGameState(data.room);
      return [gs, {room:gs.room, user:data.user, meta:'mask', rects:gs.maskRects}];
    }
  })
  msgServer.addHandler({
    match: data => data.meta == 'piece',
    handler: data => {
      var gs = gm.getGameState(data.room);
      gs.addPiece(data);
      return [gs];
    }
  })
  msgServer.addHandler({
    match: data => data.meta == 'text',
    handler: (data, wss, ws) => {
      return [Object.assign({}, data)];
    }
  })
  msgServer.addHandler({
    match: data => data.meta == 'mask', //simple rebroadcast
    handler: (data, wss, ws) => {
      var gs = gm.getGameState(data.room);
      gs.setMask(data.rects);
      return [Object.assign({}, data)];
    }
  })
  msgServer.addHandler({
    match: data => data.meta == 'text',
    handler: new MsgRollEventHandler()
  })
  msgServer.addHandler({
    match: data => data.meta == 'text',
    handler: new MsgSexEventHandler()
  })
  msgServer.addHandler({
    match: data => data.meta == 'move',
    handler: (data, wss, ws) => {
      var gs = gm.getGameState(data.room);
      Object.values(gs.pieces).forEach(el => { //apply move to piece
        if (el.id == data.id) {
          el.localMatrix = data.localMatrix;
        }
      });
      return [gs];
    }
  })
  msgServer.addHandler({
    match: data => data.meta == 'kill',
    handler: (data, wss, ws) => {
      var gs = gm.getGameState(data.room);
      gs.pieces.forEach(el => { //apply move to piece
        if (el.id == data.id) {
          el.killed = true;
        }
      });
      return [gs];
    }
  })

}
