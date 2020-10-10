function setupTextEvent(client, chat) {
  client.addMessageHandler({
    match: data => data.meta === 'text',
    handler: async data => {
      chat.handle(data);
    }
  })
}

export {
  setupTextEvent
}
