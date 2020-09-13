import React from 'react';
import { FaChessBoard } from 'react-icons/fa';
import { FaCrop } from 'react-icons/fa';
import { FaUserNinja } from 'react-icons/fa';
import { FaCog } from 'react-icons/fa';
import './Menu.css';
import { Link } from 'react-router-dom';
import { Button } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './logo/logo.svg';

export default function Menu(props) {

  let history = useHistory();

  function navBoard() {
    history.replace('/board');
  }

  function navSettings() {
    history.replace('/settings');
  }

  return (
    <div className={props.className}>
      <table><tbody><tr>
        <td><img src={logo} className="logo" alt="logo" /></td>
        <td><button onClick={navBoard}>Game</button></td>
        <td><button>Characters</button></td>
        <td><button>Masking</button></td>
        <td><button onClick={navSettings}>Settings</button></td>
      </tr></tbody></table>
    </div>
  )

}
