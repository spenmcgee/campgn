import React from 'react';
import Menu from './Menu';
import { useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import CreateGame from './CreateGame';
import ListGames from './ListGames';
import './Library.css';

function Library() {

  let history = useHistory();

  function navList() {
    history.replace('/library');
  }

  function navCreate() {
    history.replace('/library/create');
  }

  return (
    <div className="Library">
      <Menu className="Menu Menu-stationary" />
      <div className="Page">

        <h1>Game Library</h1>

        <button className="nav" onClick={navList}>List Games</button>
        <button className="nav" onClick={navCreate}>Create Game</button>

      <Switch>
        <Route exact path="/library">
          <h2>Featured Games</h2>
          <p>These are games that you can load and play.</p>
          <ListGames/>
        </Route>
        <Route exact path="/library/create">
          <CreateGame/>
        </Route>
        <Route exact path="/library/create/:name">
          <CreateGame/>
        </Route>
      </Switch>

      </div>

    </div>
  )
}

export default Library;
