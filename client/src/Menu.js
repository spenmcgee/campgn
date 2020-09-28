import React from 'react';
import './Menu.css';
import { useHistory } from 'react-router-dom';
import logo from './img/logo.svg';

export default function Menu(props) {

  let history = useHistory();

  function navBoard() {
    history.replace('/board');
  }

  function navSettings() {
    history.replace('/settings');
  }

  function navLibrary() {
    history.replace('/library');
  }

  return (
    <div className={props.className}>
      <table><tbody><tr>
        <td><img src={logo} className="logo" alt="logo" /></td>
        <td><button onClick={navBoard}>Game</button></td>
        <td><button onClick={navLibrary}>Library</button></td>
        <td><button>Masking</button></td>
        <td><button onClick={navSettings}>Settings</button></td>
      </tr></tbody></table>
    </div>
  )

}
