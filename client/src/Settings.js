import React, { useState } from 'react';
import Menu from './Menu';
import { useCookies } from 'react-cookie';
import './Settings.css';

function Settings() {

  let [cookies, setCookie] = useCookies(['campgn']);
  let [settings, setSettings] = useState({
    boardUrl: '/asset/_system-default.svg',
    assetSize: 100,
    playerSize: 20,
    moveStepSize: 15
  });

  function saveSettings() {
    var data = {
      boardUrl: settings.boardUrl,
      assetSize: settings.assetSize,
      playerSize: settings.playerSize,
      moveStepSize: settings.moveStepSize
    }
    fetch("/api/settings", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  }

  function handleChange(event) {
    event.preventDefault()
    setSettings({...settings, [event.target.name]: event.target.value})
  }

  return (
    <div className="Settings">
      <Menu className="Menu Menu-stationary" />
      <div className="Page">

        <h1>Settings</h1>

        <h2>Game Settings</h2>

        <table><tbody>
        <tr>
          <td>Board Url</td>
          <td><input type="text" name="boardUrl" value={settings.boardUrl} onChange={handleChange} /></td>
        </tr>
        <tr>
          <td>Asset Size</td>
          <td><input type="text" name="assetSize" value={settings.assetSize} onChange={handleChange} /></td>
        </tr>
        <tr>
          <td>Player Size</td>
          <td><input type="text" name="playerSize" value={settings.playerSize} onChange={handleChange} /></td>
        </tr>
        <tr>
          <td>Move Step Size</td>
          <td><input type="text" name="moveStepSize" value={settings.moveStepSize} onChange={handleChange} /></td>
        </tr>
        <tr>
          <td colSpan={2}>
            <button variant="primary" onClick={saveSettings}>Submit</button>
          </td>
        </tr>
        </tbody></table>

        <h2>Your Game</h2>

        <table><tbody>
          <tr><td>Current Room:</td><td><b><i>{cookies.room}</i></b></td></tr>
          <tr><td>Username:</td><td>{cookies.user}</td></tr>
          <tr><td>Color:</td><td><span style={{padding:5, backgroundColor:cookies.color}}>{cookies.color}</span></td></tr>
        </tbody></table>

      </div>
    </div>
  )
}

export default Settings;
