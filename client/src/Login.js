import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './logo/monster2.svg';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { Button, Form, Col } from 'react-bootstrap';

function Login() {

  let history = useHistory();
  let [cookies, setCookie] = useCookies(['campgn']);
  let [form, setForm] = useState({
    room: cookies.room||'',
    user: cookies.user||'',
    color: cookies.color||'',
    email: cookies.email||''
  });

  function handleLogin(event) {
    setCookie("room", form.room);
    setCookie("user", form.user);
    setCookie("color", form.color);
    setCookie("email", form.email);
    history.replace("/board");
  }

  function handleChange(event) {
    event.preventDefault()
    setForm({...form, [event.target.name]: event.target.value})
  }

  return (
    <CookiesProvider>
    <div class="Login centered">
      <img src={logo} className="App-logo" alt="logo" />
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="formRoom">
            <Form.Label>Room</Form.Label>
            <Form.Control type="text" name="room" value={form.room} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="formUser">
            <Form.Label>User</Form.Label>
            <Form.Control type="text" name="user" value={form.user} onChange={handleChange} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="formColor">
            <Form.Label>Color</Form.Label>
            <Form.Control type="text" name="color" value={form.color} onChange={handleChange} />
          </Form.Group>
          <Form.Group as={Col} controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" value={form.email} onChange={handleChange} />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" onClick={handleLogin}>Submit</Button>
      </Form>
    </div>
    </CookiesProvider>
  )

}

export default Login;
