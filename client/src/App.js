import React from 'react';
import Board from './Board';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Login() {
  let history = useHistory();
  function login(e) {
    history.replace("/board");
  }
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <table><tbody>
          <tr><td>Room</td><td><input type="text" name="room" /></td></tr>
          <tr><td>User</td><td><input type="text" name="user" /></td></tr>
          <tr><td>Email</td><td><input type="text" name="email" /></td></tr>
          <tr><td colSpan="2"><button onClick={login}>Login</button></td></tr>
        </tbody></table>
      </header>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/board">
          <Board />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
