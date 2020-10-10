import React, { useEffect, useState } from 'react';
import './Chat.css';

function Chat(props) {

  var [newMessage, setNewMessage] = useState("");
  var [messages, setMessages] = useState([]);
  var wsclient = props.wsclient;

  function handleData(data) {
    setMessages(messages => {
      return messages.concat(`${data.user}: ${data.messageText}`);
    })
  }

  wsclient.addMessageHandler({
    match: data => data.meta === 'text',
    handler: async data => {
      handleData(data);
    }
  })

  useEffect(() => {

  });

  function onMessage(e) {
    e.preventDefault();
    setMessages(message => messages.concat(`blahhh: ${newMessage}`));
    setNewMessage('');
  }

  function onNewMessageChange(e) {
    setNewMessage(e.target.value);
  }

  return (
    <div className="Chat">
      <div className="newMessage">
        <input type="text" name="message" value={newMessage} onChange={onNewMessageChange} />
        <input type="submit" value="Send" onClick={onMessage} />
      </div>
      {messages.map((value, index) => {
        return (
          <div key={index+'bg'} className="messageBg">
            <div className="message" key={index}>{value}</div>
          </div>
        )
      })}
    </div>
  );
}

export default Chat;
