import React, { useState } from 'react';
import './Join.css';
import logo from '../../src/images/logo.svg';
import { Link } from 'react-router-dom';

let user;
const sendUser = () => {
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = '';
};

const Join = () => {
  const [name, setname] = useState('');
  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>WE CHAT</h1>
        <input
          onChange={(e) => setname(e.target.value)}
          placeholder="Enter your name"
          type="text"
          id="joinInput"
        ></input>

        <Link onClick={(e) => (!name ? e.preventDefault() : null)} to="/chat">
          <button onClick={sendUser} id="joinButton">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Join;
export { user };
