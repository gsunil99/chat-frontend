import React, { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import sendBtn from '../../src/images/sendBtn.png';
import closeIcon from '../../src/images/closeIcon.png';
import './Chat.css';
import { user } from './Join';
import Message from './Message';
const ENDPOINT = 'https://chat-backend-h3sn.onrender.com/';
let socket;
const Chat = () => {
  const [id, setid] = useState('');
  const [messages, setMessages] = useState([]);
  const send = () => {
    const message = document.getElementById('chatInput').value;
    socket.emit('message', { message, id });
    document.getElementById('chatInput').value = '';
  };

  console.log(messages);
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ['websocket'] });

    socket.on('connect', () => {
      alert('Connected');
      setid(socket.id);
    });
    console.log(socket);
    socket.emit('joined', { user });

    socket.on('welcome', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on('userJoined', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    socket.on('leave', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.emit('userDisconnect');
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('sendMessage', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off('sendMessage');
    };
  }, []); // Empty dependency array since we don't want the effect to re-run

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>WE CHAT</h2>
          <a href="/">
            {' '}
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? '' : item.user}
              message={item.message}
              classs={item.id === id ? 'right' : 'left'}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(event) => (event.key === 'Enter' ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={send} id="send">
            <img src={sendBtn} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
