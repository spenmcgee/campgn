import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './logo.svg';
import { CookiesProvider } from 'react-cookie';
import { useCookies } from 'react-cookie';

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
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <table><tbody>
          <tr><td>Room</td><td><input type="text" name="room" value={form.room} onChange={handleChange} /></td></tr>
          <tr><td>User</td><td><input type="text" name="user" value={form.user} onChange={handleChange} /></td></tr>
          <tr><td>Color</td><td><input type="text" name="color" value={form.color} onChange={handleChange} /></td></tr>
          <tr><td>Email</td><td><input type="text" name="email" value={form.email} onChange={handleChange} /></td></tr>
          <tr><td colSpan="2"><button onClick={handleLogin}>Login</button></td></tr>
        </tbody></table>
      </header>
    </div>
    </CookiesProvider>
  )

}

export default Login;
