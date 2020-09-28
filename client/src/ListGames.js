import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './ListGames.css';

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

  function navEditGame(name, e) {
    history.replace('/library/create/'+name);
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
            <button className="nav">Load Game</button>
            <button className="nav" onClick={e => navEditGame(g.name)}>Edit Game</button>
          </p>
          <div style={{clear:"both"}}></div>
        </div>
      ))}
    </div>
  )
}

export default ListGames;
