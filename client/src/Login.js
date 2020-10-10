import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from './img/logo.svg';
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
    history.replace("/game");
  }

  function handleChange(event) {
    event.preventDefault()
    setForm({...form, [event.target.name]: event.target.value})
  }

  return (
    <CookiesProvider>
    <div className="Login centered">
      <img src={logo} className="login-logo" alt="logo" />
      Room
      <input type="text" name="room" value={form.room} onChange={handleChange} />
      User
      <input type="text" name="user" value={form.user} onChange={handleChange} />
      Color
      <input type="text" name="color" value={form.color} onChange={handleChange} />
      Email
      <input type="email" name="email" value={form.email} onChange={handleChange} />
      <button onClick={handleLogin}>Submit</button>
    </div>
    </CookiesProvider>
  )

}

export default Login;
