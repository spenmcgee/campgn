import React, { useState, useEffect } from 'react';
import Text from 'common/message/Text';
import './Chat.css';
import { useCookies } from 'react-cookie';

function Chat(props) {

  let [cookies] = useCookies(['campgn']);
  var [newMessage, setNewMessage] = useState("");
  var [messages, setMessages] = useState([]);
  const wsclient = props.wsclient;

  useEffect(() => {
    console.log("Chat.useEffect")
    wsclient.addMessageHandler({
      match: data => data.meta === 'text',
      handler: async data => {
        console.log("Chat.useEffect 3")
        handleData(data);
      }
    })
  }, [wsclient])

  function handleData(data) {
    console.log("Chat.handleData")
    setMessages(messages => [`${data.user}: ${data.messageText}`, ...messages]);
  }

  function onSendMessage(e) {
    e.preventDefault();
    console.log("Chat.onSendMessage", wsclient)
    setMessages(messages => [`should be message: ${newMessage}`, ...messages]);
    wsclient.send(new Text({
      id: cookies.id,
      user: cookies.user,
      room: cookies.room,
      messageText: newMessage
    }))
    setNewMessage('');
  }

  function onNewMessageChange(e) {
    setNewMessage(e.target.value);
  }

  return (
    <div className="Chat">
      <div className="newMessage">
        <input type="text" name="message" onChange={onNewMessageChange} />
        <input type="submit" value="Send" onClick={onSendMessage}/>
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
