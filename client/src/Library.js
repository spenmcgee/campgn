import React, { useState } from 'react';
import Menu from './Menu';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function Library() {

  let [cookies] = useCookies(['campgn']);
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
        </Route>
        <Route exact path="/library/create">
          <h2>Create Your Own Game</h2>
        </Route>
      </Switch>

      </div>

    </div>
  )
}

export default Library;
