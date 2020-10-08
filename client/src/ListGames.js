import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ListGames.css';
import { GameSingleton } from './domain/GameSingleton';

const API_ROOT_URL = process.env.REACT_APP_API_ROOT_URL;

function ListGames() {

  let [gameList, setGameList] = useState([]);
  let history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('/api/library');
      var json = await result.json();
      setGameList(json.list);
    };
    fetchData();
  }, []);

  function editGame(name, e) {
    history.replace('/library/create/'+name);
  }

  function loadGame(name, e) {
    var game = GameSingleton.getInstance();
    game.loadGameByName(name);
    history.replace('/board');
  }

  return (
    <div>
      <h2>Games</h2>
      {gameList.map(g => (
        <div className="game" key={g.name}>
          <h3>{g.name}</h3>
          <img src={API_ROOT_URL+'/asset/'+g.name+'/board.svg'} alt={g.name} className="board" />
          <p>{g.description}</p>
          <p>
            <button className="nav" onClick={e => loadGame(g.name)}>Load Game</button>
            <button className="nav" onClick={e => editGame(g.name)}>Edit Game</button>
          </p>
          <div style={{clear:"both"}}></div>
        </div>
      ))}
    </div>
  )
}

export default ListGames;
