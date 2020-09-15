import React from 'react';
import Login from './Login';
import Board from './Board';
import Library from './Library';
import Settings from './Settings';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/board">
          <Board />
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
  );
}

export default App;
