import React, { useState } from 'react';
import Menu from './Menu';
import { useCookies } from 'react-cookie';
import './Settings.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

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
    .then(x => console.log('hereeee', x))
  }

  function handleChange(event) {
    event.preventDefault()
    setSettings({...settings, [event.target.name]: event.target.value})
  }

  return (
    <div className="Settings centered">
    <Menu/>

    <Container className="mt-5">
      <Menu />
      <Row className="">
        <Col>
          <h2>Game Settings</h2>
          <Form>
            <Form.Group>
              <Form.Label>Board Url</Form.Label>
              <Form.Control type="text" name="boardUrl" value={settings.boardUrl} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Asset Size</Form.Label>
              <Form.Control type="text" name="assetSize" value={settings.assetSize} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Player Size</Form.Label>
              <Form.Control type="text" name="playerSize" value={settings.playerSize} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Move Step Size</Form.Label>
              <Form.Control type="text" name="moveStepSize" value={settings.moveStepSize} onChange={handleChange} />
            </Form.Group>
            <Button variant="primary" onClick={saveSettings}>Submit</Button>
          </Form>
        </Col>
        <Col>
          <h2>Your Game</h2>
          <table><tbody>
            <tr><td>Current Room:</td><td><b><i>{cookies.room}</i></b></td></tr>
            <tr><td>Username:</td><td>{cookies.user}</td></tr>
            <tr><td>Color:</td><td><span style={{padding:5, backgroundColor:cookies.color}}>{cookies.color}</span></td></tr>
          </tbody></table>
        </Col>
      </Row>
    </Container>

    </div>
  )
}

export default Settings;
