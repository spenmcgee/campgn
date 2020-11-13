import React from 'react';
import Login from './Login';
import Game from './Game';
import Library from './Library';
import Settings from './Settings';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import { WebsocketClient } from './ws/WebsocketClient';

var wsclient = new WebsocketClient();

function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route path="/game">
          <Game wsclient={wsclient} />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
        <Route path="/library">
          <Library />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
