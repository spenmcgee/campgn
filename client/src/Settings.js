import React from 'react';
import Menu from './Menu';
import { useCookies } from 'react-cookie';
import './Settings.css';
//import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import { Container, Row, Col } from 'react-bootstrap';

function Settings() {

  let [cookies, setCookie] = useCookies(['campgn']);

  return (
    <div className="Settings centered">
    <Menu/>
    here
    {/*
    <Container className="">
      <Menu />
      <Row className="">
        <Col>
          <h2>Game Settings</h2>
          left
        </Col>
        <Col>
          <h2>Your Game</h2>
          <table><tbody>
            <tr><td>Current Room:</td><td>{cookies.room}</td></tr>
            <tr><td>Username:</td><td>{cookies.user}</td></tr>
            <tr><td>Color:</td><td>{cookies.color}</td></tr>
          </tbody></table>
        </Col>
      </Row>
    </Container>
    */}
    </div>
  )
}

export default Settings;
